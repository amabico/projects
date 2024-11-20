use std::collections::VecDeque;
use std::sync::{Mutex, MutexGuard, PoisonError};
use std::time::{Instant, Duration};

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

fn pop_event() -> Result<Option<Event>, PoisonError<MutexGuard<'static, VecDeque<Event>>>> {
    EVENTS.lock()
        .map(|mut events| events.pop_front())
}

fn push_event(event: Event) -> Result<(), PoisonError<MutexGuard<'static, VecDeque<Event>>>> {
    EVENTS.lock()
        .map(|mut events| { events.push_back(event) })
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
            if let Some(event) = event { let _ = push_event(event); }
            ()
        })
}

pub fn read() -> Option<Event> {
    if unsafe { !INITIALIZED } { initialize(); }

    pop_event().unwrap_or(None)
}

// It's better to provide effective poll function... 
pub fn poll(duration: Duration) -> bool {
    if unsafe { !INITIALIZED } { initialize(); }

    let now = Instant::now();

    while duration >= now.elapsed() {
        if EVENTS.try_lock().map(|events| events.len() > 0).unwrap_or(false) {
            return true
        }
    }
    false
}
