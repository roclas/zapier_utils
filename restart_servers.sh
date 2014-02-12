#!/usr/bin/env bash

ps -ef | grep "$(ps -ef | grep node | grep forever | awk '{print $NF}')" |grep -v "forever" | grep -v ' vi '| awk '{print $2}' | xargs kill
