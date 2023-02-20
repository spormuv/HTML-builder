const { mkdir, copyFile, readdir, unlink } = require('node:fs/promises');
const { join } = require('node:path');

const oldDir = join(__dirname, 'files');
const newDir = join(__dirname, 'files-copy');

const copyDir = async function () {
  await mkdir(newDir, { recursive: true });

  await readdir(newDir, { withFileTypes: true }).then((data) => {
    data.forEach((item) =>
      unlink(join(newDir, item.name), (err) => console.error(err))
    );
  });

  await readdir(oldDir, { withFileTypes: true }).then((data) => {
    data.forEach((item) => {
      copyFile(join(oldDir, item.name), join(newDir, item.name));
    });
  });
};

copyDir();
