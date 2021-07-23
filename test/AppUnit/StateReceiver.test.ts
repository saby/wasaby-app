import { assert } from 'chai';
import { StateReceiver } from 'Application/State';

const someData = {
    getState: () => {
        return {d: ''};
    },
    setState: () => {}
};

describe('Application/State:StateReceiver', () => {
    describe('register', () => {
        it('string key', () => {
            const key = 'srKey';
            const sr = new StateReceiver();
            sr.register(key, someData);
            // @ts-ignore
            const receivedStateObjectsArray = sr.receivedStateObjectsArray;
            assert.hasAllKeys(receivedStateObjectsArray, [key]);
            assert.hasAllKeys(receivedStateObjectsArray[key], ['meta', 'data']);
            assert.hasAllKeys(receivedStateObjectsArray[key].meta, ['ulid']);
        });
        it('meta key', () => {
            const meta = {ulid: 'srKey', moduleName: 'MyModuleName'};
            const sr = new StateReceiver();
            sr.register(meta, someData);
            // @ts-ignore
            const receivedStateObjectsArray = sr.receivedStateObjectsArray;
            assert.hasAllKeys(receivedStateObjectsArray, [meta.ulid]);
            assert.hasAllKeys(receivedStateObjectsArray[meta.ulid], ['meta', 'data']);
            assert.hasAllKeys(receivedStateObjectsArray[meta.ulid].meta, ['ulid', 'moduleName']);
        });
    });
    it('unregister', () => {
        const key = 'srKey';
        const sr = new StateReceiver();
        sr.register(key, someData);
        sr.unregister(key);
        // @ts-ignore
        assert.doesNotHaveAllKeys(sr.receivedStateObjectsArray, [key]);
    });
    it('serialize', () => {
        const meta = {ulid: 'srKey', moduleName: 'MyModuleName'};
        const sr = new StateReceiver();
        sr.register(meta, someData);
        const serializedData = sr.serialize();
        // @ts-ignore
        assert.hasAllKeys(serializedData, ['serialized', 'additionalDeps']);
    });
    it('deserialize', () => {
        const meta = {ulid: 'srKey', moduleName: 'MyModuleName'};
        const sr = new StateReceiver();
        sr.register(meta, someData);
        const serializedData = sr.serialize();
        sr.deserialize(serializedData.serialized);
        // @ts-ignore
        assert.hasAllKeys(sr.deserialized, [meta.ulid]);
    });
    it('second serialize', () => {
        let hasError: boolean = false;
        const meta = {ulid: 'srKey', moduleName: 'MyModuleName'};
        const sr = new StateReceiver();
        sr.register(meta, someData);
        sr.serialize();

        try {
            sr.serialize();
        } catch (e) {
            hasError = true;
        }

        assert.isTrue(hasError, 'Повторный вызов метода serialize не вызвал ошибку');
    });
});
