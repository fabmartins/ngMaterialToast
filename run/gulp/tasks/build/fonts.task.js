module.exports = function(gulp, plugins){
    const del = require('del');

    return function(){
        del(['./dist/assets/fonts/*.ttf']);
        return gulp.src('./src/**/resources/fonts/*.ttf')
            .pipe(plugins.flatten())
            .pipe(gulp.dest('./dist/assets/fonts'));
    };
};