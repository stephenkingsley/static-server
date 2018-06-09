'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/upload', controller.upload.upload);
  router.get('/upload-page', controller.upload.uploadPage);
};
