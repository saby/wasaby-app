/**
 * @jest-environment jsdom
 */
import { getStore, setStore } from 'Application/Env';
import { default as Store } from 'Application/_Request/Store';

describe('Хранилища — Store', function () {
    test('getStore возвращает Store', function () {
        const STORE_NAME = 'Test store';
        setStore(STORE_NAME, new Store(sessionStorage));
        expect(getStore(STORE_NAME)).toBeInstanceOf(Store);
    });
});
