use crate::unix::file_descriptor::{get_tty_file_descriptor, FileDescritor};
use std::sync::{Mutex, MutexGuard, PoisonError};
use std::os::unix::net::UnixStream;
use signal_manipulator::self_pipe::register;
use std::os::fd::IntoRawFd;
use std::io::Result;

pub struct EventSource {
    pub tty: FileDescritor,
    pub sig_winch: FileDescritor,
}

static EVENT_SOURCE: Mutex<Option<EventSource>> = Mutex::new(None);

fn nonblocking_unix_pair() -> Result<(UnixStream, UnixStream)> {
    let (receiver, sender) = UnixStream::pair()?;
    receiver.set_nonblocking(true)?;
    sender.set_nonblocking(true)?;
    Ok((receiver, sender))
}

impl EventSource {
    fn new() -> Result<Self> {
        Ok(EventSource {
            tty: FileDescritor::new(get_tty_file_descriptor()?),
            sig_winch: {
                let (receiver, sender) = nonblocking_unix_pair()?;

                register(libc_wrapper::SIGWINCH, sender);

                FileDescritor::new(receiver.into_raw_fd())
            },
        })
    }
}

pub fn get_or_insert_event_source() -> std::result::Result<MutexGuard<'static, Option<EventSource>>, PoisonError<MutexGuard<'static, Option<EventSource>>>> {
    EVENT_SOURCE.lock().map(|mut optional_event_source| {
        if optional_event_source.is_none() {
            *optional_event_source = Some(EventSource::new().unwrap());
        }
        return optional_event_source;
    })
}
