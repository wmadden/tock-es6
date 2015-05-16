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
    port: 9002,
    "ui": {
        "port": 9003,
    },
    "files": ['out'],
    "server": {
      baseDir: [ 'out' ]
    },
    "proxy": false,
    "open": false,
    "host": 'tock.dev'
};
