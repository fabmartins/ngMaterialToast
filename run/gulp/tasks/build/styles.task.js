module.exports = function(gulp, plugins){
    const del = require('del');

    return function(){
        del('./dist/assets/css/app*.css');
        return gulp.src(['!./src/**/_*.scss', './src/**/*.scss'])
            .pipe(plugins.sass())
            .pipe(plugins.concat('app.css'))
            .pipe(plugins.cleanCss())
            .pipe(plugins.rev())
            .pipe(plugins.flatten())
            .pipe(gulp.dest('./dist/assets/css'));
    };
};