use std::time::Duration;
use std::io::Result;

use crate::KeyCode;
#[cfg(target_family = "unix")]
use crate::unix;

#[derive(Debug)]
pub enum Event {
    KeyPress(KeyCode),
    WindowResized,
}

pub fn read() -> Result<Option<Event>> {
    unix::event::read()
}

pub fn poll(duration: Duration) -> Result<bool> {
    unix::event::poll(duration)
}
