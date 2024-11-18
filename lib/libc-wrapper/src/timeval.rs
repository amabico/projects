use crate::Long;

pub struct Timeval {
    pub tv_sec: Long,
    pub tv_usec: Long,
}

impl Timeval {
    pub fn as_libc_struct(&self) -> libc::timeval {
        libc::timeval {
            tv_sec: self.tv_sec as _,
            tv_usec: self.tv_usec as _,
        }
    }
}
