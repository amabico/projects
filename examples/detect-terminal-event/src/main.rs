use terminal_events::{read, enter_raw_mode};

fn main() {
    enter_raw_mode();

    println!("Exit when detect some event.");
    loop {
        let event = read();
        if event.is_some() {
            break
        }
    }
}
