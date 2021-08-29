#!/bin/bash

# Wait for Connect to be ready before exiting
echo "Connecting to Sauce."
while [ ! -f $BROWSER_PROVIDER_READY_FILE ]; do
  echo -n "."
  sleep .5
done
echo "Connected"
