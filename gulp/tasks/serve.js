var gulpHtml = 'nunjucks';

module.exports = function () {
  $.gulp.task('serve', function () {
      $.browserSync.init({
        server: {
      		baseDir: 'build/'
    	},
    	notify: false
      });

    $.browserSync.watch('source/sass/**/*.scss').on('change', $.browserSync.reload);
    
    $.gulp.watch('source/sass/**/*.scss', $.gulp.series('sass'));

    if(gulpHtml == 'posthtml') {
     $.gulp.watch('source/blocks/*.html', $.gulp.series('posthtml'));
     $.gulp.watch('source/*.html', $.gulp.series('posthtml'));
    } 


    if(gulpHtml == 'nunjucks') {
     $.gulp.watch('source/blocks/*.html', $.gulp.series('nunjucks'));
     $.gulp.watch('source/*.html', $.gulp.series('nunjucks'));
    } 
    
    
    $.gulp.watch('source/js/**/*.js', $.gulp.series('scripts'));
    $.gulp.watch('source/img/**/*.{png, jpg, svg}', $.gulp.series('allimg'));
    $.gulp.watch('source/blocks/*.html', $.browserSync.reload);
    $.gulp.watch('build/*.html', $.browserSync.reload);
  });
};
