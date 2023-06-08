/**
 * @jest-environment jsdom
 */
import { assert } from 'chai';
import { cookie as AppCookie, location, logger, query } from 'Application/Env';

describe('Application/Env', function () {
    describe('query', function () {
        // отключены, webdriver падает т.к не может найти элемент #report
        // it('query - GET параметры', function () {
        //     const get_params = {
        //         g1: 'v1',
        //         g2: 'v2'
        //     };
        //     setParams('?', get_params);
        //     assert.deepOwnInclude(location.query.get, get_params);
        // });

        it('HASH параметры', function () {
            const hashParams = {
                h1: 'v3',
                h2: 'v4',
            };
            setParams('#', hashParams);
            assert.deepOwnInclude(query.hash, hashParams);
        });
    });

    describe('location', function () {
        Object.keys(location).forEach((prop) => {
            it(prop, function () {
                if (typeof location[prop] === 'function') {
                    assert.equal(
                        typeof location[prop],
                        typeof window.location[prop]
                    );
                } else {
                    assert.deepEqual(location[prop], window.location[prop]);
                }
            });
        });
    });

    describe('cookie', function () {
        it('get', function () {
            const key = getRandomString();
            const val = getRandomString();
            document.cookie = `${key}=${val}`;
            assert.strictEqual(AppCookie.get(key), val);
        });

        it('set', function () {
            const key = getRandomString();
            const val = getRandomString();
            AppCookie.set(key, val);
            assert.strictEqual(findCookie(key), val);
        });

        it('remove', function () {
            const key = getRandomString();
            const val = getRandomString();
            AppCookie.set(key, val);
            AppCookie.remove(key);
            assert.isNull(findCookie(key));
        });

        it('getKeys', function () {
            const keys = Array.from({ length: 10 }, getRandomString);
            keys.forEach((k) => {
                return AppCookie.set(k, k);
            });
            assert.sameMembers(AppCookie.getKeys(), keys);
        });

        it('toObject', function () {
            const cookies = {};
            for (let i = 0; i < 10; i++) {
                const key = getRandomString();
                AppCookie.set(key, i.toString());
                cookies[key] = `${i}`;
            }
            assert.deepEqual(AppCookie.toObject(), cookies);
        });

        afterEach(function () {
            AppCookie.getKeys().forEach(AppCookie.remove);
        });

        function findCookie(cookieName: string): string {
            const _c = document.cookie.split('; ').find((c) => {
                return c.startsWith(cookieName);
            });
            if (!_c) {
                return null;
            }
            return _c.split('=').pop();
        }
    });

    describe('logger', function () {
        if (typeof Proxy === 'undefined') {
            return;
        }

        const mock = {
            lastCall: {},
            getLogMethod(method) {
                return (...args) => {
                    this.lastCall = { [method]: args };
                };
            },
        };
        const trueConsole = console;

        console = new Proxy(console, {
            get(target, prop) {
                return mock.getLogMethod(prop);
            },
        });

        ['info', 'log', 'warn', 'error'].forEach((method) => {
            it(method, function () {
                const logArgs = Array.from({ length: 3 }, getRandomString);
                logger[method](...logArgs);
                assert.sameMembers(mock.lastCall[method], logArgs);
            });
        });

        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach((logLevel) => {
            it(`setLogLevel ${logLevel}`, function () {
                logger.setLogLevel(logLevel);
                assert.strictEqual(logger.getLogLevel(), logLevel);
            });
        });

        after(() => {
            return (console = trueConsole);
        });
    });
});

function getRandomString() {
    return Math.random().toString(36).substr(2, 6);
}

function setParams(initChar, params) {
    const paramsKeys = Object.keys(params);
    if (
        paramsKeys.some((param) => {
            return window.location.href.includes(param);
        })
    ) {
        return;
    }
    const init = !window.location.href.includes(initChar) ? initChar : '';
    const query = paramsKeys.reduce((query, param) => {
        return query + `&${param}=${params[param]}`;
    }, init);
    window.location.href += query;
}
