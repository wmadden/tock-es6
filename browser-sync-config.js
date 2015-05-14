/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    "ui": {
        "port": 9001,
    },
    "files": ['out', 'bower_components/**/*'],
    "server": {
      baseDir: [ 'out' ],
      routes: {
        "/bower_components": "bower_components",
        "/js/bower_components": "bower_components",
        "/js/node_modules": "node_modules"
      }
    },
    "proxy": false,
    port: 9000,
    "open": false,
    "reloadDebounce": 1000,
    "host": 'tock.dev'
};
