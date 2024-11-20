use std::os::fd::RawFd;
use std::io::Result;

pub fn get_tty_file_descriptor() -> Result<i32> {
    let fd = if libc_wrapper::isatty(libc_wrapper::STDIN_FILENO) == 1 {
        libc_wrapper::STDIN_FILENO
    } else {
        panic!();
    };

    Ok(fd)
}

pub struct FileDescritor {
    pub fd: RawFd,
}

impl FileDescritor {
    pub fn new(fd: RawFd) -> Self {
        Self { fd }
    }

    pub fn read(&self, buffer: &mut [u8]) -> Result<usize> {
        let result = libc_wrapper::read(self.fd, buffer, buffer.len());

        result
    }
}
