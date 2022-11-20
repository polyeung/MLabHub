"""Test harness for running a pipeline of map reduce programs."""
import re
import pathlib
import shutil
import heapq
import contextlib
import madoop


class Pipeline:
    """Execute a pipeline of MapReduce jobs.

    Rotate working directories between jobs: job0, job1, etc.

    Optionally execute in a temporary directory.
    """

    def __init__(self, input_dir, output_dir):
        # pylint: disable=too-many-arguments
        """Create and execute MapReduce pipeline."""
        self.job_index = 0
        self.output_dir = pathlib.Path(output_dir)

        # Get map and reduce executables
        self.mapper_exes, self.reducer_exes = self.get_exes()
        assert len(self.mapper_exes) == len(self.reducer_exes)

        # Clean up.  Remove output directory and any job-* directories.
        if self.get_job_output_dir().exists():
            shutil.rmtree(self.get_job_output_dir())
        for jobdir in self.output_dir.parent.glob("job-*"):
            shutil.rmtree(jobdir)

        # Create first job dir and copy input
        self.create_jobdir()
        for filename in input_dir.glob("*"):
            shutil.copy(filename, self.get_job_input_dir())

        # Run pipeline
        self.run()

    def run(self):
        """Execute each job, in order."""
        while True:
            madoop.mapreduce(
                input_dir=self.get_job_input_dir(),
                output_dir=self.get_job_output_dir(),
                map_exe=self.get_job_mapper_exe().resolve(),
                reduce_exe=self.get_job_reducer_exe().resolve(),
            )

            # Create job dir for next job, unless we're at the end
            if self.job_index < self.get_job_total() - 1:
                self.next_job()
            else:
                self.last_job()
                break

    @staticmethod
    def get_exes(mapreduce_dir=pathlib.Path()):
        """Return two lists: mapper exes and reducer exes.

        Valid filenames are map1.py ... map9.py and reduce1.py ... reduce9.py.
        Note that map0.py and reduce0.py are the document count MapReduce
        program, which are tested separately.

        """
        mapreduce_dir = pathlib.Path(mapreduce_dir)
        mapper_exes = []
        reducer_exes = []
        for filename in mapreduce_dir.glob("*"):
            if re.match(r".*map[1-9]\.py$", str(filename)) is not None:
                mapper_exes.append(filename)
            elif re.match(r".*reduce[1-9]\.py$", str(filename)) is not None:
                reducer_exes.append(filename)
        assert mapper_exes
        assert reducer_exes
        assert len(mapper_exes) == len(reducer_exes)
        return sorted(mapper_exes), sorted(reducer_exes)

    def get_job_total(self):
        """Return total number of jobs."""
        assert self.mapper_exes
        assert self.reducer_exes
        assert len(self.mapper_exes) == len(self.reducer_exes)
        return len(self.mapper_exes)

    def get_job_mapper_exe(self):
        """Return the mapper executable for the current job."""
        return self.mapper_exes[self.job_index]

    def get_job_reducer_exe(self):
        """Return the reducer executable for the current job."""
        return self.reducer_exes[self.job_index]

    def create_jobdir(self):
        """Initialize directory structure."""
        assert not self.get_jobdir().exists()
        self.get_jobdir().mkdir(parents=True)
        self.get_job_input_dir().mkdir(parents=True)

    def get_jobdir(self):
        """Return a job directory name, e.g., job0, job1, etc.

        The job directory is a sibling of the output directory.
        """
        assert self.job_index < 10
        return self.output_dir.parent/f"job-{self.job_index}"

    def get_job_input_dir(self):
        """Return the path to current input directory."""
        return self.get_jobdir()/"input"

    def get_job_output_dir(self):
        """Return the path to current output directory."""
        return self.get_jobdir()/"output"

    def get_job_output_filenames(self):
        """Return a list of output filenames."""
        return self.get_job_output_dir().glob("part-*")

    def next_job(self):
        """Advance to the next job and copy output to input."""
        # Save previous output directory
        prev_output_dir = self.get_job_output_dir()

        # Move to the next job and create the directories
        self.job_index += 1
        assert not self.get_jobdir().exists()
        self.create_jobdir()

        # Copy output files from previous job to input of current job
        for filename in prev_output_dir.glob("part-*"):
            shutil.copy(filename, self.get_job_input_dir())

    def get_output(self):
        """Return a list of output filenames."""
        return [f.resolve() for f in self.get_job_output_filenames()]

    def get_output_dir(self):
        """Return output directory."""
        return self.get_job_output_dir().resolve()

    def get_output_concat(self):
        """Concatenated output/part-* output files and return filename."""
        basename = self.get_job_output_dir().name + ".txt"
        concat_filename = self.get_jobdir()/basename

        # Merge output because segments are sorted
        with contextlib.ExitStack() as stack, \
             concat_filename.open("w") as outfile:
            infiles = [
                stack.enter_context(filename.open())
                for filename in self.get_job_output_filenames()
            ]

            for line in heapq.merge(*infiles):
                outfile.write(line)

        return concat_filename.resolve()

    def last_job(self):
        """Copy the current jobdir output to final output directory."""
        self.output_dir.mkdir(parents=True)
        for filename in self.get_job_output_filenames():
            shutil.copy(filename, self.output_dir)
