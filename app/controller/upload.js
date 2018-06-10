'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

const writeFile = (fileStream, writeStream) => new Promise(resolve => {
  fileStream.on('data', chunk => {
    writeStream.write(chunk);
  });
   
  fileStream.on('end', () => {
    writeStream.end();
    resolve(true);
  });
});

const readList = (path) => new Promise(resolve => {
  const fileList = [];
  fs.readdir(path, (err, dirList) => {
    if (err) {
      resolve(fileList);
    } else {
      dirList.forEach(item => {
        fileList.push({
          name: item,
          path: `${path}/${item}`,
        });
      });
      resolve(fileList);
    }
  })
});

class UploadController extends Controller {
  async upload() {
    const fileInformationArr = [];
    const ctx = this.ctx;
    const parts = ctx.multipart();
    let part;
    while ((part = await parts()) != null) {
      if (part.length) {
        // arrays are busboy fields
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // user click `upload` before choose a file,
          // `part` will be file stream, but `part.filename` is empty
          // must handler this, such as log error.
          return;
        }
        // otherwise, it's a stream
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        const writeStream = fs.createWriteStream(path.join(__dirname, `../public/${part.filename}`));
        try {
          const result = await writeFile(part, writeStream);
          fileInformationArr.push({
            name: part.filename,
            path: `/public/${part.filename}`,
          })
        } catch (err) {
          throw err;
        }
      }
    }
    this.ctx.body = fileInformationArr;
  }

  async uploadPage() {
    const ctx = this.ctx;
    const list = await readList(path.join(__dirname, `../public`));
    await ctx.render('uploadPage.nj', {
      list,
    });
  }
};

module.exports = UploadController;
