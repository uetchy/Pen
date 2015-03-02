gulp       = require 'gulp'
sass       = require 'gulp-sass'
sourcemaps = require 'gulp-sourcemaps'
decomposer = require 'decomposer'

gulp.task 'styles', ->
  gulp.src 'src/styles/**/*.sass'
    .pipe sourcemaps.init()
    .pipe decomposer()
    .pipe sass indentedSyntax: true
    .pipe sourcemaps.write('.')
    .pipe gulp.dest 'build/css'
