'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1528541473437_4637';

  // add your config here
  config.middleware = [];

  config.static = {
    maxAge: 31536000,
    prefix: '/public',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    buffer: true,
    gzip: true, 
  };

  config.multipart = {
    fileSize: '50mb',
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  config.security= {
    csrf: {
      ignore: '/upload',
    },
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
    },
  };

  return config;
};
