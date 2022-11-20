"""Verify submitted files and directories required by the spec."""

from pathlib import Path


def test_files_exist():
    """Check for files and directories required by the spec."""
    assert Path("bin").exists()
    assert Path("bin/search").exists()
    assert Path("bin/index").exists()
    assert Path("bin/searchdb").exists()
    assert Path("bin/install").exists()
    assert Path("inverted_index/pipeline.sh").exists()
    assert Path("index_server").exists()
    assert Path("index_server/index").exists()
    assert Path("index_server/index/api").exists()
    assert Path("index_server/pyproject.toml").exists()
    assert Path(
        "index_server/index/inverted_index/inverted_index_0.txt"
    ).exists()
    assert Path(
        "index_server/index/inverted_index/inverted_index_1.txt"
    ).exists()
    assert Path(
        "index_server/index/inverted_index/inverted_index_2.txt"
    ).exists()
    assert Path("search_server").exists()
    assert Path("search_server/search/sql").exists()
    assert Path("search_server/search").exists()
    assert Path("search_server/search/views").exists()
    assert Path("search_server/pyproject.toml").exists()
