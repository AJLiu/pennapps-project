// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('public/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    });
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('public/scss/*.scss', ['sass']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
    gulp.watch("public/css/*.css").on('change', browserSync.reload);
    gulp.watch("public/js/*.js").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['sass', 'browserSync', 'watch']);
