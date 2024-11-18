use crate::Int;

pub fn sigaction(signum: Int, act: &Sigaction, oldact: &Sigaction) -> Int {
    unsafe { libc::sigaction(signum, &act.as_libc_struct(), &mut oldact.as_libc_struct()) }
}

pub struct Sigaction {
    pub sa_sigaction: usize,
    pub sa_flags: Int,
}

impl Sigaction {
    pub fn new() -> Self {
        unsafe { core::mem::zeroed() }
    }

    pub fn as_libc_struct(&self) -> libc::sigaction {
        let mut sigaction: libc::sigaction = unsafe { core::mem::zeroed() };
        sigaction.sa_sigaction = self.sa_sigaction;
        sigaction.sa_flags = self.sa_flags;

        sigaction
    }
}