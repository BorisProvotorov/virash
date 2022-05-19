module.exports = function () {
  var gulpHtml = 'nunjucks';

  if(gulpHtml == 'posthtml') {
  	$.gulp.task('build', $.gulp.series('clean', 'copy', 'sass', 'scripts', 'svg','posthtml'));
  }		
 
 if(gulpHtml == 'nunjucks') {
 	$.gulp.task('build', $.gulp.series('clean', 'copy', 'sass', 'scripts', 'svg','nunjucks'));
 }		

};
