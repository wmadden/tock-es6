# Tock ES6

This is a time tracker I'm building as a pet project, written in ES6.

## Setup

```bash
# Clone it
git clone git@github.com:wmadden/tock-es6.git

# Enter the directory
cd tock-es6

# Install dependencies
npm install
bower install
```

## Development

```bash
# To build the project (it will be available in ./out)
npm run build

# To watch the source and serve it on http://localhost:9000
npm run watch

# To list available commands
npm run
```

## Source

The JavaScript is written in [ES6](https://kangax.github.io/compat-table/es6/)
and [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html),
using [ES6 modules](http://www.2ality.com/2014/09/es6-modules-final.html).

The CSS is written using [Less](http://lesscss.org/).

## Directory structure

* `/`
  * `bin/` - Scripts for this project (mostly for convenience)
  * `lib/` - Third party libraries (deliberately separate from source)
    * `bower_components/`
  * `node_modules/`
  * `out/` - Compiled output will go here
  * `src/` - Application source lives here
    * `css/`
    * `js/`
    * `static/`

## The build system

* Task runner
  * All tasks are listed in [package.json](package.json)'s `scripts`
    hash. Invoke them using `npm run <task>`.
* Compiling JS
  * [Browserify](http://browserify.org/) is used to traverse the dependency,
    compile the source to browser-compatible ES5, and concatenate the output.
  * [Babel](https://babeljs.io/) is used to compile ES6/7 and JSX to ES5, and is
    invoked by Browserify through [babelify](https://github.com/babel/babelify).
* Compiling CSS
  * [Less](http://lesscss.org/)
* Search paths
  * `node_modules`, `lib`, and `src` are searched when resolving imports in JS
    and CSS (see [package.json](package.json)'s `config` hash)
* Source maps
  * `less` and `browserify` are both configured to output source maps, including
    the complete original source, in their compiled output. You shouldn't need
    any additional setup in your browser to use them.
* [Persistent authoring](https://developer.chrome.com/devtools/docs/workspaces) ("workspaces" in Chrome)
  * To enable, add the `src`, `node_modules` and `lib` directories to your
    workspace by right-clicking in the sources tab's navigation pane and
    choosing "Add Folder to Workspace"
  * Then, right-click on one of the source files and choose
    "Map to File System Resource...", and choose the appropriate original file.

## Scripts

* `bin/`
  * `exec` - A shortcut for executing locally installed Node modules' `bin` scripts
    * Before: `./node_modules/.bin/less`
    * After: `./bin/exec less`
  * `run` - A shortcut for `npm run` that lets you run multiple scripts more easily
    * Before: `npm run clean && npm run build-js && npm run build-css && npm run build-html`
    * After: `./bin run clean build-js build-css build-html`
    * Options:
      * `-s` - if the first argument is `-s` it will be passed as `npm run -s`
  * `run-parallel` - A wrapper for `bin/run` that runs tasks in parallel using [parallelshell](https://github.com/keithamus/parallelshell)
    * Before: `parallelshell 'npm run build-js' 'npm run build-css' 'npm run build-html'`
    * After: `./bin/run-parallel build-js build-css build-html`
    * Options:
      * `-s` - if the first argument is `-s` it will be passed as `npm run -s`
