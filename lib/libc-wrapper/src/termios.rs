pub struct Termios {
    termios: libc::termios
}

impl Termios {
    pub fn new() -> Self {
        let termios = libc::termios {
            c_iflag: 0,
            c_oflag: 0,
            c_cflag: 0,
            c_lflag: 0,
            c_cc: [0; 20],
            c_ispeed: 0,
            c_ospeed: 0,
        };

        Self { termios }
    }

    pub fn as_libc_struct(&self) -> libc::termios {
        self.termios
    }
}