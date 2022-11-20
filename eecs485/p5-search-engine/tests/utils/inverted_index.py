"""Inverted index comparison utilities."""
import pytest


# Tolerance for comparing IDF and normalization values, expressed as a fraction
# of the expected value.  We're using pytest.approx() relative comparison.
# https://docs.pytest.org/en/6.2.x/reference.html#pytest-approx
TOLERANCE = 0.05


def assert_inverted_index_eq(path1, path2):
    """Raise assertion if two inverted indexes do not match."""
    if path1.is_dir() and path2.is_dir():
        return assert_inverted_index_dir_eq(path1, path2)
    if path1.is_file() and path2.is_file():
        return assert_inverted_index_file_eq(path1, path2)
    raise AssertionError("path1 and path2 must both be files or both be dirs")


def assert_inverted_index_dir_eq(dir1, dir2):
    """Raise assertion if any inverted index segment differs."""
    assert dir1 != dir2, (
        "Refusing to compare a directory to itself:\n"
        f"dir1 = {dir1}\n"
        f"dir2 = {dir2}\n"
    )

    # Get a list of files in each directory, ignoring subdirs
    paths1 = list(dir1.iterdir())
    paths2 = list(dir2.iterdir())
    paths1 = [p for p in paths1 if p.is_file()]
    paths2 = [p for p in paths2 if p.is_file()]

    # Sanity checks
    assert paths1, f"Empty directory: {dir1}"
    assert paths2, f"Empty directory: {dir2}"
    assert len(paths1) == len(paths2), (
        "Number of output files does not match\n"
        f"dir1 = {dir1}\n"
        f"dir2 = {dir2}\n"
        f"number of files in dir1 = {len(paths1)}\n"
        f"number of files in dir2 = {len(paths2)}\n"
    )

    # Compare inverted index segments pairwise
    for path1, path2 in zip(sorted(paths1), sorted(paths2)):
        assert_inverted_index_file_eq(path1, path2)


def assert_inverted_index_file_eq(path1, path2):
    """Raise assertion if inverted indexes differ."""
    lines1 = path1.open().readlines()
    lines2 = path2.open().readlines()

    # Debug message to append to assertions
    debug_info = (
        f"path1 = {str(path1)}\n"
        f"path2 = {str(path2)}\n"
    )

    # Compare two inverted indexes, line-by-line.  Each line contains one term,
    # one idf value and one or more hits.  Each hit is represented by 3
    # numbers: doc id, number of occurrences of the term, and normalization
    # factor.
    for line1, line2 in zip(lines1, lines2):
        assert_inverted_index_line_eq(line1, line2, debug_info)

    # Verify correct number of terms
    assert len(lines1) == len(lines2), (
        f"Number of lines mismatch:\n"
        f"path1 = {str(path1)}\n"
        f"path2 = {str(path2)}\n"
        f"len(lines1) = {len(lines1)}\n"
        f"len(lines2) = {len(lines2)}\n"
    )


def assert_inverted_index_line_eq(line1, line2, debug_info=""):
    """Raise an assertion if inverted index line1 != line2.

    Prepend debug_info to any assertion error message.

    """
    line1 = line1.strip()
    line2 = line2.strip()
    items1 = line1.split()
    items2 = line2.split()

    # Append line text to assertion messages
    debug_info += (
        f"line1 = {line1}\n"
        f"line2 = {line2}\n"
    )

    # Divide one line of inverted index into term, idf, and hits.  Each hit
    # is a represented by three numbers: doc_id, tf, and norm factor.
    term1 = items1[0]
    idf1 = float(items1[1])
    term2 = items2[0]
    idf2 = float(items2[1])
    docs1 = groupby_three(items1[2:])
    docs2 = groupby_three(items2[2:])

    # Verify terms match
    debug_info += (
        f"term1 = {term1}\n"
        f"term2 = {term2}\n"
    )
    assert term1 == term2, f"Term mismatch:\n{debug_info}"

    # Verify IDF values match
    debug_info += (
        f"idf1 = {idf1}\n"
        f"idf2 = {idf2}\n"
    )
    assert idf1 == pytest.approx(idf2, TOLERANCE), \
        f"IDF mismatch (tolerance={TOLERANCE}):\n{debug_info}"

    # Verify each hit matches.  One hit contains doc_id, tf and norm factor
    for hit1, hit2 in zip(docs1, docs2):
        assert_inverted_index_hit_eq(hit1, hit2, debug_info)


def assert_inverted_index_hit_eq(hit1, hit2, debug_info=""):
    """Raise assertion if hit1 != hit2.

    Prepend debug_info to any assertion error message.

    """
    doc_id1 = int(hit1[0])
    tf1 = float(hit1[1])
    norm1 = float(hit1[2])
    doc_id2 = int(hit2[0])
    tf2 = float(hit2[1])
    norm2 = float(hit2[2])

    # Compare doc ids
    debug_info += (
        "\n"
        f"doc_id1 = {doc_id1}\n"
        f"doc_id2 = {doc_id2}\n"
    )
    assert doc_id1 == doc_id2, f"doc_id mismatch:\n{debug_info}"

    # Compare term frequency
    debug_info += (
        f"tf1 = {tf1}\n"
        f"tf2 = {tf2}\n"
    )
    assert tf1 == tf2, f"tf mismatch:\n{debug_info}"

    # Compare normalization factors
    debug_info += (
        f"norm1 = {norm1}\n"
        f"norm2 = {norm2}\n"
    )
    assert norm1 == pytest.approx(norm2, TOLERANCE), (
        f"Normalization factor mismatch (tolerance={TOLERANCE})\n"
        f"{debug_info}"
    )


def assert_rest_api_hit_eq(hits1, hits2):
    """Raise assertion if REST API hits lists differ."""
    for hit1, hit2 in zip(hits1, hits2):
        assert "docid" in hit1
        assert "docid" in hit2
        assert "score" in hit1
        assert "score" in hit2
        assert hit1["docid"] == hit2["docid"], (
            "docid mismatch:\n"
            f"hit1 = {hit1}\n"
            f"hit2 = {hit2}\n"
        )
        assert hit1["score"] == pytest.approx(hit2["score"], TOLERANCE), (
            "score mismatch (TOLERANCE={TOLERANCE}):\n"
            f"hit1 = {hit1}\n"
            f"hit2 = {hit2}\n"
        )
    assert len(hits1) == len(hits2), (
        "Length mismatch:\n"
        f"len(hits1) = {len(hits1)}\n"
        f"len(hits2) = {len(hits2)}\n"
    )


def groupby_three(iterable):
    """Organize a list in groups of 3.

    Example:
    >>> list(groupby_three([1, 2, 3, 4, 5, 6]))
    [(1, 2, 3), (4, 5, 6)]

    """
    assert len(list(iterable)) % 3 == 0, "length must be a multiple of 3"
    return zip(*(iter(iterable),) * 3)
