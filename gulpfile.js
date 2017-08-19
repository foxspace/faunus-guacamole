/**
 * Created by sashka on 03.08.16.
 */
var gulp     = require('gulp'),
    sass     = require('gulp-sass'),
    plumber  = require('gulp-plumber'),
    bs       = require('browser-sync').create(),
    concat   = require('gulp-concat'),
    uglify   = require('gulp-uglifyjs'),
    cssnano  = require('gulp-cssnano'),
    rename   = require('gulp-rename'),
    del      = require('del'),
    imagemin = require('gulp-imagemin'),
    pngmin   = require('imagemin-pngquant'),
    cache    = require('gulp-cache'),
    autopref = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('app/style/**/*.scss')
        .pipe(plumber({
            errorHandler: function(e){
                console.log(e.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autopref(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css'))
        .pipe(bs.reload({stream: true}))
});

gulp.task('scripts', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
})

gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
})


gulp.task('bs', function() {
   bs.init({
       server: {
           baseDir: 'app'
       },
       notify: false,
       online: false
   });
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngmin()]
        })))
        .pipe(gulp.dest('dist/img'));
});


gulp.task('watch', ['bs', 'css-libs', 'scripts'], function() {
    gulp.watch('app/style/**/*.scss', ['sass']);
    gulp.watch('app/*.html', bs.reload);
    gulp.watch('app/js/**/*.js', bs.reload);
});


gulp.task('build', ['clean', 'sass', 'scripts', 'img'], function () {

    var buildCss = gulp.src([
        'app/css/style.css',
        'app/css/libs.min.css'
    ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});