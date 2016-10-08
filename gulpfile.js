var gulp = require('gulp'),
//del = require('del'),
    replace = require('gulp-replace'),
    filter = require('gulp-filter'),
    ftp = require('vinyl-ftp'),
    min = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    pkg = require('./package.json');
var path = {
    dist: ['dist/:*+/*', '!dist/**/*.map', '!dist/js/lib/*.js', '!dist/js/bundle.js', 'dist/js/*.js'],
    images: {from: 'src/img/*', to: 'dist/img'},
    ftpPath: 'activity/' + pkg.name,
    ftpConfig: {
        test: {
            host: '220.181.98.57',
            port: '2100',
            userName: 'ynren1',
            pwd: 'ynren@163'
        },
        publish: {
            host: '220.181.29.249',
            port: '16321',
            userName: 'wangjun2012',
            pwd: 'wangjun2012'
        }
    }
};
//gulp.task('clean', function (cb) {
//    return del([path.dist], cb);
//});
gulp.task('copy-img', function () {
    return gulp.src(path.images.from)
        .pipe(gulp.dest(path.images.to));
});

//gulp.task('min-js', function(){
//    return gulp.src('dist/index.html')
//        .pipe(min({
//            js:[uglify()]
//        }))
//        .pipe(gulp.dest('dist/'));
//});
gulp.task('test', function () {
    var conn = ftp.create({
        host: path.ftpConfig.test.host,
        port: path.ftpConfig.test.port,
        user: path.ftpConfig.test.userName,
        password: path.ftpConfig.test.pwd,
        parallel: 5
    });
    return gulp.src(path.dist)
        .pipe(conn.dest(path.ftpPath));
    //.pipe(gulp.dest('test/'));
});
gulp.task('publish', function () {
    var conn = ftp.create({
        host: path.ftpConfig.publish.host,
        port: path.ftpConfig.publish.port,
        user: path.ftpConfig.publish.userName,
        password: path.ftpConfig.publish.pwd,
        parallel: 5
    });

    var f = filter('dist/index.html', {restore: true});
    var version = Date.now();
    var statistics = '<script src="http://analytics.163.com/ntes.js"></script>' +
        '<script>_ntes_nacc = "mapp";neteaseTracker();</script>' +
        '<script>(function(){var c=navigator.userAgent;var b=document.referrer;var d="";if(c.match(/micromessenger/gi)){d="wx"}else{if(c.match(/weibo/gi)||b.match(/weibo\.com/gi)){d="wb"}else{if(c.match(/yixin/gi)){d="yx"}else{if(c.match(/qq/gi)||b.match(/(qq|qzone)\.com/gi)){d="qq"}}}}var e="' + pkg.name + '";var a="?spst=5&spss=newsapp&spsf="+d+"&modelid="+e;neteaseTracker(false,"http://sps.163.com/special/"+a,"","sps");window.spsFuncUrl="http://sps.163.com/func/"+a;}());</script>' +
        '<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.src="//hm.baidu.com/hm.js?d12d3bdb9cb406172ef7f054d27e7ae0";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>';

    return gulp.src(path.dist)
        .pipe(f)
        .pipe(replace("<!-- statistics -->", statistics))
        //.pipe(replace("js/index.min.js", "js/index.min.js?v=" + version))
        //.pipe(replace("css/index.min.css", "js/index.min.css?v=" + version))
        .pipe(f.restore)
        .pipe(conn.dest(path.ftpPath));
        //.pipe(gulp.dest('test/'));
});

