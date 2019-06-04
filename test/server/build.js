const path = require('path');
const fs = require('fs');

// Создаем папку с модулями из исходников
const srcFolder = path.join(__dirname, '../../src');
const srcUnitFolder = path.resolve(__dirname, '../../test/unit');
const standSrcFolder = path.join(__dirname, 'src');
const standUnitFolder = path.resolve(__dirname, 'unit');

if (!fs.existsSync(srcFolder)) {
    console.error('Folder is not exists!', srcFolder);
    return;
}

if (fs.existsSync(standSrcFolder)) {
    console.error(`Folder ${standSrcFolder} is exists already. You should npm run test:clean if tests is not running correct.`)
    return;
}

fs.symlinkSync(srcFolder, standSrcFolder, 'dir');
fs.symlinkSync(srcUnitFolder, standUnitFolder, 'dir');


const standUnitPaths = getTestsDep(srcUnitFolder).map((p) => `unit/${p}`);

fs.writeFile(path.join(__dirname, '_settings.js'),
    `if (!chai) var chai = require('chai');
    var assert = chai.assert;
    var unitTests = ${ JSON.stringify(standUnitPaths)};
    if (typeof module !== 'undefined') module.exports = unitTests;`, (e) => e && console.error(e));


/**
 * @param {string} dir Путь до директории с тестами
 * @returns {string[]} Список путей до *.test.js unit-тестов
 */
function getTestsDep(dir) {
    return fs.readdirSync(dir).reduce((paths, item) => {
        const itemPath = `${dir}/${item}`;
        if (!fs.statSync(itemPath).isFile() || !item.includes('.test.js')) { return paths; }
        return [...paths, item];
    }, []);
}