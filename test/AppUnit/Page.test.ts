import { assert } from 'chai';
import { Head, addPrefetchModules, addPreloadModules } from 'Application/Page';

const modules = [
    'Module/File.js'
];
describe('Application/Page functions', () => {
    beforeEach(() => {
        Head.getInstance()._rawElements = {};
    });

    it('addPrefetchModules', () => {
        addPrefetchModules(modules);
        const data = Head.getInstance().getData();
        assert.equal(data.length, 1);
        assert.equal(data[0][0], 'link');
        assert.equal(data[0][1].rel, 'prefetch');
        assert.equal(data[0][1].href, modules[0]);
    });

    it('addPreloadModules', () => {
        addPreloadModules(modules);
        const data = Head.getInstance().getData();
        assert.equal(data.length, 1);
        assert.equal(data[0][0], 'link');
        assert.equal(data[0][1].rel, 'preload');
        assert.equal(data[0][1].href, modules[0]);
    });
});
