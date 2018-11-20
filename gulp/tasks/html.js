import gulp from 'gulp';
import cached from 'gulp-cached';
import changed from 'gulp-changed';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import chalk from 'chalk';

import { config } from '../constants/config';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;


/**
 * pugタスク
 */
gulp.task('pug', () => {
  reload();
});

gulp.task('pug:web', () => {
  gulp.src([
    'app/**/!(_)*.pug'
  ])
  .pipe($.plumber())
  .pipe(changed(config.app, {
    extension: '.html'
  }))
  .pipe($.pug({
    pretty: true,
    cache: true
  }))
  .pipe($.debug({ title: 'pug:web Compiled:' }))
  .pipe(gulp.dest(config.tmp))
  .pipe(reload({ stream: true }));
});

gulp.task('pug:prod', () => {
  console.log(chalk.gray.bgRed.bold('pug:prod--->'));
  const isProd = process.env.NODE_ENV === 'prod';
  console.log(chalk.gray.bgRed.bold(process.env.NODE_ENV));
  gulp.src(`${config.app}/**/!(_)*.pug`)
    .pipe($.plumber())
    .pipe(cached('pug'))
    .pipe($.pug({
      pretty: false,
      cache: false,
      basedir: `${config.app}/`
    }))
    .pipe($.debug({title: 'pug Compiled:'}))
    .pipe(gulp.dest(config.tmp))
});

// ※ gulp js, pugを先に実行しておくこと
gulp.task('html', () => {
  return gulp.src(`${config.tmp}/**/*.html`)
      .pipe($.debug())
      .pipe(gulp.dest(`${config.dist}/`));
});
