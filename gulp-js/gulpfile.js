const gulp = require('gulp');
const babel = require('gulp-babel'); // babel转换
const eslint = require('gulp-eslint'); // eslint检测
const concat = require('gulp-concat'); // 合并文件
const uglify = require('gulp-uglify'); // 压缩js
const del = require('del'); // 清空目录

// 合并压缩的文件
const jsFiles = ['./main.js', './hello.js', './world.js'];


// eslint任务，实现eslint检测和代码格式化
gulp.task('eslint', async() => {
  await gulp.src(jsFiles)
            .pipe(eslint())
            .pipe(eslint.format()) // 格式化
            .pipe(eslint.failAfterError()); // 报错
});

// clean任务，清空dist文件夹
gulp.task('clean', async() => {
  await del(['./dist/']);
});

// jsCompress任务，实现js转换、合并、压缩
gulp.task('jsCompress', async() => {
  await gulp.src(jsFiles)
            .pipe(babel({
              presets: ['@babel/env'] // es6转换为es5
            }))
            .pipe(concat('app.min.js')) // 文件合并
            .pipe(uglify()) // 文件压缩
            .pipe(gulp.dest('./dist/')) // 文件写入到dist文件夹
});

gulp.task('default', gulp.series('clean', 'eslint', 'jsCompress'));
