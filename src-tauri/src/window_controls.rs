use tauri::{AppHandle, Manager};

#[tauri::command]
pub fn minimize_window(window_label: Option<String>, app_handle: AppHandle) -> Result<(), String> {
    let window = match window_label {
        Some(label) => app_handle.get_webview_window(&label),
        None => app_handle.get_webview_window("main"),
    };
    
    if let Some(window) = window {
        window.minimize().map_err(|e| e.to_string())
    } else {
        Err("Window not found".to_string())
    }
}

#[tauri::command]
pub fn maximize_window(window_label: Option<String>, app_handle: AppHandle) -> Result<(), String> {
    let window = match window_label {
        Some(label) => app_handle.get_webview_window(&label),
        None => app_handle.get_webview_window("main"),
    };
    
    if let Some(window) = window {
        window.maximize().map_err(|e| e.to_string())
    } else {
        Err("Window not found".to_string())
    }
}

#[tauri::command]
pub fn unmaximize_window(window_label: Option<String>, app_handle: AppHandle) -> Result<(), String> {
    let window = match window_label {
        Some(label) => app_handle.get_webview_window(&label),
        None => app_handle.get_webview_window("main"),
    };
    
    if let Some(window) = window {
        window.unmaximize().map_err(|e| e.to_string())
    } else {
        Err("Window not found".to_string())
    }
}

#[tauri::command]
pub fn close_window(window_label: Option<String>, app_handle: AppHandle) -> Result<(), String> {
    let window = match window_label {
        Some(label) => app_handle.get_webview_window(&label),
        None => app_handle.get_webview_window("main"),
    };
    
    if let Some(window) = window {
        window.close().map_err(|e| e.to_string())
    } else {
        Err("Window not found".to_string())
    }
}

#[tauri::command]
pub fn is_window_maximized(window_label: Option<String>, app_handle: AppHandle) -> Result<bool, String> {
    let window = match window_label {
        Some(label) => app_handle.get_webview_window(&label),
        None => app_handle.get_webview_window("main"),
    };
    
    if let Some(window) = window {
        window.is_maximized().map_err(|e| e.to_string())
    } else {
        Err("Window not found".to_string())
    }
}
