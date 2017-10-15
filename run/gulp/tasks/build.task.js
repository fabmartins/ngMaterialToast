module.exports = function(gulp, plugins){
    const q = require('q'),
          runSequence = require('run-sequence').use(gulp);

    return function(){
        var deferred = q.defer();
        runSequence('build-clean', ['build-fonts', 'build-styles', 'build-dependencies', 'build-scripts', 'build-templates'], 'build-inject', deferred.resolve);

        return deferred.promise;
    };
};