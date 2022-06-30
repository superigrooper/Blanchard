const { src, dest, series, watch, parallel } = require('gulp')
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const image = require('gulp-image');
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const gulpif = require('gulp-if');
const sass = require('gulp-sass')(require('sass'));


const NODE_ENV = process.env.NODE_ENV.trim();
const dev = (NODE_ENV === 'dev');
const prod = (NODE_ENV === 'prod');

// clean
const clean = () => {
  return del(['dist'])
}

// styles
const styles = () => {
  return src('./src/scss/**/*.scss')
    .pipe(gulpif(dev, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(autoprefixer({ 
        overrideBrowserslist: ['last 10 versions'],
        grid: true 
      }
    ))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulpif(dev, sourcemaps.write()))
    .pipe(gulpif(dev, dest('./src/css')))
    .pipe(gulpif(prod, dest('./dist/css')))
    .pipe(browserSync.stream())
}

// htmlmin
const html = () => {
  return src('./src/index.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulpif(prod, dest('./dist')))
    .pipe(browserSync.stream())
}

// images
const images = () => {
  return src([
    './src/img/**/*.jpg',
    './src/img/**/*.jpeg',
    './src/img/**/*.png',
    './src/img/**/*.svg',
  ])
  .pipe(image())
  .pipe(dest('./dist/img'))
}

// scriprs
const scripts = () => {
  return src('./src/js/modules/**/*.js')
  .pipe(gulpif(dev, sourcemaps.init()))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('main.min.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(gulpif(dev, sourcemaps.write()))
  .pipe(gulpif(dev, dest('./src/js')))
  .pipe(gulpif(prod, dest('./dist/js')))
  .pipe(browserSync.stream())
}

// resources
const libs = () => {
  return src('./src/libs/**/*')
    .pipe(dest('./dist/libs'))
}

const fonts = () => {
  return src('./src/fonts/**/*')
    .pipe(dest('./dist/fonts'))
}

// icons
const icons = () => {
  return src('./src/img/icons/**/*')
    .pipe(dest('./dist/img/icons'))
}

// favicon
const favicon = () => {
  return src('./src/favicon.ico')
    .pipe(dest('./dist'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });
  watch('./src/**/*.html', html);
  watch('./src/scss/**/*.scss', styles)
  watch(['./src/js/**/*.js', '!./src/js/*.min.js'], scripts);
  watch('./src/img/**/*', images);
}

exports.styles = styles;
exports.html = html;
exports.scripts = scripts;
exports.images = images;
exports.clean = clean;

exports.prod = series(clean, styles, html, scripts, libs, fonts, icons, favicon,images);
exports.dev = parallel(html, styles, scripts, watchFiles);
