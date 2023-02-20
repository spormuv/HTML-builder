// import
const fs = require('fs');
const { mkdir, readdir, readFile, copyFile, unlink } = require('fs/promises');
const path = require('path');

// make dir
mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

// html
const writeStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'index.html')
);

let indexHTML = '';

readdir(path.join(__dirname, 'components'), { withFileTypes: true })
  .then(async (components) => {
    indexHTML = await readFile(path.join(__dirname, 'template.html'), 'utf-8');
    for (const component of components) {
      const componentName = component.name.slice(0, -5);
      const componentHTML = await readFile(
        path.join(__dirname, 'components', component.name)
      );
      indexHTML = indexHTML.replace(`{{${componentName}}}`, componentHTML);
    }
  })
  .then(() => {
    writeStream.write(indexHTML);
  });

// styles
const writeStyle = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'style.css')
);

readdir(path.join(__dirname, 'styles'), { withFileTypes: true }).then((res) =>
  res.forEach((el) => {
    if (path.extname(el.name) === '.css') {
      const readStream = fs.createReadStream(
        path.join(__dirname, 'styles', el.name),
        'utf-8'
      );
      readStream.pipe(writeStyle);
    }
  })
);

// assets
mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true });

const deleteAssets = function (dest) {
  readdir(dest, { withFileTypes: true }).then((res) => {
    res.forEach((el) => {
      if (el.isDirectory()) {
        deleteAssets(path.join(dest, el.name));
      } else {
        unlink(path.join(dest, el.name));
      }
    });
  });
};

deleteAssets(path.join(__dirname, 'project-dist', 'assets'));

const copyAssets = function (src, dest) {
  readdir(src, { withFileTypes: true }).then((res) => {
    res.forEach((el) => {
      if (el.isDirectory()) {
        mkdir(path.join(dest, el.name), { recursive: true });
        copyAssets(path.join(src, el.name), path.join(dest, el.name));
      } else {
        copyFile(path.join(src, el.name), path.join(dest, el.name));
      }
    });
  });
};

copyAssets(
  path.join(__dirname, 'assets'),
  path.join(__dirname, 'project-dist', 'assets')
);
