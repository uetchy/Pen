gulp = require 'gulp'
slim = require 'gulp-slim'

gulp.task 'markups', ->
  gulp.src 'src/markups/**/*.slim'
    .pipe slim()
    .pipe gulp.dest 'build'
