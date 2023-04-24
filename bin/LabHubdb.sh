#!/bin/bash

set -Eeuo pipefail
# Sanity check command line options
usage() {
  echo "Usage: $0 (create|destroy|reset|dump|random)"
}
if [ $# -ne 1 ]; then
  usage
  exit 1
fi
# Parse argument.  $1 is the first argument
case $1 in
  "create")
    mkdir -p var/uploads
    sqlite3 var/LabHub.sqlite3 < sql/schema.sql
    sqlite3 var/LabHub.sqlite3 < sql/data.sql
    ;;

  "destroy")
    rm -rf var/LabHub.sqlite3 var/uploads
    ;;
  "reset")
    rm -rf var/LabHub.sqlite3 var/uploads
    mkdir -p var/uploads
    sqlite3 var/LabHub.sqlite3 < sql/schema.sql
    sqlite3 var/LabHub.sqlite3 < sql/data.sql
    ;;
  "dump")
    sqlite3 -batch -line var/LabHub.sqlite3 'SELECT * FROM labs'
    ;;
  "random")
    SHUF=shuf
    # If shuf is not on this machine, try to use gshuf instead
    if ! type shuf 2> /dev/null; then
      SHUF=gshuf
    fi
    DB_FILENAME=var/LabHub.sqlite3
    FILENAMES="122a7d27ca1d7420a1072f695d9290fad4501a41.jpg
              ad7790405c539894d25ab8dcf0b79eed3341e109.jpg
              9887e06812ef434d291e4936417d125cd594b38a.jpg
              2ec7cf8ae158b3b1f40065abfb33e81143707842.jpg"
    for i in `seq 1 100`; do
      FILENAME=`echo "$FILENAMES" | ${SHUF} -n1 | awk '{$1=$1;print}'`
      OWNER="awdeorio"
      sqlite3 -echo -batch ${DB_FILENAME} "INSERT INTO posts(filename, owner) VALUES('${FILENAME}','${OWNER}');"
    done
    ;;
  *)
    usage
    exit 1
    ;;
esac