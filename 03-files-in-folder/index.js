const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

readdir(path.join(__dirname, 'secret-folder'))
  .then((files) => {
    for (let file of files) {
      fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
        if (err) console.error(err);
        if (stats.isFile())
          console.log(
            `${path.parse(file).name} - ${path.parse(file).ext.slice(1)} - ${
              stats.size / 1000
            }KB`
          );
      });
    }
  })
  .catch((err) => console.error(err));
