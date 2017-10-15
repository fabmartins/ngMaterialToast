module.exports = function(gulp, plugins){
    return function(){
        return gulp.src('./dist/index.html')
            .pipe(plugins.inject(gulp.src(['./dist/assets/css/*.css', '!./dist/js/dependencies*.js', './dist/js/*.js'], { read: false }), { relative: true }))
            .pipe(gulp.dest('./dist'));
    };
};