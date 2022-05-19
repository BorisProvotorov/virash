module.exports = function () {
  $.gulp.task('clean', function () {
    console.log($.del);
    return $.del('build');
  });
};
