# Gif Coiler

## About
A wrapper to coil streets into squares and animates them to create gifs from them

## How to run
1. Navigate to folder (in Terminal)
2. Serve folder locally (`python3 -m http.server`)
3. Open app in localhost
4. You will see one animation running

## Where to edit
1. Setup slimerjs, so it only takes the screenshot of '#viewWrapper'
2. Load data from server instead of json (line 95)
3. There are custom event listeners for when animation is complete or still going (at the top of the script) -> these might be handy to communicate with SlimerJS
4. Please note, that there is not much polish. It would be great to export a couple of gifs and see how it works.