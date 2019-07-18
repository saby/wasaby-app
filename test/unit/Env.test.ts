import { cookie as AppCookie, location, logger } from 'Application/Env';
import { default as AppInit } from 'Application/Initializer';
// import { assert } from 'chai';
// useless comment
describe('Application/Env', () => {
    if (typeof window === typeof void 0) { return; }
    AppInit();

    describe('location', () => {
        Object.keys(location).forEach((prop) => {
            it(prop, () => { assert.strictEqual(location[prop], document.location[prop]); })
        })
    });

    describe('cookie', () => {

        it('get', () => {
            const key = getRandomString();
            const val = getRandomString();
            document.cookie = `${key}=${val}`;
            assert.strictEqual(AppCookie.get(key), val);
        });

        it('set', () => {
            const key = getRandomString();
            const val = getRandomString();
            AppCookie.set(key, val);
            assert.strictEqual(findCookie(key), val);
        })

        it('remove', () => {
            const key = getRandomString();
            const val = getRandomString();
            AppCookie.set(key, val);
            AppCookie.remove(key);
            assert.isNull(findCookie(key));
        });

        it('getKeys', () => {
            const keys = Array.from({ length: 10 }, getRandomString);
            keys.forEach((k) => AppCookie.set(k, k));
            assert.sameMembers(AppCookie.getKeys(), keys);
        });

        it('toObject', () => {
            const cookies = {};
            for (let i = 0; i < 10; i++) {
                const key = getRandomString();
                AppCookie.set(key, i);
                cookies[key] = `${i}`;
            }
            assert.deepEqual(AppCookie.toObject(), cookies);
        });

        afterEach(() => {
            AppCookie.getKeys().forEach(AppCookie.remove);
        });

        function findCookie(cookieName: string): string {
            const _c = document.cookie.split('; ').find((c) => c.startsWith(cookieName));
            if (!_c) { return null; }
            return _c.split('=').pop();
        }
    });

    describe('logger', () => {
        const mock = {
            lastCall: {},
            getLogMethod(method) {
                return (...args) => { this.lastCall = { [method]: args } }
            }
        }
        const trueConsole = console;

        console = new Proxy(console, {
            get(target, prop) {
                return mock.getLogMethod(prop);
            }
        });

        ['info', 'log', 'warn', 'error'].forEach((method) => {
            it(method, () => {
                const logArgs = Array.from({ length: 3 }, getRandomString);
                logger[method](...logArgs);
                assert.sameMembers(mock.lastCall[method], logArgs);
            })
        });

        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach((logLevel) => {
            it(`setLogLevel ${logLevel}`, () => {
                logger.setLogLevel(logLevel);
                assert.strictEqual(logger.getLogLevel(), logLevel);
            });
        });

        after(() => console = trueConsole);
    })
});

function getRandomString() {
    return Math.random().toString(36).substr(2, 6);
}