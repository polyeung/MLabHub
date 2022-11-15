#!/bin/bash

function cleanup {
	rm -f target[0-8] cookie input8.dat
}

cleanup
if [ "$1" = "clean" ]; then
	exit 0
fi

python3 ./build_helper.py
if [ $? -ne 0 ]; then
	echo "Encountered an error building targets."
	cleanup
	exit 1
fi

# Target 8 is special–no source to build!
curl -s "https://project4.eecs388.org/target8?cookie=$(sed -n '2p' cookie | tr -d '\n')&author=$(sed -n '1p' cookie | sed 's/ /%20and%20/g')" | tar mzx
if [ ! -f "target8" ]; then
	echo "Encountered an error while retrieving target8."
	cleanup
	exit 1
fi

sudo chmod 555 target[0-8]
sudo chown root:$SUDO_USER target[2-7]
sudo chmod 6777 target[2-7]
for t in target[2-7]; do
    if [ `stat -c '%a' $t` -ne 6777 ]; then
        echo "Setuid permission could not be set. Make sure your files are in a native Linux folder and not a VirtualBox shared folder."
        cleanup
        exit 1
    fi
done

echo "Setup complete."
