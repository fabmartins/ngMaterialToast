module.exports = function(gulp){
    return function(){
        gulp.watch('./src/resources/fonts/*.ttf', ['build-fonts']);
        gulp.watch('./src/resources/sass/*.scss', ['build-styles', 'build-inject']);
        gulp.watch('./src/index.html', ['build-dependencies', 'build-inject']);
        gulp.watch('./src/**/*.js', ['build-scripts', 'build-inject']);
        gulp.watch('./src/components/**/*.html', ['build-templates']);
        gulp.start('serve');
    }
};