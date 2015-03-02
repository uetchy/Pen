gulp = require 'gulp'

gulp.task 'watch', ->
  gulp.watch 'src/markups/**/*', ['markups']
  gulp.watch 'src/scripts/**/*', ['scripts']
  gulp.watch 'src/styles/**/*', ['styles']
