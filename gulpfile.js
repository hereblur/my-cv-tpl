var gulp = require('gulp'),
    gulpsass = require('gulp-sass'),
    serve = require('gulp-serve'),
    sass = require('node-sass');

gulp.task('sass', function() {
  return gulpsass('main.scss', { style: 'expanded' })
    .pipe(gulp.dest('.'))
});

gulp.task('serve', serve({
  root: ['.'],
  port: 8081,
  middleware: function(req, res, next) {
    if(req.originalUrl.match(/main\.css$/)){
        sass.render({
          file: "main.scss",
        }, function(err, result) {
            console.log(result)
            res.end(result.css.toString());
        });
    }else
        next()
  }
}));
