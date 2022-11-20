"""Utility and init script tests."""
import shutil
import time
import subprocess
from pathlib import Path
import pytest
import utils


# Time to wait for server to start
TIMEOUT = 10

# This pylint warning is endemic to pytest.
# pylint: disable=unused-argument


@pytest.fixture(name="setup_teardown")
def setup_teardown_fixture():
    """Set up the test and cleanup after."""
    # Setup code: make sure no stale processes are running
    assert not pgrep("flask"), \
        "Found running flask process.  Try 'pkill -f flask'"

    # Transfer control to testcase
    yield None

    # Teardown: kill any stale processes
    pkill("flask")
    assert wait_for_flask_stop()


def test_executables(setup_teardown):
    """Verify bin/index, bin/search, bin/searchdb are shell scripts."""
    assert_is_shell_script("bin/install")
    assert_is_shell_script("bin/search")
    assert_is_shell_script("bin/index")
    assert_is_shell_script("bin/searchdb")


def test_install():
    """Verify install script contains the right commands."""
    install_content = Path("bin/install").read_text(encoding='utf-8')
    assert "python3 -m venv" in install_content
    assert "source env/bin/activate" in install_content
    assert "pip install -r requirements.txt" in install_content
    assert "pip install -e search_server" in install_content
    assert "pip install -e index_server" in install_content


def test_servers_start(setup_teardown):
    """Verify index and search servers start."""
    # We need to use subprocess.run() on commands that will return non-zero
    # pylint: disable=subprocess-run-check

    # Try to start search server with missing database
    db_path = Path("var/search.sqlite3")
    if db_path.exists():
        db_path.unlink()
    completed_process = subprocess.run(["bin/search", "start"])
    assert completed_process.returncode != 0

    # Create database
    db_path.parent.mkdir(exist_ok=True)
    shutil.copy(utils.TESTDATA_DIR/"search.sqlite3", db_path)

    # Try to start search server with missing index server
    completed_process = subprocess.run(["bin/search", "start"])
    assert completed_process.returncode != 0

    # Start index server, which should start 3 Flask processes
    subprocess.run(["bin/index", "start"], check=True)
    assert wait_for_flask_start(nprocs=3)

    # Try to start index server when it's already running
    completed_process = subprocess.run(["bin/index", "start"])
    assert completed_process.returncode != 0

    # Start search server
    subprocess.run(["bin/search", "start"], check=True)
    assert wait_for_flask_start(nprocs=4)

    # Try to start search server when it's already running
    completed_process = subprocess.run(["bin/search", "start"])
    assert completed_process.returncode != 0


def test_servers_stop(setup_teardown):
    """Verify index and search servers start."""
    # Start servers
    subprocess.run(["bin/index", "start"], check=True)
    assert wait_for_flask_start(nprocs=3)
    subprocess.run(["bin/search", "start"], check=True)
    assert wait_for_flask_start(nprocs=4)

    # Stop servers
    subprocess.run(["bin/index", "stop"], check=True)
    subprocess.run(["bin/search", "stop"], check=True)
    assert wait_for_flask_stop()


def test_servers_status(setup_teardown):
    """Verify index and search init script status subcommand."""
    # We need to use subprocess.run() on commands that will return non-zero
    # pylint: disable=subprocess-run-check

    # Create database
    db_path = Path("var/search.sqlite3")
    db_path.parent.mkdir(exist_ok=True)
    shutil.copy(utils.TESTDATA_DIR/"search.sqlite3", db_path)

    # Verify status stopped
    completed_process = subprocess.run(["bin/index", "status"])
    assert completed_process.returncode != 0
    completed_process = subprocess.run(["bin/search", "status"])
    assert completed_process.returncode != 0

    # Start index and check status
    subprocess.run(["bin/index", "start"], check=True)
    assert wait_for_flask_start(nprocs=3)
    completed_process = subprocess.run(["bin/index", "status"])
    assert completed_process.returncode == 0

    # Start search and check status
    subprocess.run(["bin/search", "start"], check=True)
    assert wait_for_flask_start(nprocs=4)
    completed_process = subprocess.run(["bin/search", "status"])
    assert completed_process.returncode == 0

    # Stop servers
    subprocess.run(["bin/index", "stop"], check=True)
    subprocess.run(["bin/search", "stop"], check=True)
    assert wait_for_flask_stop()


def test_searchdb(setup_teardown, tmpdir):
    """Test the searchdb script.

    Note: 'tmpdir' is a fixture provided by the pytest package.  It creates a
    unique temporary directory before the test runs, and removes it afterward.
    https://docs.pytest.org/en/6.2.x/tmpdir.html#the-tmpdir-fixture
    """
    # We need to use subprocess.run() on commands that will return non-zero
    # pylint: disable=subprocess-run-check

    # Create tmp directory containing search_server/search/sql/search.sql
    Path(tmpdir/"search_server/search/sql").mkdir(parents=True)
    shutil.copy(
        utils.TESTDATA_DIR/"small.sql",
        tmpdir/"search_server/search/sql/search.sql",
    )

    # Run searchdb create and verify var/search.sqlite3 was created
    searchdb_path = Path("bin/searchdb").resolve()
    subprocess.run(
        [searchdb_path, "create"],
        cwd=tmpdir,
        check=True,
    )
    db_path = tmpdir/"var/search.sqlite3"
    assert db_path.exists()

    # Try to create the database again, should get an error
    completed_process = subprocess.run([searchdb_path, "create"])
    assert completed_process.returncode != 0

    # Run searchdb destroy and verify var/search.sqlite3 deleted
    subprocess.run(
        [searchdb_path, "destroy"],
        cwd=tmpdir,
        check=True,
    )
    assert not db_path.exists()

    # Run searchdb reset and verify var/search.sqlite3 created
    subprocess.run(
        [searchdb_path, "reset"],
        cwd=tmpdir,
        check=True,
    )
    assert db_path.exists()


def pgrep(pattern):
    """Return list of matching processes."""
    completed_process = subprocess.run(
        ["pgrep", "-f", pattern],
        check=False,  # We'll check the return code manually
        stdout=subprocess.PIPE,
        universal_newlines=True,
    )
    if completed_process.returncode == 0:
        return completed_process.stdout.strip().split("\n")
    return []


def pkill(pattern):
    """Issue a "pkill -f pattern" command, ignoring the exit code."""
    subprocess.run(["pkill", "-f", pattern], check=False)


def assert_is_shell_script(path):
    """Assert path is an executable shell script."""
    path = Path(path)
    assert path.exists()
    output = subprocess.run(
        ["file", path],
        check=True, stdout=subprocess.PIPE, universal_newlines=True,
    ).stdout
    assert "shell script" in output
    assert "executable" in output


def wait_for_flask_start(nprocs):
    """Wait for nprocs Flask processes to start running."""
    # Need to check for processes twice to make sure that
    # the flask processes doesn't error out but get marked correct
    count = 0
    for _ in range(TIMEOUT):
        if len(pgrep("flask")) == nprocs:
            count += 1
        if count >= 2:
            return True
        time.sleep(1)
    return False


def wait_for_flask_stop():
    """Wait for Flask servers to stop running."""
    for _ in range(TIMEOUT):
        if not pgrep("flask"):
            return True
        time.sleep(1)
    return False
