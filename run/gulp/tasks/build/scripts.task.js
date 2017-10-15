module.exports = function(gulp, plugins){
    const del = require('del');

    return function(){
        del('./dist/js/app*.js');
        return gulp.src('./src/**/*.js')
            .pipe(plugins.concat('app.js'))
            .pipe(plugins.babel({ presets: ['env'] }))
            .pipe(plugins.uglify({ mangle: false }))
            .pipe(plugins.rev())
            .pipe(gulp.dest('./dist/js'));
    };
};