"""Public Inverted Index MapReduce pipeline tests."""

from pathlib import Path
import shutil
import madoop
import utils
from utils import TESTDATA_DIR


def test_doc_count_one_mapper(tmpdir):
    """Doc count MapReduce job with one input, resulting in one map task.

    Note: 'tmpdir' is a fixture provided by the pytest package.  It creates a
    unique temporary directory before the test runs, and removes it afterward.
    https://docs.pytest.org/en/6.2.x/tmpdir.html#the-tmpdir-fixture
    """
    shutil.copy("inverted_index/map0.py", tmpdir)
    shutil.copy("inverted_index/reduce0.py", tmpdir)

    # Run MapReduce job
    with tmpdir.as_cwd():
        madoop.mapreduce(
            input_dir=TESTDATA_DIR/"test_doc_count_one_mapper/input",
            output_dir=tmpdir/"output",
            map_exe="./map0.py",
            reduce_exe="./reduce0.py",
        )

    # Verify doc count
    doc_count_path = tmpdir/"output/part-00000"
    doc_count_str = Path(doc_count_path).read_text(encoding='utf-8')
    doc_count = int(doc_count_str)
    assert doc_count == 3


def test_num_phases():
    """There should be more than one MapReduce program in the pipeline."""
    mapper_exes, reducer_exes = utils.Pipeline.get_exes(
        "inverted_index/"
    )
    num_mappers = len(mapper_exes)
    num_reducers = len(reducer_exes)
    assert num_mappers > 1, "Must use more than 1 map phase"
    assert num_reducers > 1, "Must use more than 1 reduce phase"


def test_simple(tmpdir):
    """Simple input with no stopwords, no uppercase and no alphanumerics.

    A basic document with no stopwords, upppercase letters, numbers,
    non-alphanumeric characters, or repeated words.

    Note: 'tmpdir' is a fixture provided by the pytest package.  It creates a
    unique temporary directory before the test runs, and removes it afterward.
    https://docs.pytest.org/en/6.2.x/tmpdir.html#the-tmpdir-fixture
    """
    utils.copyglob("inverted_index/map?.py", tmpdir)
    utils.copyglob("inverted_index/reduce?.py", tmpdir)
    utils.copyglob("inverted_index/stopwords.txt", tmpdir)

    # Set total document count to be 2
    doc_count_filename = tmpdir/"total_document_count.txt"
    Path(doc_count_filename).write_text("2", encoding='utf-8')

    # Start pipeline mapreduce job, with 1 mapper and 1 reducer
    with tmpdir.as_cwd():
        pipeline = utils.Pipeline(
            input_dir=TESTDATA_DIR/"test_pipeline03/input",
            output_dir=tmpdir/"output",
        )

        # Concatenate output files to output.txt
        output_filename = pipeline.get_output_concat()

    # Verify output
    utils.assert_inverted_index_eq(
        output_filename,
        TESTDATA_DIR/"test_pipeline03/expected.txt",
    )


def test_example(tmpdir):
    """Same as the input as the one given in example_input.

    This test tests the example_input given to the students
    and compares it with example_output.

    Note: 'tmpdir' is a fixture provided by the pytest package. It creates a
    unique temporary directory before the test runs, and removes it afterward.
    https://docs.pytest.org/en/6.2.x/tmpdir.html#the-tmpdir-fixture
    """
    utils.copyglob("inverted_index/map?.py", tmpdir)
    utils.copyglob("inverted_index/reduce?.py", tmpdir)
    utils.copyglob("inverted_index/stopwords.txt", tmpdir)

    # Set total document count to be 3
    doc_count_filename = tmpdir/"total_document_count.txt"
    Path(doc_count_filename).write_text("3", encoding='utf-8')

    # Run pipeline mapreduce job
    with tmpdir.as_cwd():
        pipeline = utils.Pipeline(
            input_dir=TESTDATA_DIR/"test_pipeline16/input",
            output_dir=tmpdir/"output",
        )
        output_dir = pipeline.get_output_dir()

    # Verify output
    utils.assert_inverted_index_eq(
        output_dir,
        TESTDATA_DIR/"test_pipeline16/expected",
    )


def test_uppercase(tmpdir):
    """Input with uppercase characters.

    This test checks if students handle upper case characters correctly,
    they should essentially be replaced with lower case characters.  There
    are no stopwords, numbers or non-alphanumeric characters present in
    this test.

    Note: 'tmpdir' is a fixture provided by the pytest package.  It creates a
    unique temporary directory before the test runs, and removes it afterward.
    https://docs.pytest.org/en/6.2.x/tmpdir.html#the-tmpdir-fixture
    """
    utils.copyglob("inverted_index/map?.py", tmpdir)
    utils.copyglob("inverted_index/reduce?.py", tmpdir)
    utils.copyglob("inverted_index/stopwords.txt", tmpdir)

    # Set total document count to be 2
    doc_count_filename = tmpdir/"total_document_count.txt"
    Path(doc_count_filename).write_text("2", encoding='utf-8')

    # Run pipeline mapreduce job with 1 mapper and 1 reducer
    with tmpdir.as_cwd():
        pipeline = utils.Pipeline(
            input_dir=TESTDATA_DIR/"test_pipeline04/input",
            output_dir=tmpdir/"output",
        )
        output_filename = pipeline.get_output_concat()

    # Verify output
    utils.assert_inverted_index_eq(
        output_filename,
        TESTDATA_DIR/"test_pipeline04/expected.txt",
    )

    # Run same job with 3 mappers and 3 reducers
    with tmpdir.as_cwd():
        pipeline = utils.Pipeline(
            input_dir=TESTDATA_DIR/"test_pipeline04/input_multi",
            output_dir=tmpdir/"output_multi",
        )
        output_filename = pipeline.get_output_concat()

    # Verify output
    utils.assert_inverted_index_eq(
        output_filename,
        TESTDATA_DIR/"test_pipeline04/expected.txt",
    )


def test_uppercase_and_numbers(tmpdir):
    """Input with uppercase characters and numbers.

    This test checks that students are handling numbers correctly, which means
    leaving them inside the word they are a part of. This test also contains
    upper case characters. There are no stopwords or non-alphanumeric
    characters present in this test.

    Note: 'tmpdir' is a fixture provided by the pytest package.  It creates a
    unique temporary directory before the test runs, and removes it afterward.
    https://docs.pytest.org/en/6.2.x/tmpdir.html#the-tmpdir-fixture
    """
    utils.copyglob("inverted_index/map?.py", tmpdir)
    utils.copyglob("inverted_index/reduce?.py", tmpdir)
    utils.copyglob("inverted_index/stopwords.txt", tmpdir)

    # Set total document count to be 2
    doc_count_filename = tmpdir/"total_document_count.txt"
    Path(doc_count_filename).write_text("2", encoding='utf-8')

    # Run pipeline mapreduce job with 1 mapper and 1 reducer
    with tmpdir.as_cwd():
        pipeline = utils.Pipeline(
            input_dir=TESTDATA_DIR/"test_pipeline05/input",
            output_dir=tmpdir/"output",
        )
        output_filename = pipeline.get_output_concat()

    # Verify output
    utils.assert_inverted_index_eq(
        output_filename,
        TESTDATA_DIR/"test_pipeline05/expected.txt",
    )

    # Rerun with multiple mappers and reducers
    with tmpdir.as_cwd():
        pipeline = utils.Pipeline(
            input_dir=TESTDATA_DIR/"test_pipeline05/input_multi",
            output_dir=tmpdir/"output_multi",
        )
        output_filename = pipeline.get_output_concat()

    # Verify output
    utils.assert_inverted_index_eq(
        output_filename,
        TESTDATA_DIR/"test_pipeline05/expected.txt",
    )


def test_non_alphanumeric(tmpdir):
    """Input with non-alphanumeric characters.

    This test checks that students are handling non-alphanumeric characters
    properly, i.e., removing them from the word. If a token contains only
    non-alphanumeric characters then it is omitted from the inverted
    index. There are uppercase characters and numbers in this test. There are
    no stopwords.

    Note: 'tmpdir' is a fixture provided by the pytest package.  It creates a
    unique temporary directory before the test runs, and removes it afterward.
    https://docs.pytest.org/en/6.2.x/tmpdir.html#the-tmpdir-fixture
    """
    utils.copyglob("inverted_index/map?.py", tmpdir)
    utils.copyglob("inverted_index/reduce?.py", tmpdir)
    utils.copyglob("inverted_index/stopwords.txt", tmpdir)

    # Set total document count to be 2
    doc_count_filename = tmpdir/"total_document_count.txt"
    Path(doc_count_filename).write_text("2", encoding='utf-8')

    # Run pipeline mapreduce job with 1 mapper and 1 reducer
    with tmpdir.as_cwd():
        pipeline = utils.Pipeline(
            input_dir=TESTDATA_DIR/"test_pipeline06/input",
            output_dir=tmpdir/"output",
        )
        output_filename = pipeline.get_output_concat()

    # Verify output
    utils.assert_inverted_index_eq(
        output_filename,
        TESTDATA_DIR/"test_pipeline06/expected.txt",
    )

    # Rerun with multiple mappers and reducers
    with tmpdir.as_cwd():
        pipeline = utils.Pipeline(
            input_dir=TESTDATA_DIR/"test_pipeline06/input_multi",
            output_dir=tmpdir/"output_multi",
        )
        output_filename = pipeline.get_output_concat()

    # Verify output
    utils.assert_inverted_index_eq(
        output_filename,
        TESTDATA_DIR/"test_pipeline06/expected.txt",
    )


def test_many_docs(tmpdir):
    """Term appears in  multiple documents.

    This test checks that students are properly handling the case of a term
    appearing in multiple documents. The inverted index entry should contain a
    chain of document ids.

    Note: 'tmpdir' is a fixture provided by the pytest package.  It creates a
    unique temporary directory before the test runs, and removes it afterward.
    https://docs.pytest.org/en/6.2.x/tmpdir.html#the-tmpdir-fixture
    """
    utils.copyglob("inverted_index/map?.py", tmpdir)
    utils.copyglob("inverted_index/reduce?.py", tmpdir)
    utils.copyglob("inverted_index/stopwords.txt", tmpdir)

    # Set total document count to be 3
    doc_count_filename = tmpdir/"total_document_count.txt"
    Path(doc_count_filename).write_text("3", encoding='utf-8')

    # Run pipeline mapreduce job
    with tmpdir.as_cwd():
        pipeline = utils.Pipeline(
            input_dir=TESTDATA_DIR/"test_pipeline10/input_multi",
            output_dir=tmpdir/"output_multi",
        )
        output_dir = pipeline.get_output_dir()

    # There should be two output inverted index as docids 25 and 31 will go in
    # one inverted index and docid 30 will go in another.
    utils.assert_inverted_index_eq(
        output_dir,
        TESTDATA_DIR/"test_pipeline10/expected",
    )


def test_segments(tmpdir):
    """Output is segmented by document.

    This test checks that students are properly distributing documents across
    the output inverted indexes.

    Note: 'tmpdir' is a fixture provided by the pytest package.  It creates a
    unique temporary directory before the test runs, and removes it afterward.
    https://docs.pytest.org/en/6.2.x/tmpdir.html#the-tmpdir-fixture
    """
    utils.copyglob("inverted_index/map?.py", tmpdir)
    utils.copyglob("inverted_index/reduce?.py", tmpdir)
    utils.copyglob("inverted_index/stopwords.txt", tmpdir)

    # Set total document count to be 10
    doc_count_filename = tmpdir/"total_document_count.txt"
    Path(doc_count_filename).write_text("10", encoding='utf-8')

    # Run pipeline mapreduce job
    with tmpdir.as_cwd():
        pipeline = utils.Pipeline(
            input_dir=TESTDATA_DIR/"test_pipeline14/input_multi",
            output_dir=tmpdir/"output",
        )
        output_dir = pipeline.get_output_dir()

    # Verify output
    utils.assert_inverted_index_eq(
        output_dir,
        TESTDATA_DIR/"test_pipeline14/expected",
    )


def test_sample_inverted_index(tmp_path):
    """Checks a few lines of the large inverted index.

    This test checks the student's large inverted index
    made using inverted-index/input/input.csv
    with a few lines from the instructor solution.

    Note: 'tmp_path' is a fixture provided by the pytest package.  It creates a
    unique temporary directory before the test runs, and removes it afterward.
    https://docs.pytest.org/en/6.2.x/tmpdir.html

    """
    # Terms we're checking
    # $ cat tests/testdata/test_pipeline15/part-* | cut -d' ' -f1 | sort | uniq
    terms = [
        "foregroundnetwork",
        "glendambo",
        "itselfbetteshanger",
        "lindros",
        "medicinefradd",
        "mindesert",
        "regresar",
        "smelting",
    ]

    # Verify inverted index file are copied to
    # ./index_server/index/inverted_index
    inverted_index_dir = Path("index_server/index/inverted_index")
    assert inverted_index_dir.is_dir()
    inverted_index_paths = inverted_index_dir.glob("inverted_index_*.txt")
    inverted_index_paths = sorted(inverted_index_paths)
    assert inverted_index_paths,\
        f"No inverted_index_*.txt files in {inverted_index_dir}"
    assert len(inverted_index_paths) == 3

    # Filter student inverted index files, keeping only the subset of terms
    # that we're checking
    for inpath in inverted_index_paths:
        outpath = tmp_path/inpath.name
        filter_inverted_index(inpath, outpath, terms)

    # Compare filtered student inverted index files in tmp directory to
    # instructor solution inverted index
    utils.assert_inverted_index_eq(tmp_path, TESTDATA_DIR/"test_pipeline15")


def filter_inverted_index(inpath, outpath, terms):
    """Filter inpath, writing lines in terms list to outpath."""
    with inpath.open() as infile, outpath.open("w") as outfile:
        for line in infile:
            term = line.partition(" ")[0]
            if term in terms:
                outfile.write(line)
