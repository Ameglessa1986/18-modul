var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
// Запускаем сервер
gulp.task('serve', gulp.series('sass'), function () {
  browserSync.init({
    server: './app', // Базовая директория
  });
  browserSync.watch('./app/ * */*.*').on('change',
    browserSync.reload); // Отслеживаем изменения и передаем на клиент
});
// Компилируем sass в css
gulp.task('sass', function() {
  return gulp.src('app/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'));
});
gulp.task('watch', function(){ // Отслеживаем изменения
  gulp.watch('app/scss/app/scss/*.scss', gulp.series('sass'));
});
gulp.task('default', gulp.series('sass'), gulp.parallel('watch',
  'serve')); // Задача по умолчанию