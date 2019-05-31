const gulp = require('gulp');
const concat = require('gulp-concat'); // 合并文件
const cleanCss = require('gulp-clean-css'); // 压缩css
const sass = require('gulp-sass'); // sass编译
const del = require('del'); // 清空目录

// clean任务，清空dist目录
gulp.task('clean', async() => {
   await del(['./dist']);
});

// sass任务，实现scss文件编译、合并、压缩
gulp.task('sass', async() => {
  await gulp.src(['./main.scss', './style.scss'])
            .pipe(sass()) // sass编译
            .pipe(concat('scss.css')) // 合并为scss.css
            .pipe(cleanCss()) // 压缩css文件
            .pipe(gulp.dest('./dist'));
});

// css任务，实现css合并、压缩
gulp.task('css', async() => {
  await gulp.src(['./*.css'])
            .pipe(concat('style.min.css')) // 合并为style.min.css
            .pipe(cleanCss()) // 压缩
            .pipe(gulp.dest('./dist'));
});

// 先执行clean任务，再并行执行sass和css任务
gulp.task('default', gulp.series('clean', gulp.parallel('sass', 'css')));