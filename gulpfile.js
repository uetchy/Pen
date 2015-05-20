var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function() {
  gulp.src('app/stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('app/assets/css'));
});

gulp.task('watch', function() {
  gulp.watch('app/stylus/*.styl', ['stylus']);
});
// "electron-prebuilt": "^0.25.3",
