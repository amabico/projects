use crate::KeyCode;

pub fn parse(buffer: &[u8]) -> Option<KeyCode> {
    if buffer.is_empty() {
        return None;
    }

    let mut key_code = parse_xterm_sequences(buffer);
    if key_code.is_none() {
        key_code = parse_characters(buffer);
    }

    key_code
}

pub fn parse_xterm_input_sequences(buffer: &[u8]) -> Option<KeyCode> {
    match buffer[0] {
        b'\x1B' => {
            if buffer.len() == 1 {
                Some(KeyCode::Esc)
            } else {
                match buffer[1] {
                    b'[' => {
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

fn parse_characters(buffer: &[u8]) -> Option<KeyCode> {
    std::str::from_utf8(buffer)
        .map(|s| Some(KeyCode::Char(s.chars().collect::<Vec<char>>()[0])))
        .unwrap_or(None)
}