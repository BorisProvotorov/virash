module.exports = function () {
	$.gulp.task('posthtml', function(){
		return $.gulp.src('source/*.html')
		//.pipe($.gp.posthtml([$.posthtml.include()))
		//.pipe($.gp.includePost())
		.pipe($.gulp.dest('build/'));
	});
};

