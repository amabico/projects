use libc_wrapper::{Pollfd, POLLIN};
use std::io::Result;
use std::time::Duration;

use crate::unix::event_source::get_or_insert_event_source;
use crate::unix::parser::parse;
use crate::Event;

const TTY_BUFFER_SIZE: usize = 1_024;

pub fn read() -> Result<Option<Event>> {
    poll_impl(None).map(|result| {
        let event_source = get_or_insert_event_source();
        if event_source.is_err() { return None };
        let event_source = event_source.unwrap();
        let event_source = event_source.as_ref().unwrap();

        if result == 1 {
            let mut buffer = [0u8; TTY_BUFFER_SIZE];
            let result = event_source.tty.read(&mut buffer).unwrap();
            println!("{} {} {}", &buffer[0], &buffer[1], &buffer[2]);
            let key_code = parse(&buffer[..(result as usize)]);
            return key_code.map(|code| Some(Event::KeyPress(code))).unwrap_or(None);
        }

        if result == 2 {
            let mut buffer = [0u8; TTY_BUFFER_SIZE];
            let _ = event_source.sig_winch.read(&mut buffer).unwrap();

            return Some(Event::WindowResized);
        }

        None
    })
}

pub fn poll(duration: Duration) -> Result<bool> {
    poll_impl(Some(duration)).map(|result| result != 0)
}

fn poll_impl(duration: Option<Duration>) -> Result<usize> {
    let event_source = get_or_insert_event_source();
    if event_source.is_err() { return Ok(0) };
    let event_source = event_source.unwrap();
    let event_source = event_source.as_ref().unwrap();

    let tty_pollfd = Pollfd {
        fd: event_source.tty.fd,
        events: POLLIN,
        revents: 0,
    };

    let sig_winch_pollfd = Pollfd {
        fd: event_source.sig_winch.fd,
        events: POLLIN,
        revents: 0,
    };

    let mut fds = [tty_pollfd, sig_winch_pollfd];

    if libc_wrapper::poll(&mut fds, duration).is_err() {
        let err = std::io::Error::last_os_error();
        match err.kind() {
            std::io::ErrorKind::Interrupted => return Ok(0),
            _ => return Err(err.into()),
        }
    } else {
        if fds[0].revents & POLLIN != 0 {
            return Ok(1)
        }
        if fds[1].revents & POLLIN != 0 {
            return Ok(2)
        }
    }
    Ok(0)
}