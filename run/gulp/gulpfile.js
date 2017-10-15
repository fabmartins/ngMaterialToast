const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

process.chdir('../../');


gulp.task('build-clean', require('./tasks/build/clean.task')());
gulp.task('build-fonts', require('./tasks/build/fonts.task')(gulp, plugins));
gulp.task('build-templates', require('./tasks/build/templates.task')(gulp, plugins));
gulp.task('build-dependencies', require('./tasks/build/dependencies.task')(gulp, plugins));
gulp.task('build-styles', require('./tasks/build/styles.task')(gulp, plugins));
gulp.task('build-scripts', require('./tasks/build/scripts.task')(gulp, plugins));
gulp.task('build-inject', require('./tasks/build/inject.task')(gulp, plugins));

gulp.task('build', require('./tasks/build.task')(gulp, plugins));
gulp.task('serve', require('./tasks/serve.task')(gulp, plugins));
gulp.task('default', require('./tasks/default.task')(gulp));