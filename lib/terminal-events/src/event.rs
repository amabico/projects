use std::collections::VecDeque;
use std::sync::{Mutex, MutexGuard, PoisonError};
use std::time::Duration;
use std::sync::mpsc::{channel, Receiver, Sender, SendError};

use crate::KeyCode;
#[cfg(target_family = "unix")]
use crate::unix;

#[derive(Debug)]
pub enum Event {
    KeyPress(KeyCode),
    WindowResized,
}

static mut INITIALIZED: bool = false;
// FIFO
static EVENTS: Mutex<VecDeque<Event>> = Mutex::new(VecDeque::new());

static CHANNEL: Mutex<Option<(Sender<Event>, Receiver<Event>)>> = Mutex::new(None);
pub fn get_or_insert_channle() -> Result<MutexGuard<'static, Option<(Sender<Event>, Receiver<Event>)>>, PoisonError<MutexGuard<'static, Option<(Sender<Event>, Receiver<Event>)>>>> {
    CHANNEL.lock().map(|mut pair| {
        if pair.is_none() {
            *pair = Some(channel());
        }
        return pair;
    })
}

fn pop_event() -> Result<Option<Event>, PoisonError<MutexGuard<'static, VecDeque<Event>>>> {
    EVENTS.lock()
        .map(|mut events| events.pop_front())
}

fn push_event(event: Event) -> Result<(), PoisonError<MutexGuard<'static, VecDeque<Event>>>> {
    EVENTS.lock()
        .map(|mut events| { events.push_back(event) })
}

fn event_exist() -> Result<bool, PoisonError<MutexGuard<'static, VecDeque<Event>>>> {
    EVENTS.lock()
        .map(|events| { events.len() > 0 })
}

fn send_event(event: Event) -> Result<(), SendError<Event>> {
    let channel = get_or_insert_channle().unwrap();
    channel.as_ref().unwrap().0.send(event)
}

fn initialize() {
    environment_dependent_initialize();

    std::thread::spawn(|| {
        loop {
            drop(read_thread());
        }
    });

    unsafe { INITIALIZED = true };
}

#[cfg(target_family = "unix")]
fn environment_dependent_initialize() {
    drop(unix::event_source::get_or_insert_event_source());
}

#[cfg(target_family = "unix")]
fn read_thread() -> std::io::Result<()> {
    unix::event::read()
        .map(|event| {
            if let Some(event) = event { let _ = send_event(event); }
            ()
        })
}

pub fn read() -> Option<Event> {
    if unsafe { !INITIALIZED } { initialize(); }

    let event = pop_event().unwrap();
    if event.is_none() {
        let channel = get_or_insert_channle().unwrap();
        channel.as_ref().unwrap().1.try_recv().map(|event| Some(event)).unwrap_or(None)
    } else {
        event
    }
}

pub fn poll(duration: Duration) -> bool {
    if unsafe { !INITIALIZED } { initialize(); }
    
    if event_exist().unwrap() {
        true
    } else {
        let channel = get_or_insert_channle().unwrap();
        let received = channel.as_ref().unwrap().1.recv_timeout(duration).map(|event| Some(event)).unwrap_or(None);
        if received.is_some() {
            let _ = push_event(received.unwrap());
            return true;
        }
        false
    }
}
