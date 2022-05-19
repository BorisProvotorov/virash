const sass = require('gulp-sass')(require('sass'));

module.exports = function () {
  $.gulp.task('sass', function () {
    return $.gulp.src('source/sass/style.scss')
      .pipe($.gp.plumber())
      .pipe($.gp.sourcemaps.init())
      .pipe(sass())
      .pipe($.gp.autoprefixer({
        browsers: ['last 2 versions']
      }))
    .pipe($.gulp.dest('build/css'))
      .pipe($.gp.csso())
      .pipe($.gp.rename('style.min.css'))
      .pipe($.gp.sourcemaps.write(''))
      .pipe($.gulp.dest('build/css'))
      .pipe($.browserSync.stream());
  });
};
