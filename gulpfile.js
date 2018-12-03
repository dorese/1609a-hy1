/*
 * @Author: hy 
 * @Date: 2018-12-03 08:54:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-03 10:14:07
 */

var gulp = require("gulp");
var sass = require("gulp-sass");
var minCss = require("gulp-clean-css");
var server = require("gulp-webserver");
var uglify = require("gulp-uglify");


var url = require("url");
var fs = require("fs");
var path = require("path");

//scss->css
gulp.task("devScss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest("./src/css"))
})


//监听
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devScss"))
})


//起服务
gulp.task("web", function() {
    return gulp.src("./src")
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicon.ico") {
                    res.end(" ")
                    return

                }
                if (pathname === "/api/swiper") {

                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))

                }


            }
        }))
})


gulp.task("dev", gulp.series("devScss", "web", "watch"));



gulp.task("Dcss", function() {
    return gulp.src("./src/*.css")
        .pipe(gulp.dest("./build"))
})

gulp.task("uglify", function() { //js压缩
    return gulp.src("./src/*.{js,map}")
        .pipe(uglify())
        .pipe(gulp.dest("./build"))

})

gulp.task("Html", function() {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./build"))
})

gulp.task("Wath", gulp.series("Dcss", "uglify", "Html"))