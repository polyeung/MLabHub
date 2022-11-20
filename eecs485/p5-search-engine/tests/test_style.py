"""Code style tests."""
import glob
import subprocess
import utils


def test_pycodestyle():
    """Run pycodestyle."""
    assert_no_prohibited_terms("nopep8", "noqa", "pylint")
    subprocess.run([
        "pycodestyle",
        "index_server/index",
        "search_server/search",
        "inverted_index",
    ], check=True)


def test_pydocstyle():
    """Run pydocstyle."""
    assert_no_prohibited_terms("nopep8", "noqa", "pylint")
    subprocess.run([
        "pydocstyle",
        "index_server",
        "search_server/search",
        "inverted_index",
    ], check=True)


def test_pylint():
    """Run pylint."""
    assert_no_prohibited_terms("nopep8", "noqa", "pylint")
    mapreduce_files = glob.glob("inverted_index/*.py")
    subprocess.run([
        "pylint",
        "--rcfile", utils.TESTDATA_DIR/"pylintrc",
        "--disable=cyclic-import",
        "--unsafe-load-any-extension=y",
        "--min-similarity-lines=10",
        "index_server/index",
        "search_server/search",
        *mapreduce_files,
    ], check=True)


def assert_no_prohibited_terms(*terms):
    """Check for prohibited terms before testing style."""
    for term in terms:
        completed_process = subprocess.run(
            [
                "grep",
                "-r",
                "-n",
                term,
                "--include=*.py",
                "--exclude=__init__.py",
                "index_server",
                "search_server",
            ],
            check=False,  # We'll check the return code manually
            stdout=subprocess.PIPE,
            universal_newlines=True,
        )

        # Grep exit code should be non-zero, indicating that the prohibited
        # term was not found.  If the exit code is zero, crash and print a
        # helpful error message with a filename and line number.
        assert completed_process.returncode != 0, (
            f"The term '{term}' is prohibited.\n{completed_process.stdout}"
        )
