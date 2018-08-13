// This file configures a web server for testing the production build
// on your local machine.

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import {chalkProcessing} from './chalkConfig';
import proxy from "http-proxy-middleware";

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

// Run Browsersync
browserSync({
  port: 4000,
  ui: {
    port: 4001
  },
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ],

  middleware: [
      historyApiFallback(),
      proxy('/assets', {target: 'https://portal.greenflytest.com:443', changeOrigin: true }),
      proxy('/login', {target: 'https://portal.greenflytest.com:443', changeOrigin: true }),
      proxy('/ajax', {target: 'https://portal.greenflytest.com:443', changeOrigin: true }),
      proxy('/graphql', {target: 'https://portal.greenflytest.com:443', changeOrigin: true }),
      proxy('/graphiql', {target: 'https://portal.greenflytest.com:443', changeOrigin: true })
  ]
});
