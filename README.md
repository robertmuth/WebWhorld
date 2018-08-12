# WebWhorld

[Live Demo](http://art.muth.org)

## Features

* GPL 3 Licensed 
* Implemented in [Dart](https://www.dartlang.org)
* Code at [https://github.com/robertmuth/WebWhorld]

![Screenshopt1](screenshot1.png)
![Screenshopt2](screenshot2.png)


Based on Chris Korda's [Whorld](http://whorld.org)

### How to build a release

The `build/` directory contains a working copy consisting of a `.html` and a `.js` file. 

To build your own:

* install the [dart sdk](https://webdev.dartlang.org/tools/sdk) 
* get required packages `make get`
* transpile the code `make release`
* serve the code `cd build ; python3 -m http.server 8877`
