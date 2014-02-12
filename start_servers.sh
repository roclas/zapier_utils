#!/usr/bin/env bash

./node_modules/forever/bin/forever app.js &
./node_modules/forever/bin/forever watchThisDir.js &
