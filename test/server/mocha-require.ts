import chai = require('chai');
import requirejs = require('requirejs');
import path = require('path');

function requireTests() {
    if (
        !process.argv.some((arg) => {
            return arg.includes('--test=');
        })
    ) {
        return;
    }

    // eslint-disable-next-line no-eval
    const global = (0, eval)('this');
    global.requirejs = requirejs;
    global.define = requirejs.define;
    global.assert = chai.assert;

    requirejs.config({ baseUrl: path.resolve(__dirname, 'server', 'src') });

    const singleTest = process.argv
        .find((arg) => {
            return arg.includes('--test=');
        })
        .substring('--test='.length);
    if (singleTest !== 'all') {
        return requirejs(singleTest);
    }
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const unitTests = require(`${__dirname}/server/_settings`);
    unitTests.forEach(requirejs);
}

requireTests();
