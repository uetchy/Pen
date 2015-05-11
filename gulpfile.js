var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp.src('app/styles/*.sass')
    .pipe(sass({
      indentedSyntax: true
    }))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function() {
  gulp.watch('src/markups/**/*', ['markups']);
  gulp.watch('src/styles/**/*', ['styles']);
});
