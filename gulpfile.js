/*
 * @Author: hy 
 * @Date: 2018-12-03 08:54:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-03 08:59:53
 */

var gulp = require("gulp");
var sass = require("gulp-sass");
var minCss = require("gulp-clean-css");


gulp.task("devScss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("./src/css"))
})