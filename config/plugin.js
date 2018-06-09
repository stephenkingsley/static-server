'use strict';

// had enabled by egg
exports.static = true;

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};