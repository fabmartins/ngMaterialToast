module.exports = function(gulp, plugins){
    const del = require('del');

    return function(){
        del('./dist/modules');
        return gulp.src(['!./src/index.html', './src/**/*.html'])
            .pipe(plugins.htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest('./dist'));
    };
};