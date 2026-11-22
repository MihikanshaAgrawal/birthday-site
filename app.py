
import streamlit as st
import streamlit.components.v1 as components

from pathlib import Path
import base64
import re

st.set_page_config(
    page_title="A Universe For You 💗",
    page_icon="💗",
    layout="wide",
    initial_sidebar_state="collapsed"
)

ROOT = Path(__file__).resolve().parent


def read_file(filename):
    return (ROOT / filename).read_text(encoding="utf-8")


def to_data_url(path):
    file = ROOT / path

    if not file.is_file():
        return path

    mime_types = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".gif": "image/gif",
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".ogg": "audio/ogg",
        ".mp4": "video/mp4",
        ".svg": "image/svg+xml",
    }

    mime = mime_types.get(file.suffix.lower())

    if not mime:
        return path

    encoded = base64.b64encode(file.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{encoded}"


# Read original website
html = read_file("index.html")
css = read_file("style.css")
js = read_file("script.js")


# Add optional Chapter 05 files if they exist
if (ROOT / "chapter5.css").exists():
    css += "\n" + read_file("chapter5.css")

if (ROOT / "chapter5.js").exists():
    js += "\n" + read_file("chapter5.js")


# Replace local image/audio/video paths with embedded assets
def replace_asset(match):
    original = match.group(0)
    path = match.group(1)
    return original.replace(path, to_data_url(path))


html = re.sub(
    r"""assets/(?:photos|music)/[^"'\s<>]+""",
    lambda match: to_data_url(match.group(0)),
    html
)

css = re.sub(
    r"""url\(\s*['"]?(assets/[^)'"]+)['"]?\s*\)""",
    lambda match: f'url("{to_data_url(match.group(1))}")',
    css
)


# Remove external local CSS/JS references
html = re.sub(
    r'<link\b[^>]*href=["\'](?:style|chapter5)\.css["\'][^>]*>',
    "",
    html,
    flags=re.IGNORECASE
)

html = re.sub(
    r'<script\b[^>]*src=["\'](?:script|chapter5)\.js["\'][^>]*>\s*</script>',
    "",
    html,
    flags=re.IGNORECASE
)


# Embed original CSS and JavaScript
html = html.replace(
    "</head>",
    f"<style>{css}</style></head>",
    1
)

html = html.replace(
    "</body>",
    f"<script>{js}</script></body>",
    1
)


# Streamlit page styling
st.markdown(
    """
    <style>
    header[data-testid="stHeader"] {
        display: none;
    }

    footer {
        display: none;
    }

    .block-container {
        padding: 0 !important;
        max-width: 100% !important;
    }

    iframe {
        border: none !important;
    }
    </style>
    """,
    unsafe_allow_html=True
)


# Display complete birthday website
components.html(
    html,
    height=900,
    scrolling=True
)
