# gulp-application

## 前言

&nbsp;&nbsp;&nbsp;&nbsp;博主最近准备开发一个 UI 组件库，遇到了一个难题，博主希望单独打包组件样式 scss 文件，而不是与组件一起用 webpack 打包。调研发现 gulp 可以解决这个问题，于是，研究了下 gulp4 在前端工程化中的应用。

## 1.简介

&nbsp;&nbsp;&nbsp;&nbsp;<font color="#c7254e">gulp</font>是一种基于流的自动化构建工具，基于<font color="#c7254e">nodeJs</font>中的 stream（流）来读取和写入数据，相对于<font color="#c7254e">grunt</font>直接对文件进行 IO 读写来说速度更快。
<br>
&nbsp;&nbsp;&nbsp;&nbsp;借助于 gulp，我们可以自动化地完成 js/sass/less/css 等文件的的测试、检查、合并、压缩、格式化，并监听文件在改动后重复指定的这些步骤。

## 2.gulp 检测打包压缩 js

全局安装 gulp

```
$ npm install gulp -g
```

作为项目的开发依赖（devDependencies）安装：

<table><tr><td width=400 bgcolor=#23241f><font color=#f8f2f2>
$ npm install gulp --save-dev
</font></td></tr></table>
查看gulp版本
<table><tr><td width=400 bgcolor=#23241f><font color=#f8f2f2>
$ gulp -v
<br>
CLI version:  2.2.0
<br>
Local version: 4.0.2
</font></td></tr></table>
新建<font color="#c7254e">gulpfile.js</font>

```
// 定义default任务（gulp4)
gulp.task('default', async() => {
    await ...
});
```

执行<font color="#c7254e">gulp</font>（默认会执行 default 任务）

<table><tr><td width=600 bgcolor=#23241f><font color=#f8f2f2>
$ gulp
</font></td></tr>
</table>

## 3.常用 API

- gulp.src(globs[, options])
  <br>读取目录下的文件
- gulp.dest(path[, options])
  <br>向目录写入文件
- gulp.task(name[, deps], fn)
  <br>定义一个 gulp 任务
- gulp.pipe()
  <br>将目标文件通过插件处理
- gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])
  <br>监视文件系统，并且可以在文件发生改动时候执行操作
- gulp.series(task1, task2, task3) (gulp4 新增)
  <br>串行执行任务
- gulp.parallel(task1, task2, task3) (gulp4 新增)
  <br>并行执行任务

## 4.gulp3 与 glup4

gulp3 与 gulp4 的变化，主要体现在任务定义及执行体系的变化。

### 4.1gulp3 中任务定义及执行顺序

> gulp3 对于任务，顺序执行完该任务的依赖任务后，才执行该任务。

![](https://user-gold-cdn.xitu.io/2019/5/30/16b08fa32eca25f9?w=1034&h=66&f=png&s=7525)

gulp3 中任务定义：

```
// gulpfile.js文件
const gulp = require('gulp');

// 定义task1任务
gulp.task('task1', function() {
  console.log('task1');
});

// 定义task2任务
gulp.task('task2', function() {
  console.log('task2');
});

// 定义default任务，依赖于task1任务和task2任务
gulp.task('default', ['task1', 'task2'], function() {
  console.log('done');
});
```

gulp3 中任务执行：
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/30/16b0756d2677bb2e?w=909&h=294&f=png&s=63577">
<br>
执行顺序：
<br>start task1 => finish task1 => start task2 => finish task2 => start default => finish default

### 4.2gulp4 中任务定义及执行顺序

gulp4 中不再支持 gulp3 中任务定义及依赖执行方式。
<br>假设定义任务仍然采用 gulp3 方式：

```
gulp.task('task1', function() {
  console.log('task1');
});
```

执行 task1，报错 <font color="#c7254e">Did you forget to signal async completion?</font>
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/30/16b08cb7e0f812c9?w=799&h=170&f=png&s=44844">
<br>
解决方法：采用<font color="#c7254e">async await</font>方式定义任务，

```
// 定义task1任务
gulp.task('task1', async() => {
  await console.log('task1');
});
```

执行 task1，任务执行成功。
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/30/16b08cd17bc3055b?w=851&h=145&f=png&s=39654">
<br>

> gulp4 中任务执行不再采用依赖执行方式，而是采用串行执行(`gulp.series`)和并行执行(`gulp.parallel`)两种方式。<br>
> （1）串行（顺序）执行，与 gulp3 中顺序执行不同，先开始 default 任务，再顺序执行 task1、task2 任务，最后结束 default 任务。

![](https://user-gold-cdn.xitu.io/2019/5/30/16b08f6e9f94a530?w=1026&h=68&f=png&s=10198)
gulp4 若是采用如 gulp3 中依赖执行方式，则会报<font color="#c7254e">Task function must be specified</font>错误。
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/31/16b0b841491b0a1e?w=868&h=493&f=png&s=202295">
<br>
解决方案：
<br>采用`gulp.series('task1','task2')`或`gulp.parallel('task1','task2')`替代 gulp3 中`gulp.task('default', ['task1', 'task2'], function() {... })`方式。<br>
串行执行(`gulp.series`)：

```
const gulp = require('gulp');

// 定义任务task1
gulp.task('task1', async() => {
  await console.log('task1');
});

// 定义任务task2
gulp.task('task2', async() => {
  await console.log('task2');
});

// 串行执行task1、task2任务
gulp.task('default', gulp.series('task1', 'task2'));
```

执行结果：
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/30/16b0906229bb89c1?w=910&h=290&f=png&s=73490">
<br>
执行顺序：
<br>start default => start task1 => finish task1 => start task2 => finish task2 => finish default

> （2）并行执行，先开始 default 任务，然后同步执行并行任务，最后结束 default 任务。

![](https://user-gold-cdn.xitu.io/2019/5/30/16b09032f0c00977?w=564&h=149&f=png&s=14253)
并行执行(`gulp.parallel`)：

```
const gulp = require('gulp');

// 定义任务task1
gulp.task('task1', async() => {
  await console.log('task1');
});

// 定义任务task2
gulp.task('task2', async() => {
  await console.log('task2');
});

// 并行执行task1、task2任务
gulp.task('default', gulp.parallel('task1', 'task2'));
```

执行结果:
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/30/16b0908fc37be90d?w=922&h=295&f=png&s=73057">
<br>
执行顺序：
<br>start default => start task1 => start task2 => finish task1 => finish task2 => finish default
<br>

> **要点：**
> <br>1.gulp4 中定义任务采用 async await 方式定义任务。
> <br>2.gulp4 中任务执行有串行（`gulp.series`）和并行执行（`gulp.parallel`）方式，通过合理配置串行和并行即可实现 gulp3 中的依赖执行。

&nbsp;&nbsp;&nbsp;&nbsp;接下来将探讨如何使用 gulp 打包 js、css、image、html 以及如何在生产和开发环境下编写 gulp 配置。

## 5.gulp 检测、转换、打包、压缩 js

所需插件：

- gulp-eslint：eslint 检测
- gulp-babel：babel 转换
- gulp-concat：合并文件（js/css/html 等）
- gulp-uglify：压缩 js

实现功能：
<br>将当前目录下的 main.js、hello.js、world.js 进行 eslint 检测，babel 转换，合并压缩成 app.min.js 输出到 dist 目录

```
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
            .pipe(concat('app.min.js')) // 合并为app.min.js
            .pipe(uglify()) // 文件压缩
            .pipe(gulp.dest('./dist/')) // 文件写入到dist文件夹
});

// 顺序执行clean、eslint、jsCompress任务
gulp.task('default', gulp.series('clean', 'eslint', 'jsCompress'));

```

执行 gulp，任务执行成功：
<image src="https://user-gold-cdn.xitu.io/2019/5/31/16b0be84724f3616?w=995&h=294&f=png&s=121003">
在 dist 文件夹下生成了 app.min.js
<br>
<img width="180" height="200" src="https://user-gold-cdn.xitu.io/2019/5/31/16b0b94820b4c326?w=223&h=237&f=png&s=11720">
&nbsp;
<img width="180" height="200" src="https://user-gold-cdn.xitu.io/2019/5/31/16b0b959e79cad31?w=253&h=291&f=png&s=17047">

## 6.gulp 转换、合并、压缩 scss/css

所需插件：
<br>

- gulp-sass：sass 编译
- gulp-concat：合并文件
- gulp-clean-css：压缩 css

实现功能：
<br>
（1）当前目录下的 main.scss、style.scss 转换 css 然后合并压缩成 scss.css 写入到 dist 目录。
<br>
（2）当前目录下的所有 css 文件合并压缩成 style.min.css 写入到 dist 目录。

```
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
```

执行 gulp，任务执行成功
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/31/16b0be92ed17b5f7?w=1001&h=296&f=png&s=118231">
<br>
在 dist 目录下生成了 scss.css 和 style.min.css 文件。
<br>
<image width="180" height="200" src="https://user-gold-cdn.xitu.io/2019/5/31/16b0bfef085cdcee?w=182&h=198&f=png&s=10767">
&nbsp;
<image width="180" height="200" src="https://user-gold-cdn.xitu.io/2019/5/31/16b0bffd67ce42ac?w=206&h=290&f=png&s=15752">

## 7.gulp 压缩 html、image

所需插件：

- gulp-htmlmin：html 压缩
- gulp-imagemin：图片压缩

实现功能：
<br>
（1）实现当前目录下的 html 压缩输出到 dist 目录下
<br>
（2）实现当前目下的 png 图片输出到 dist 目录下

```
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

// 先串行执行clean任务，后并行执行html和image任务
gulp.task('default', gulp.series('clean', gulp.parallel('html', 'image')));
```

执行 gulp，任务执行成功
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/31/16b0c0a32c81a64c?w=1105&h=317&f=png&s=110893">
<br>
在 dist 目录下生成了压缩的 html 文件和 image
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/31/16b0c0eceae79a2b?w=200&h=120&f=png&s=8741">
&nbsp;
<image src="https://user-gold-cdn.xitu.io/2019/5/31/16b0c0e0e8bfbf35?w=231&h=230&f=png&s=14446">

## 8.gulp 在生产和开发环境下的应用

前端开发过程中，针对开发环境和生产环境配置往往不同：
<br>
开发环境：起本地服务，支持调试，热更新。
<br>
生产环境：压缩合并代码用于部署线上环境。
<br>
所需插件：

- del：清空目录
- gulp-eslint：eslint 代码检测
- gulp-babel：babel 转换，将 es6 代码转为 es5
- gulp-concat：合并文件
- gulp-uglify：js 压缩
- gulp-sass：sass 编译
- gulp-clean-css：css 压缩
- gulp-htmlmin：html 压缩
- gulp-imagemin：图片压缩
- gulp.connect：起 server 服务调试

实现功能：
<br>
（1）实现 js eslint 检测、babel 转换、合并、压缩
<br>
（2）实现 sass 编译与 css 合并、压缩
<br>
（3）实现 html 压缩
<br>
（4）实现 image 压缩
<br>
（5）开发环境预览、热更新
<br>
（6）生产环境各个文件打包

```
const gulp = require('gulp');
const babel = require('gulp-babel'); // es6转为es5语法
const eslint = require('gulp-eslint'); // eslint代码检测
const concat = require('gulp-concat'); // 文件合并
const uglify = require('gulp-uglify'); // js压缩
const sass = require('gulp-sass'); // sass编译
const htmlmin = require('gulp-htmlmin'); // html压缩
const connect = require('gulp-connect'); // 起server服务
const imagemin = require('gulp-imagemin'); // 图片压缩
const del = require('del'); // 清空目录
const cleanCss = require('gulp-clean-css'); // css压缩

// 清空dist目录
gulp.task('clean', async() => {
 await del(['./dist']);
});

// html压缩公共函数
const htmlMin = () => {
 return gulp.src('./index.html')
            .pipe(htmlmin(
                 {collapseWhitespace: true}
                 ))
            .pipe(gulp.dest('dist'));
};

// html:dev task，用于开发环境下，浏览器自动刷新
gulp.task('html:dev', async() => {
 await htmlMin().pipe(connect.reload());
});
// html:build task，用于生产环境
gulp.task('html:build', async() => {
 await htmlMin();
});

// sass转换、合并、压缩css公共函数
const cssMin = () => {
 return gulp.src(['./css/style.scss', './css/*.css'])
            .pipe(sass())
            .pipe(concat('style.min.css'))
            .pipe(cleanCss())
            .pipe(gulp.dest('./dist/css'))
};

// css:dev任务，用于开发环境
gulp.task('css:dev', async() => {
 await cssMin().pipe(connect.reload());
});
// css:dev任务，用于生产环境
gulp.task('css:build', async() => {
 await cssMin();
});

// js eslint检测、babel转换、合并、压缩公共函数
const jsMin = () => {
 return gulp.src('./js/*.js')
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe(babel({
               presets: ['@babel/env']
             }))
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'));
};

// js:dev任务，用于开发环境
gulp.task('js:dev', async() => {
 await jsMin().pipe(connect.reload());
});
// js:build，用于生产环境
gulp.task('js:build', async() => {
 await jsMin();
});

// 图片压缩公共函数
const imageMin = () => {
 return gulp.src('./img/*.png')
            .pipe(imagemin())
            .pipe(gulp.dest('./dist/img'));
};

// image:dev任务，用于开发环境
gulp.task('image:dev', async() => {
 await imageMin().pipe(connect.reload());
});
// image:build任务，用于生产环境
gulp.task('image:build', async() => {
 await imageMin();
});

// server任务，目录为dist，入口文件为dist/index.html，port 8080
gulp.task('server', () => {
  connect.server(
   {
     root: './dist',
     port: 8080,
     livereload: true
   }
 )
});

// watch任务，监听源文件变化，执行对应开发任务
gulp.task('watch', () => {
 gulp.watch(['./css/*.css', './css/*.scss'], gulp.series('css:dev'));
 gulp.watch('./js/*.js', gulp.series('js:dev'));
 gulp.watch('./index.html', gulp.series('html:dev'));
 gulp.watch('./img/*.png', gulp.series('image:dev'));
});

// dev任务，启动开发环境
gulp.task('dev', gulp.series(gulp.parallel('watch', 'server')));

// build任务，用于生产环境下打包压缩源代码
gulp.task('build', gulp.series('clean', gulp.parallel('html:build', 'js:build', 'css:build', 'image:build')))
```

在当前目录下 package.json 中 script 补充：

```
"scripts": {
   "dev": "gulp dev",
   "build": "gulp build"
 },
```

执行`npm run dev`，即可启动开发模式，当我们修改源 html、css、js 等文件时，会执行对应打包任务重新打包，浏览器自动刷新。
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/31/16b0c397f68a786f?w=1098&h=388&f=png&s=117132">
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/31/16b0c3b1f79de172?w=917&h=491&f=png&s=27913">
<br>
执行`npm run build`，打包目录中的源代码。
<image src="https://user-gold-cdn.xitu.io/2019/5/31/16b0c3d0f1c6c51d?w=1098&h=546&f=png&s=222914">
<br>
在 dist 文件夹中包含了打包处理后的 html、css、js、image 等资源。
<br>
<image src="https://user-gold-cdn.xitu.io/2019/5/31/16b0c3c34974251e?w=228&h=257&f=png&s=15033">
&nbsp;
<image src="https://user-gold-cdn.xitu.io/2019/5/31/16b0c3e9a3122385?w=243&h=425&f=png&s=21727">

&nbsp;&nbsp;&nbsp;&nbsp;以上就是博主探索出的 gulp4 在前端工程化的应用。相信大家看完文章后对 gulp 应该有了一个初步的认识，后续感兴趣的小伙伴还可以考虑将 gulp 集成到 webpack 配置中，更好地提升开发效率。

gulp 中文网：https://www.gulpjs.com.cn

（觉得不错的小伙伴可以給文章点个赞，还有 star 一下，灰常感谢^\_^）
