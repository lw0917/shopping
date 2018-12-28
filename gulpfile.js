var gulp=require('gulp');
var sass=require('gulp-sass');
var uglify=require('gulp-uglify');
var server=require('gulp-webserver');
var minCss=require('gulp-clean-css');
var fs=require('fs');
var path=require('path');
var url=require('url');
var data=require('./mock/data.json')
  
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
                          var type=url.parse(req.url,true).query.key;
                          var arr=[];
                          data.map(function(file){
                               if(file.type.indexOf(type)!=-1){
                                   arr.push(file)
                               }
                          })
                          
                          if(arr.length>0){
                              res.end(JSON.stringify({code:1,msg:arr}))
                          }else{
                              res.end(JSON.stringify({code:0,msg:'没有此商品'}))
                          }   
                      }else{
                          res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
                      }
                  }
              }))
   })

   //开发环境
   gulp.task('default',gulp.series('sass','dev','watch'))
 
   //压缩js
   gulp.task('minJs',function(){
    return gulp.src('./src/js/*.js')
           .pipe(uglify())
           .pipe(gulp.dest('./bulid/js'))
   })
   //拷贝css
   gulp.task('copyCss',function(){
    return gulp.src('./src/css/*.css')
           .pipe(gulp.dest('./bulid/css'))
   })
   //拷贝libs
   gulp.task('copyJs',function(){
    return gulp.src('./src/js/libs/*.js')
           .pipe(gulp.dest('./bulid/js/libs'))
   })
   //拷贝html
   gulp.task('copyHtml',function(){
    return gulp.src('./src/*.html')
           .pipe(gulp.dest('./bulid/*.html'))
   })
   gulp.task('bulid',gulp.parallel('minJs','copyCss','copyJs','copyHtml'))