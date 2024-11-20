use terminal_events::{poll, read, enter_raw_mode};
use std::time::Duration;

fn main() {
    enter_raw_mode();

    println!("Exit when detect some event.");
    loop {
        if poll(Duration::new(0, 100)) {
            println!("Event: {:?}", read().unwrap());
            break
        }
    }
}
