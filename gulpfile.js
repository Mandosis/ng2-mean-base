const gulp = require('gulp');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');
const notify = require('gulp-notify');
const moment = require('moment');
const ts = require('gulp-typescript')

gulp.task('build:server', () => {
  return gulp.src(['server/**/*.ts', 'models/**/*.ts', 'modules/**/*.ts'])
    .pipe(ts({
      "module": "commonjs",
      "noImplicitAny": true,
      "removeComments": false,
      "moduleResolution": "node",
      "preserveConstEnums": true,
      "sourceMap": false,
      "outDir": './dist'
    }))
    .pipe(gulp.dest('./dist'))
});
