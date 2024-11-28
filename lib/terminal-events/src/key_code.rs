#[derive(PartialEq, Debug)]
pub enum KeyCode {
    Esc,
    Left,
    Right,
    Up,
    Down,
    Home,
    End,
    F(u8),
    Char(char),
}
