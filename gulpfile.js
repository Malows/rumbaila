var gulp = require('gulp');

var concat = require('gulp-concat');

//var uncss = require('gulp-uncss');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var cleanCss = require('gulp-clean-css');

var uglify = require('gulp-uglify');
var minify = require('gulp-minify');

var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');

var rev = require('gulp-rev');
var del = require('del');


gulp.task('watch', function() {
 gulp.watch('js/*.js', ['pack-js']);
 gulp.watch('scss/*.scss', ['sass']);
 gulp.watch('css/*.css', ['pack-css']);
 gulp.watch('*.html', ['pack-html']);
});

//        //   /////
//        //  //   //
//        //   ///
//        //      ///
//  //   //   //   //
//   ////      ////
gulp.task('clean-js', function () {
	return del([
		'build/js/*.js'
	]);
});

gulp.task('pack-js', ['clean-js'], function () {
    return gulp.src([ 'lib/jquery/dist/jquery.js' ,'lib/bootstrap/dist/js/bootstrap.js', 'js/*.js' ])
        .pipe(concat('bundle.js'))
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(uglify())
        //.pipe(rev())
        //.pipe(gulp.dest(''))
        //.pipe(rev.manifest('build/rev-manifest.json', {
        //    merge: true
        //}))
        .pipe(gulp.dest('build/js'));
    });

    //   ////      /////     ////
    //  //  //    //   //  //   //
    //  //         ///      ///
    //  //           ///       ///
    //  //  //    //   //   //   //
    //   ////      ////       ////

    gulp.task('clean-css', function () {
    	return del([
    		'build/css/*.css'
    	]);
    });

    gulp.task('sass', function(){
      return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
    });

gulp.task('pack-css', ['clean-css'], function () {
    return gulp.src(['lib/bootstrap/dist/css/bootstrap.css', 'lib/font-awesome/css/font-awesome.css' ,'css/grayscale.css'])
        .pipe(concat('stylesheet.css'))
        .pipe(nano())
        .pipe(cleanCss())
        //.pipe(rev())
        .pipe(gulp.dest('build/css'))
        /*.pipe(rev.manifest('build/rev-manifest.json', {
            merge: true
        }))
        .pipe(gulp.dest(''));*/
});


// //    //  //////////  //\\  ////  //
// //    //      //      // \\// //  //
// ////////      //      //  \/  //  //
// //    //      //      //      //  //
// //    //      //      //      //  //////
gulp.task('pack-html', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      collapseBooleanAttributes: true}))
    .pipe(gulp.dest('build'))
});

gulp.task('pack-fonts', function() {
  return gulp.src(['lib/bootstrap/fonts/*', 'lib/font-awesome/fonts/*'])
  .pipe(gulp.dest('build/fonts'))
});

gulp.task('pack-images', ['flyers'], function(){
  return gulp.src('img/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img'))
});

gulp.task('flyers', function(){
  return gulp.src('img/individual_flyer/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img/individual_flyer'))
});

gulp.task('default', ['watch']);
