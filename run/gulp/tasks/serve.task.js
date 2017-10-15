module.exports = function(gulp, plugins){
    return function(){
        return gulp.src('./dist')
            .pipe(plugins.webserver({
                livereload: true
            }));
    };
};