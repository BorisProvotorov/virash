module.exports = function () {
	$.gulp.task('nunjucks', function(){
		return $.gulp.src('source/*.html')
	    .pipe($.gp.nunjucks.compile())
	    .pipe($.gulp.dest('build/'))
	    .pipe($.browserSync.reload({stream: true}));
	});
};

