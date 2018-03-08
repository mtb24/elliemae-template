var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// style paths
var sassFiles = 'assets/styles/scss/*.scss';
var cssDestination = 'assets/styles/css/';

// gulp.task('styles', function() {
//     gulp.src(sassFiles)
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest(cssDestination));
// });


// gulp.task('autoprefixer', function () {
//     var postcss      = require('gulp-postcss');
//     var sourcemaps   = require('gulp-sourcemaps');
//     var autoprefixer = require('autoprefixer');
    
//     return gulp.src('./assets/styles/css/*.css')
//     .pipe(sourcemaps.init())
//     .pipe(postcss([ autoprefixer() ]))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./assets/'));
// });

// "browser-sync start --server --files '**/*.css, **/*.html, **/*.js, !node_modules/**/*' --directory --port 7777 --browser 'FirefoxDeveloperEdition'"
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
// });

// gulp.task('watch', function() {
//     gulp.watch(sassFiles, ['styles', 'autoprefixer'])
// });

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: ".",
        port: 7777,
        browser: 'FirefoxDeveloperEdition'
    });

    gulp.watch("assets/styles/scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("assets/styles/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("assets/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);