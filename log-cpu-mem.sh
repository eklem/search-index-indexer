#!/bin/bash
while true; do ps -h -p $(pgrep -d ',' node) -o %cpu,%mem >> log.txt; sleep 10; done
