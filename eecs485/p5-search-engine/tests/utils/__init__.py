"""Autograder utilities."""
import glob
import pathlib
import shutil
from .pipeline import Pipeline
from .inverted_index import (
    assert_inverted_index_eq,
    assert_rest_api_hit_eq,
)

# Directory containing unit tests.  Tests look here for files like inputs.
TEST_DIR = pathlib.Path(__file__).parent.parent

# Directory containing unit test input files
TESTDATA_DIR = TEST_DIR/"testdata"

# Default timeout to wait for student code to respond
TIMEOUT = 10


def copyglob(pattern, dst):
    """Evaluate glob pattern and copy files to dst."""
    for src in glob.glob(pattern):
        shutil.copy(src, dst)
