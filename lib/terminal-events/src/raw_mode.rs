use std::io::Result;

pub fn get_tty_file_descriptor() -> Result<i32> {
    let fd = if libc_wrapper::isatty(libc_wrapper::STDIN_FILENO) == 1 {
        libc_wrapper::STDIN_FILENO
    } else {
        panic!();
    };

    Ok(fd)
}

pub fn enter_raw_mode() -> Result<()> {
    let fd = get_tty_file_descriptor()?;

    let mut termios = libc_wrapper::Termios::new();

    libc_wrapper::tcgetattr(fd, &mut termios);
    libc_wrapper::cfmakeraw(&mut termios);
    libc_wrapper::tcsetattr(fd, 0, &mut termios);

    Ok(())
}
