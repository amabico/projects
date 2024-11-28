use std::os::fd::RawFd;
use crate::Short;

pub const POLLIN: Short = 0x1;
pub const POLLOUT: Short = 0x4;
pub const POLLERR: Short = 0x8;

pub struct Pollfd {
    pub fd: RawFd,
    pub events: Short,
    pub revents: Short,
}

impl Pollfd {
    pub fn as_libc_struct(&self) -> libc::pollfd {
        libc::pollfd {
            fd: self.fd,
            events: self.events as Short,
            revents: self.revents as Short,
        }
    }
}
