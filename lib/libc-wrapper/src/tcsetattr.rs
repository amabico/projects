use crate::{Int, Termios};
use std::os::fd::RawFd;

pub fn tcsetattr(fd: RawFd, optional_actions: Int, termios: &mut Termios) -> Int {
    unsafe { libc::tcsetattr(fd, optional_actions, &mut termios.as_libc_struct()) }
}