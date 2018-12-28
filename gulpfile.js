var gulp=require('gulp');
var sass=require('gulp-sass');
var uglify=require('gulp-uglify');
var server=require('gulp-webserver');
var minCss=require('gulp-clean-css');
var fs=require('fs');
var path=require('path');
var url=require('url');
  
   //编译sass
   gulp.task('sass',function(){
       return gulp.src('./src/sass/*.scss')
              .pipe(sass())
              .pipe(minCss())
              .pipe(gulp.dest('./src/css'))
   })
   //监听sass
   gulp.task('watch',function(){
       return gulp.watch('./src/sass/*.scss',gulp.series('sass'))
   })
   //起服务
   gulp.task('dev',function(){
       return gulp.src('src')
              .pipe(server({
                  port:9090,
                  middleware:function(req,res,next){
                      var pathname=url.parse(req.url).pathname;
                      if(pathname==='/favicon.ico'){
                          return res.end('')
                      }
                      pathname=pathname==='/'?'index.html':pathname;
                      if(pathname==='/api/list'){

                      }else{
                          res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
                      }
                  }
              }))
   })

   //开发环境
   gulp.task('default',gulp.series('sass','dev','watch'))
