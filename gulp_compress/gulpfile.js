var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

gulp.task('minifyCss', function(){
	return gulp.src('css/*.css')
			.pipe(plugins.concat('style.min.css'))
			.pipe(plugins.minifyCss())
			.pipe(gulp.dest('./'));
});	

gulp.task('minifyJs', function(){
	return gulp.src('js/*.js')
			.pipe(plugins.concat('main.min.js'))
			.pipe(plugins.uglify())
			.pipe(plugins.rev())
			.pipe(gulp.dest('min_revjs/'))
			.pipe(plugins.rev.manifest())
			.pipe(gulp.dest('rev/js'));
});

gulp.task('revHtml', function(){
	return gulp.src('./index.html')
			.pipe(plugins.rev())
			.pipe(gulp.dest('revHtml/'))
			.pipe(plugins.rev.manifest())
			.pipe(gulp.dest('rev/html'))
})

gulp.task('htmlRouter', function(){
	return gulp.src(['rev/js/*.json', 'index.html'])
			.pipe(plugins.revCollector())
			.pipe(gulp.dest('./'))
})

gulp.task('watch',function(){
	gulp.watch('css/*.css', ['minifyCss']);
	gulp.watch('js/*.js', ['minifyJs']);
	gulp.watch('rev/js/*.json', ['htmlRouter']);
});

gulp.task('default', ['minifyJs', 'minifyCss', 'revHtml','watch']);