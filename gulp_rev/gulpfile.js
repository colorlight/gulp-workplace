const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('minifyCss', function(){
	return gulp.src('css/*.css')
			.pipe(plugins.concat('style.min.css'))
			.pipe(plugins.minifyCss())
			.pipe(gulp.dest('./'));
});	

gulp.task('minifyJs',function(){                        //过程同CSS  
    return gulp.src('js/index.js')  
            .pipe(plugins.concat('main.min.js'))  
            .pipe(plugins.uglify())  
            .pipe(gulp.dest('./'));                     //需要先生成文件，否则rev-append()无效  
             
  
})  

gulp.task('cssRouter', function(){
	return gulp.src('css/index.css')
			.pipe(plugins.revAppend())
			.pipe(gulp.dest('css/'));
})

gulp.task('htmlRouter',function() {  
    return gulp.src('index.html')       
            .pipe(plugins.revAppend())                 //查找?rev=@@hash字符串，生成md5值          
            .pipe(gulp.dest('./')); 
})  


gulp.task('watch',function(){
	gulp.watch('js/*.js', ['minifyJs']);
	gulp.watch('css/*.css',['minifyCss', 'cssRouter']);
	gulp.watch('haha.png', ['cssRouter']);
	gulp.watch('./*', ['htmlRouter']);
});

gulp.task('default', ['minifyJs', 'minifyCss', 
	'cssRouter', 'htmlRouter','watch']);