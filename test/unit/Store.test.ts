import { getStore, setStore } from 'Application/Env';
import { default as AppInit } from 'Application/Initializer';
import { assert } from 'chai';

describe('Хранилища — Store', () => {

    if (typeof window === typeof void 0) { return; }

    describe('Store для хранения singletone', () => {
        const cache = {
            _val: {},
            get(k) {
                return this._val[k];
            },
            set(k, v) {
                try {
                    this._val[k] = v;
                    return true;
                } catch (_e) {
                    return false;
                }
            },
            remove(k) {
                delete this._val[k];
            },
            getKeys() {
                return Object.keys(this._val);
            },
            toObject() {
                return this._val;
            }
        };
        
        const STORE_NAME = 'Test store';

        AppInit();
        setStore(STORE_NAME, cache);
        
        const store = {
            read(key) {
                return getStore(STORE_NAME).get(key);
            },
            write(key, value) {
                return getStore(STORE_NAME).set(key, value);
            }
        }

        it('Чтение-запись значений в Store', (done) => {

            /** Список 10 рандомных значений */
            const values = Array.from({ length: 10 }, () => Math.random().toFixed(2));
            values.forEach((v, i) => store.write('key-' + i, v));
            
            setTimeout(() => {
                values.forEach((v, i) => {
                    assert.strictEqual(store.read('key-' + i), v, 'Значение в Store отличается от фактического');
                });
                done();
            }, 100);
        })
    })
})