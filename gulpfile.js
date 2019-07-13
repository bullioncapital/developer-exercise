var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var paths = {
    data: ['*.csv']
};

gulp.task('copy-static', function () {
    return gulp.src(paths.data)
        .pipe(gulp.dest('dist'));
});


gulp.task('default',gulp.series(gulp.parallel('copy-static'), function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
}));
