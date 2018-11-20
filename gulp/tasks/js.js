import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.production.babel';
import webpackDevProd from '../../webpack.config.dev.prod.babel';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('js:prod', () => {
  console.log('js:prod ---------->');
  const webpackSetting = webpack(webpackConfig);
  webpackSetting.run((err, stats) => {
    if(err){
      throw new Error('webpack build failed');
    }
    $.util.log(stats.toString({
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: true,
      chunkModules: false
    }));
    reload();
  });
});

gulp.task('js:devprod', () => {
  const webpackSetting = webpack(webpackDevProd);
  webpackSetting.run((err, stats) => {
    if(err){
      throw new Error('webpack build failed');
    }
    $.util.log(stats.toString({
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: true,
      chunkModules: false
    }));
    reload();
  });
});