// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.show();
                let _ = window.set_focus();
            }
        }))
        .plugin(tauri_plugin_deep_link::init())
        .invoke_handler(tauri::generate_handler![
            keepnotes_desktop::store_os_credential,
            keepnotes_desktop::read_os_credential,
            keepnotes_desktop::delete_os_credential,
            keepnotes_desktop::send_native_notification,
            keepnotes_desktop::reveal_file_in_explorer,
            keepnotes_desktop::open_file_in_default_app,
            keepnotes_desktop::hide_to_tray,
            keepnotes_desktop::quit_application
        ])
        .run(tauri::generate_context!())
        .expect("error while running KeepNotes desktop application");
}
