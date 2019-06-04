import chai = require('chai');
import requirejs = require('requirejs');

function requireTests() {
    if (!process.argv.some((arg) => arg.includes('--test='))) { return; }

    const global = (0, eval)('this');
    global.requirejs = requirejs;
    global.define = requirejs.define;
    global.assert = chai.assert;

    requirejs.config({ baseUrl: `${__dirname}/server/src` });

    const singleTest = process.argv.find((arg) => arg.includes('--test=')).substring('--test='.length);
    if (singleTest !== 'all') { return requirejs(singleTest); }
    const unitTests = require(`${__dirname}/server/_settings`);
    unitTests.forEach(requirejs);
}

requireTests();