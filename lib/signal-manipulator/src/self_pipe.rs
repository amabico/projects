use std::collections::HashMap;
use std::sync::OnceLock;
use libc_wrapper::{Int, sigaction, Sigaction,SIGWINCH, SIGINFO, write};

struct Signal {
    action: Box<dyn Fn() -> ()>,
}

struct GlobalData {
    signals: HashMap<Int, Signal>,
}

static mut GLOBAL_DATA: OnceLock<GlobalData> = OnceLock::new();

impl GlobalData {
    fn get() -> &'static Self {
        unsafe {
            GLOBAL_DATA.get_or_init(|| GlobalData {
                signals: HashMap::new(),
            })
        }
    }
}

extern "C" fn handler(sig: Int) {
    let global_data = GlobalData::get();

    (global_data.signals.get(&sig).unwrap().action)();
}

pub fn register<P>(signal: Int, pipe: P)
where
    P: std::os::fd::IntoRawFd + 'static + Sync + Send,
{
    let raw_fd = pipe.into_raw_fd();

    let action = move || {
        let data = b"X" as *const _ as *const _;
        write(raw_fd, data, 1);
    };

    let _ = GlobalData::get();
    unsafe {
        GLOBAL_DATA.get_mut().unwrap().signals.insert(
            signal,
            Signal {
                action: Box::new(action),
            },
        )
    };

    let mut new = Sigaction::new();
    new.sa_sigaction = handler as usize;
    new.sa_flags = SIGINFO;
    let old = Sigaction::new();

    sigaction(SIGWINCH, &new, &old);
}
