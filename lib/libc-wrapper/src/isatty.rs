use crate::Int;

pub fn isatty(fd: Int) -> Int {
    unsafe { libc::isatty(fd) }
}