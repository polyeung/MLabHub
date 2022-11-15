#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Compiled with -DMINIASLR.

void vulnerable(char *arg)
{
	char buf[1024];
	strcpy(buf, arg);
}

int _main(int argc, char *argv[])
{
	if (argc != 2) {
		fprintf(stderr, "Error: Need a command-line argument\n");
		exit(1);
	}

	vulnerable(argv[1]);

	return 0;
}
