/* eslint-disable no-console */
import Console from 'Application/_Env/NodeJS/Console';
import { assert } from 'chai';
import * as sinon from 'sinon';

describe('Application/_Env/NodeJS/Console', () => {
    let originalConsole;
    let nodeJSConsole;

    beforeEach(() => {
        originalConsole = console;
        // @ts-ignore
        console = {
            info: sinon.stub(),
            log: sinon.stub(),
            warn: sinon.stub(),
            error: sinon.stub(),
        };
        nodeJSConsole = new Console();
    });

    afterEach(() => {
        sinon.restore();
        if (originalConsole) {
            console = originalConsole;
        }
    });

    it('default level is llSTANDARD', () => {
        assert.strictEqual(nodeJSConsole.getLogLevel(), 2);
    });

    it('getLogLevel() returns set level', () => {
        nodeJSConsole.setLogLevel(1);
        assert.strictEqual(nodeJSConsole.getLogLevel(), 1);
    });

    it('info()', () => {
        nodeJSConsole.setLogLevel(1);
        nodeJSConsole.info('a', 'b');
        // @ts-ignore
        assert.isTrue(console.info.calledOnceWith('a', 'b'));
    });

    it('log()', () => {
        nodeJSConsole.setLogLevel(1);
        nodeJSConsole.log('a', 'b');
        // @ts-ignore
        assert.isTrue(console.log.calledOnceWith('a', 'b'));
    });

    it('warn()', () => {
        nodeJSConsole.warn('a', 'b');
        // @ts-ignore
        assert.isTrue(console.warn.calledOnceWith('a', 'b'));
    });

    it('error()', () => {
        nodeJSConsole.error('a', 'b');
        // @ts-ignore
        assert.isTrue(console.error.calledOnceWith('a', 'b'));
    });
});
