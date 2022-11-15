#!/bin/bash

########################################################################

# This script helps check that your solutions match the spec,
# but it is not the autograder, and it is not authoritative!
#
# The spec (and autograder) has a few requirements beyond
# what this script verifies. It's your responsibility to test carefully.

########################################################################

if [ "$EUID" -eq 0 ]
then echo "this script won't work correctly if you run it with sudo"
	 exit
fi

set -e

if [ ! -f "cookie" ]; then
    ./build.sh clean
    ./build.sh
fi

COOKIE=$(head -1 cookie)

# Safety commit
git add sol[0-8].py cookie
git commit --allow-empty -m "Automatic commit by test script for $COOKIE"
git push

echo
echo "Testing solutions ..."
echo

OUTPUT=$(2>&1 python3 sol0.py | ./target0 || true)
if [[ "$OUTPUT" == "Hi "*"! Your grade is A+." ]]; then
    echo "target0: success"
else
    echo "target0: error"
fi

OUTPUT=$(2>&1 python3 sol1.py | ./target1 || true)
if [ "$OUTPUT" = "Your grade is perfect." ]; then
    echo "target1: success"
else
    echo "target1: error"
fi

OUTPUT=$(2>&1 echo "whoami" | ./target2 "$(python3 sol2.py)" || true)
if [ "$OUTPUT" = "root" ]; then
    echo "target2: success"
else
    echo "target2: error"
fi

OUTPUT=$(2>&1 echo "whoami" | ./target3 "$(python3 sol3.py)" || true)
if [ "$OUTPUT" = "root" ]; then
    echo "target3: success"
else
    echo "target3: error"
fi

OUTPUT=$(2>&1 echo "whoami" | ./target4 <(python3 sol4.py) || true)
if [ "$OUTPUT" = "root" ]; then
    echo "target4: success"
else
    echo "target4: error"
fi

OUTPUT=$(2>&1 echo "whoami" | ./target5 "$(python3 sol5.py)" || true)
if [ "$OUTPUT" = "root" ]; then
    echo "target5: success"
else
    echo "target5: error"
fi

OUTPUT=$(2>&1 echo "whoami" | ./target6 "$(python3 sol6.py)" || true)
if [ "$OUTPUT" = "root" ]; then
    echo "target6: success"
else
    echo "target6: error"
fi

OUTPUT=$(2>&1 echo "whoami" | ./target7 "$(python3 sol7.py)" || true)
if [ "$OUTPUT" = "root" ]; then
    echo "target7: success"
else
    echo "target7: error"
fi

set +e

./target8 <(python3 sol8.py) > /dev/null 2>&1
if [ $? -eq 2 ]; then
    echo "target8: success"
else
    echo "target8: error"
fi
