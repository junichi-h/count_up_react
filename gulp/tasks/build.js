import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { config } from '../constants/config';

const $ = gulpLoadPlugins();

const assets = `${config.app}/${config.assets}/`;

// 静的ファイルを移動
gulp.task('extras', () => {
  gulp.src([
    'app/*.*',
    '!app/*.pug'
  ], {
    dot: true
  }).pipe(gulp.dest(config.dist));

  gulp.src([
      `${assets}${config.image}/**`,
  ]).pipe(gulp.dest(`${config.dist}/${config.assets}/${config.image}`));

  gulp.src([
    `${assets}${config.fonts}/**`,
  ]).pipe(gulp.dest(`${config.dist}/${config.assets}/${config.fonts}`));

  /* gulp.src([
      '.tmp/assets/styles/!**'
  ]).pipe(gulp.dest('dist/assets/styles'));*/
});

gulp.task('build', ['html', 'extras'], () => {
  return gulp.src(`${config.dist}/**/*`)
      .pipe($.size({title: 'build', gzip: true}));
});
