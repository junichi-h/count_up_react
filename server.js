import gulp from 'gulp';
import url from 'url';
import fs from 'fs';
import path from 'path';
import browserSync from 'browser-sync';
// import './gulp/tasks/styles';
import pug from 'pug';
import webpack from 'webpack';
import webpackDevConfig from './webpack.config.development.babel';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import './gulp/tasks/html';

const devBundler = webpack(webpackDevConfig);

const defaultStatsOptions = {
  colors: true,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false, // reduce log
  children: true,
  version: true,
  cached: true,
  cachedAssets: true,
  reasons: true,
  source: true,
  errorDetails: true
};


browserSync({
  files          : [
    'app/*.pug',
    'app/images/**/*'
  ],
  notify         : false,
  port           : 9000,
  open           : false,
  reloadOnRestart: true,
  ghostMode      : {
    clicks: false,
    forms: false,
    scroll: false
  },
  server         : {
    baseDir: ['.tmp', 'app'],
    routes: {
      '/node_modules': 'node_modules'
    },
    middleware: [
      {
        route: '/',
        handle: (req, res, err) => {
          const locals = { files: [] };
          const files = fs.readdirSync('./app');
          files.filter(function(file) { return file.substr(-4) === '.pug' && file !== 'index.pug'; }).forEach(function(file){
            locals.files.push(file.replace('.pug', '.html'));
          });
          const pugData = fs.readFileSync('./app/index.pug', {
            encoding: 'utf-8'
          }, function (err, data) {});
          const result = pug.render(pugData, {
            files: locals.files,
            cache : false,
            basedir: './app/',
            filename: 'app/index.pug'
          });
          fs.writeFileSync('./.tmp/index.html', result, 'utf8');
          res.end(result);
        }
      },
      webpackDevMiddleware(devBundler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: false,
        quiet: false,
        stats: defaultStatsOptions
      }),
      webpackHotMiddleware(devBundler),
      (req, res, next) => {
        const requestPath = url.parse(req.url).pathname;
        // .html or / で終わるリクエストだけを対象とする
        if (!requestPath.match(/(\/|\.html)$/)) {
          return next();
        }
        const suffix = path.parse(requestPath).ext ? '': 'index.html';
        // HTMLファイルが存在すれば、HTMLを返す
        const htmlPath = path.join('./.tmp', requestPath, suffix);
        // pug のファイルパスに変換
        const pugPath = path.join('./app', requestPath, suffix).replace('.html','.pug');
        const pugData = fs.readFileSync(pugPath, {
          encoding: 'utf-8'
        }, function (err, data) {});
        const result = pug.render(pugData, {
          filename: pugPath,
          basedir: './app/',
          pretty: true,
          cache : false
        });
        fs.writeFileSync(htmlPath, result, 'utf8');
        return next();
      }
    ]
  }
});
gulp.run('pug:web');
gulp.watch('app/**/*.pug', ['pug']);