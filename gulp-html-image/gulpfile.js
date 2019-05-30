const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin'); // html压缩
const imagemin = require('gulp-imagemin'); // 图片压缩
const del = require('del'); // 清空目录

// clean任务，清空dist目录
gulp.task('clean', async() => {
  await del('./dist');
});

// html任务，压缩html文件代码
gulp.task('html', async() => {
  await gulp.src('./*.html')
            .pipe(htmlmin({ collapseWhitespace: true })) // 压缩去除空格
            .pipe(gulp.dest('dist'));
});

// image任务，压缩图片
gulp.task('image', async() => {
  await gulp.src('./*.png')
            .pipe(imagemin())
            .pipe(gulp.dest('./dist'));
})

// 先串行执行del任务，后并行执行html和image任务
gulp.task('default', gulp.series('clean', gulp.parallel('html', 'image')));