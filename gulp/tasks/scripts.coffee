gulp       = require 'gulp'
uglify     = require 'gulp-uglify'
sourcemaps = require 'gulp-sourcemaps'
browserify = require 'browserify'
source     = require 'vinyl-source-stream'
buffer     = require 'vinyl-buffer'
gulpif     = require 'gulp-if'
{argv}     = require 'yargs'

debug = !argv.production

gulp.task 'scripts', ->
  browserify
    entries: ['./src/scripts/index.coffee']
    extensions: ['.coffee', '.js']
    debug: debug
  .transform 'coffeeify'
  .transform 'debowerify'
  .bundle()
  .on 'error', (err) ->
    console.log err.message
    this.emit 'end'
  .pipe source 'bundle.js'
  .pipe buffer()
  .pipe gulpif debug, sourcemaps.init(loadMaps: true)
  .pipe gulpif !debug, uglify()
  .pipe gulpif debug, sourcemaps.write('.')
  .pipe gulp.dest 'build/js'
