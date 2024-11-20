use crate::{Int, Termios};
use std::os::fd::RawFd;

pub fn tcgetattr(fd: RawFd, termios: &mut Termios) -> Int {
    unsafe { libc::tcgetattr(fd, &mut termios.as_libc_struct()) }
}