// KeepNotes Native Desktop Shell - Rust Bridge (Tauri 2.0)
// Exposes root-scoped filesystem watcher, OS keychain, tray, notifications, and window controls.

use keyring::Entry;
use notify::{Config, RecommendedWatcher, RecursiveMode, Watcher};
use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Emitter, Manager, State};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct NativeFsEventPayload {
    pub r#type: String,
    pub relative_path: String,
    pub old_relative_path: Option<String>,
}

pub struct DesktopState {
    pub watcher: Arc<Mutex<Option<RecommendedWatcher>>>,
    pub active_root: Arc<Mutex<Option<PathBuf>>>,
}

#[tauri::command]
pub fn store_os_credential(service: String, account: String, secret: String) -> Result<(), String> {
    if service.to_lowercase().contains("master_password") {
        return Err("Master password cannot be stored in OS credential store".into());
    }
    let entry = Entry::new(&service, &account).map_err(|e| e.to_string())?;
    entry.set_password(&secret).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn read_os_credential(service: String, account: String) -> Result<String, String> {
    let entry = Entry::new(&service, &account).map_err(|e| e.to_string())?;
    entry.get_password().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_os_credential(service: String, account: String) -> Result<(), String> {
    let entry = Entry::new(&service, &account).map_err(|e| e.to_string())?;
    entry.delete_password().map_err(|e| e.to_string())
}

#[tauri::command]
pub fn send_native_notification(app: AppHandle, title: String, body: String) -> Result<(), String> {
    use tauri_plugin_notification::NotificationExt;
    app.notification()
        .builder()
        .title(title)
        .body(body)
        .show()
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn reveal_file_in_explorer(root_path: String, relative_path: String) -> Result<(), String> {
    let root = Path::new(&root_path);
    let full = root.join(&relative_path);
    if !full.starts_with(root) {
        return Err("Path traversal forbidden".into());
    }
    if let Some(parent) = full.parent() {
        open::that(parent).map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
pub fn open_file_in_default_app(root_path: String, relative_path: String) -> Result<(), String> {
    let root = Path::new(&root_path);
    let full = root.join(&relative_path);
    if !full.starts_with(root) {
        return Err("Path traversal forbidden".into());
    }
    open::that(full).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub fn hide_to_tray(app: AppHandle) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("main") {
        window.hide().map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
pub fn quit_application(app: AppHandle) -> Result<(), String> {
    app.exit(0);
    Ok(())
}
