const path = require('path');
const fs = require('fs');

// Создаем папку с модулями из исходников
const root = path.resolve(__dirname, '../../');
const srcFolder = path.join(root, 'src');
const srcUnitFolder = path.resolve(root, 'test/AppUnit');
const standSrcFolder = path.join(__dirname, 'src');
const standUnitFolder = path.resolve(standSrcFolder, 'tests');

if (!fs.existsSync(srcFolder)) {
   console.error('Folder is not exists!', srcFolder);
   return;
}

if (!fs.existsSync(standSrcFolder)) {
   fs.mkdirSync(standSrcFolder);
}

const otherModules = require(path.join(root, 'package.json'))['saby-units']
   .modules;
const otherModulesPaths = Object.keys(otherModules).reduce(
   (paths, module_name) => {
      paths[module_name] = path.resolve(root, otherModules[module_name]);
      return paths;
   },
   Object.create(null)
);
linkModules(
   { ...getModulesPaths(srcFolder), ...otherModulesPaths },
   standSrcFolder
);
if (!fs.existsSync(standUnitFolder)) {
   fs.symlinkSync(srcUnitFolder, standUnitFolder, 'dir');
}

const standUnitPaths = getTestsDep(srcUnitFolder).map((p) => {
   return `src/tests/${p}`;
});

fs.writeFile(
   path.join(__dirname, '_settings.js'),
   `if (!chai) var chai = require('chai');
    var assert = chai.assert;
    var unitTests = ${JSON.stringify(standUnitPaths)};
    if (typeof module !== 'undefined') module.exports = unitTests;`,
   (e) => {
      return e && console.error(e);
   }
);

/**
 * @param {string} dir Путь до директории с тестами
 * @returns {string[]} Список путей до *.test.js unit-тестов
 */
function getTestsDep(dir) {
   return fs.readdirSync(dir).reduce((paths, item) => {
      const itemPath = `${dir}/${item}`;
      if (!fs.statSync(itemPath).isFile() || !item.includes('.test.js')) {
         return paths;
      }
      return [...paths, item];
   }, []);
}

/** Возвращает словарь путей до модулей в переданной директории { <имя_модуля>: <абс.путь> } */
function getModulesPaths(dirPath) {
   return fs.readdirSync(dirPath).reduce((paths, module_name) => {
      paths[module_name] = path.resolve(dirPath, module_name);
      return paths;
   }, Object.create(null));
}

/** Линк словаря путей модулей в указанную директорию  */
function linkModules(paths, targetDir) {
   Object.keys(paths).forEach((module_name) => {
      const target = path.resolve(targetDir, module_name);
      if (fs.existsSync(target)) {
         return;
      }
      if (fs.lstatSync(paths[module_name]).isDirectory()) {
         fs.symlinkSync(paths[module_name], target, 'dir');
      } else {
         fs.symlinkSync(paths[module_name], target, 'file');
      }
   });
}
