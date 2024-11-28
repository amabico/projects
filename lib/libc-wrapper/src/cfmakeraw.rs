use crate::Termios;

pub fn cfmakeraw(termios: &mut Termios) {
    unsafe { libc::cfmakeraw(&mut termios.as_libc_struct()); }
}