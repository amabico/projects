use crate::{Int, Void};

pub fn write(fd: Int, buf: *const Void, count: usize) -> isize {
    unsafe { libc::write(fd, buf, count) }
}