use anyhow::{Context, Result};
use std::fs;
use std::path::{Path, PathBuf};

pub struct StaticContent {
    pub data: Vec<u8>,
    pub mime_type: String,
}

pub fn serve_static(static_dir: &Path, request_path: &str) -> Result<StaticContent> {
    let path = normalize_path(request_path)?;
    let full_path = static_dir.join(path);

    if !full_path.starts_with(static_dir) {
        anyhow::bail!("Invalid path");
    }

    let full_path = if full_path.is_dir() { full_path.join("index.html") } else { full_path };

    let data =
        fs::read(&full_path).with_context(|| format!("Failed to read file: {:?}", full_path))?;

    let mime_type = get_mime_type(&full_path);

    Ok(StaticContent { data, mime_type })
}

fn normalize_path(path: &str) -> Result<PathBuf> {
    let path = path.trim_start_matches('/');
    let normalized = Path::new(path)
        .components()
        .filter(|c| !matches!(c, std::path::Component::ParentDir))
        .collect::<PathBuf>();
    Ok(normalized)
}

fn get_mime_type(path: &Path) -> String {
    match path.extension().and_then(|e| e.to_str()) {
        Some("html") => "text/html; charset=utf-8",
        Some("css") => "text/css; charset=utf-8",
        Some("js") => "application/javascript; charset=utf-8",
        Some("json") => "application/json; charset=utf-8",
        Some("png") => "image/png",
        Some("jpg") | Some("jpeg") => "image/jpeg",
        Some("svg") => "image/svg+xml",
        Some("webp") => "image/webp",
        Some("ico") => "image/x-icon",
        _ => "application/octet-stream",
    }
    .to_string()
}
