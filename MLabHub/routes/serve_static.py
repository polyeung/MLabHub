import flask
from werkzeug.utils import secure_filename

import MLabHub


@MLabHub.app.route('/', defaults={'filename': ''})
@MLabHub.app.route('/<path:filename>')
def serve_spa(filename: str):
    """Serve a Single Page Application index.html file."""

    # Prevent directory traversal attacks
    filename = secure_filename(filename)

    if filename.find('.') >= 0:
        # Serve favicon.ico, manifest.json, robots.txt, etc..
        return MLabHub.app.send_static_file(filename)
    else:
        # Serve SPA pages
        return MLabHub.app.send_static_file('index.html')


@MLabHub.app.route('/assets/<path:filename>')
def serve_assets(filename: str):
    """Serve anything under /dist/assets."""

    filename = secure_filename(filename)
    return MLabHub.app.send_static_file(f"assets/{filename}")
