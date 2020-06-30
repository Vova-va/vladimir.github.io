var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  csso = require("gulp-csso"),
  concat = require("gulp-concat"),
  minify = require("gulp-minify"),
  htmlmin = require("gulp-htmlmin");

  gulp.task("htmlmin", () => {
    return gulp.src("app/index.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest("dist/"));
  });

 
gulp.task("js", function(){
  return gulp.src("app/js/*.js")
  .pipe(concat("mini.js"))
  .pipe(minify())
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest("dist/js/"));
});


gulp.task("csso", function () {
  return gulp.src("app/css/*.css")
    .pipe(concat("min.mini.css"))
    .pipe(csso())
    .pipe(gulp.dest("dist/css/"))
});

gulp.task("css", function(){
   return gulp.src("app/css/media.css")
   .pipe(browserSync.reload({stream: true}))
});


gulp.task("scss", function () {
  return gulp.src("app/scss/style.scss")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
    browser: "Firefox",
    notify: false,
  });
});

gulp.task("watch", function () {
  gulp.watch("app/scss/style.scss", gulp.parallel("scss"));
  gulp.watch("app/*.html", gulp.parallel("htmlmin"));
  gulp.watch("app/js/*.js", gulp.parallel("js"));
  gulp.watch("app/css/*.css", gulp.parallel("csso"));
  gulp.watch("app/css/media.css", gulp.parallel("css"));
});

gulp.task("default", gulp.parallel("csso", "browser-sync", "watch"));
