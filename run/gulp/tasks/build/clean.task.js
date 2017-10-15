module.exports = function(){
    const del = require('del');

    return function(){
        return del(['./dist']);
    };
};