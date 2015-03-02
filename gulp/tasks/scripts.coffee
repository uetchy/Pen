gulp       = require 'gulp'
coffee     = require 'gulp-coffee'
sourcemaps = require 'gulp-sourcemaps'

gulp.task 'scripts', ->
  gulp.src 'src/scripts/**/*.coffee'
    .pipe sourcemaps.init()
    .pipe coffee bare: true
    .pipe sourcemaps.write('.')
    .pipe gulp.dest 'build/js'
