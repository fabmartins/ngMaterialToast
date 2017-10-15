module.exports = function(gulp, plugins){
    const del = require('del');
    
    return function(){
        del(['./dist/index.html', './dist/js/dependencies*.js']);
        return gulp.src('./src/index.html')
            .pipe(gulp.dest('./dist'))
            .on('end', function(){
                gulp.src('./dist/index.html')
                    .pipe(plugins.usemin({
                        js: [ plugins.rev() ]
                    }))
                    .pipe(gulp.dest('./dist'));
            });
    };
}