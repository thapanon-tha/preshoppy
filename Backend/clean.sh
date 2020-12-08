#!/bin/sh

# remove all data from data directory but keep directory structure
sudo find data -mindepth 2 -type f ! -iname '.git*' -exec rm -f {} ';' && sudo find data/db -mindepth 1 -type d -exec rm -d {} ';'
