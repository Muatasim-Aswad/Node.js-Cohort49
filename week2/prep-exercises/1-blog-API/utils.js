const fs = require('fs/promises');
const path = require('path');

String.prototype.destruct = function () {
  return this.toLowerCase().split(/[\s,;:&-_]+/);
};

const constructFilePath = (append, name, prepend) => {
  return append + name.destruct().join('_') + prepend;
};

const extractFileName = (sPath) => {
  const { name } = path.parse(sPath);

  return name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatFileName = (name) => {
  return name
    .destruct()
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const fileCRUD = async (operation, name, data) => {
  const path = constructFilePath('./blogs/', name, '.txt');

  try {
    if (!name) throw new Error('Cannot execute a CRUD without a file name!');

    const file = {
      async create() {
        return await fs.writeFile(path, data);
      },
      async retrieve() {
        return await fs.readFile(path, 'utf-8');
      },
      async update() {
        return await this.create();
      },
      async delete() {
        return await fs.unlink(path);
      },
    };

    if (operation !== 'create') await fs.access(path);

    if (file[operation]) return await file[operation]();

    throw new Error(`Invalid operation.`);
  } catch (err) {
    console.log(`Error in Operation: ${operation}. Path: ${path} \n${err}\n`);
  }
};

module.exports = {
  constructFilePath,
  extractFileName,
  formatFileName,
  fileCRUD,
};
