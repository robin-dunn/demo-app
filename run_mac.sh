#!/bin/bash
open -a Terminal
osascript -e "tell application \"Terminal\"" -e "tell application \"System Events\" to keystroke \"t\" using {command down}" -e "do script \"cd $PWD/api; node ./index.js\" in front window" -e "end tell" > /dev/null
osascript -e "tell application \"Terminal\"" -e "tell application \"System Events\" to keystroke \"t\" using {command down}" -e "do script \"cd $PWD/ui; npm start\" in front window" -e "end tell" > /dev/null