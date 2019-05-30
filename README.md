# gulp-application

## 1.简介
  &nbsp;&nbsp;&nbsp;&nbsp;<font color="#c7254e">gulp</font>是一种基于流的自动化构建工具，基于<font color="#c7254e">nodeJs</font>中的stream（流）来读取和写入数据，相对于<font color="#c7254e">grunt</font>直接对文件进行IO读写来说速度更快。
  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;借助于gulp，我们可以自动化地完成js/sass/less/css等文件的的测试、检查、合并、压缩、格式化，并监听文件在改动后重复指定的这些步骤。
 ## 2.API
  + gulp.src(globs[, options])
    <br>读取目标源文件
  + gulp.dest(path[, options])
    <br>向目标路径输出结果
  + gulp.pipe()
    <br>将目标文件通过插件处理
  + gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])
    <br>监视文件系统，并且可以在文件发生改动时候做一些事情
  + gulp.task(name, fn)
    <br>定义一个gulp任务
## 3.gulp检测打包压缩js
### 3.1安装gulp
 全局安装gulp
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


  
  

