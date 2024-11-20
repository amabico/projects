use crate::KeyCode;

pub fn parse(buffer: &[u8]) -> Option<KeyCode> {
    if buffer.is_empty() {
        return None;
    }

    parse_xterm_sequences(buffer)
}

pub fn parse_xterm_sequences(buffer: &[u8]) -> Option<KeyCode> {
    match buffer[0] {
        b'\x1B' => {
            if buffer.len() == 1 {
                Some(KeyCode::Esc)
            } else {
                match buffer[1] {
                    b'[' => {
                        // ANSI escape code: xterm sequence
                        match buffer[2] {
                            b'D' => Some(KeyCode::Left),
                            b'C' => Some(KeyCode::Right),
                            b'A' => Some(KeyCode::Up),
                            b'B' => Some(KeyCode::Down),
                            b'H' => Some(KeyCode::Home),
                            b'F' => Some(KeyCode::End),
                            _ => None
                        }
                    },
                    _ => None
                }
            }
        },
        _ => None,
    }
}