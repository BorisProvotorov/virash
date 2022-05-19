global.$ = {
  gulp: require('gulp'),
  gp: require('gulp-load-plugins')(),
  browserSync: require('browser-sync').create(),
  nunjucks: require('gulp-nunjucks'),
  del: require('del'),
  imageminJpegRecompress: require('imagemin-jpeg-recompress'),
  pngquant: require('imagemin-pngquant'),
  path: {
    config: require('./gulp/config'),
    jquery: './source/js/jquery.min.js',
    js: './source/js/assets/*.js',
  }
};

$.path.config.forEach(function (path) {
  require(path)();
});