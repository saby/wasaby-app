import { getStore, setStore } from 'Application/Env';
import { default as AppInit } from 'Application/Initializer';
import { default as Store } from 'Application/_Request/Store';
import { assert } from 'chai';

describe('Хранилища — Store', function () {

    if (typeof window === typeof void 0) { return; }

    describe('Application/Env setStore/getStore', function () {
        AppInit();

        it('getStore возвращает Store', function () {
            const STORE_NAME = 'Test store';
            setStore(STORE_NAME, new Store(sessionStorage));
            assert.instanceOf(getStore(STORE_NAME), Store);
        })
    })
})