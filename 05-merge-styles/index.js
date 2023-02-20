const path = require('path');
const { readdir } = require('node:fs/promises');
const { join } = require('node:path');
const fs = require('fs');

const stylesFolder = join(__dirname, 'styles');
const projectFolder = join(__dirname, 'project-dist');
const writeSream = fs.createWriteStream(join(projectFolder, 'bundle.css'));

readdir(stylesFolder, { withFileTypes: true }).then((data) => {
  data.forEach((item) => {
    if (item.isFile() && path.extname(item.name) === '.css') {
      const readStream = fs.createReadStream(
        path.join(stylesFolder, item.name),
        'utf-8'
      );
      readStream.pipe(writeSream);
    }
  });
});
