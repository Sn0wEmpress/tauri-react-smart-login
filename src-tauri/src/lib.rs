// Import our window controls module
mod window_controls;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            window_controls::minimize_window,
            window_controls::maximize_window,
            window_controls::unmaximize_window,
            window_controls::close_window,
            window_controls::is_window_maximized
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
