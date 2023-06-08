import Cookie from 'Application/_Env/NodeJS/Cookie';
import { assert } from 'chai';
import * as sinon from 'sinon';

describe('Application/_Env/NodeJS/Cookie', () => {
    let req;
    let res;
    let instance: Cookie;
    let clock;

    function getRequest() {
        return req;
    }

    function getResponse() {
        return res;
    }

    function getExpires(dayDiff: number = -1) {
        return Date.now() + dayDiff * 86400000;
    }

    function assertDate(date, dayDiff?) {
        assert.strictEqual(date.getTime(), getExpires(dayDiff));
    }

    beforeEach(() => {
        req = {
            cookies: {},
        };
        res = {
            cookie: sinon.stub(),
        };
        clock = sinon.useFakeTimers(Date.now());
        instance = new Cookie(getRequest, getResponse);
    });

    afterEach(() => {
        sinon.restore();
        clock.restore();
    });

    describe('get()', () => {
        it('returns null if request has no cookies', () => {
            delete req.cookies;
            assert.isNull(instance.get('test'));
        });

        it('returns null if key is not in request.cookies', () => {
            assert.isNull(instance.get('test'));
        });

        it('returns value from request.cookies', () => {
            const key = 'test';
            const value = '42';
            req.cookies[key] = value;
            assert.strictEqual(instance.get(key), value);
        });
    });

    describe('set()', () => {
        function test(key, value, options, assertOptions) {
            assert.isTrue(instance.set(key, value, options), 'returns true');
            assert.isTrue(res.cookie.calledOnce, 'calls res.cookie()');
            const [resKey, resVal, resOpt] = res.cookie.getCall(0).args;
            assert.strictEqual(resKey, key, 'key');
            assert.strictEqual(resVal, value, 'value');
            assertOptions(resOpt);
        }

        it('returns false if response has no cookie()', () => {
            delete res.cookie;
            assert.isFalse(instance.set('', ''));
        });

        it('sets key, value and empty options', () => {
            test('test', '42', undefined, (opt) => {
                assert.deepEqual(opt, {});
            });
        });

        it('sets null value', () => {
            test('test', null, undefined, (opt) => {
                assertDate(opt.expires);
            });
        });

        it('sets null value with expires', () => {
            test('test', null, { expires: 10 }, (opt) => {
                assertDate(opt.expires);
            });
        });

        it('sets options and expires: number', () => {
            const options = {
                domain: 'test-domain',
                expires: 10,
                path: 'test-path',
                secure: 'test-source',
            };
            test('test', '42', options, (opt) => {
                assert.strictEqual(opt.domain, options.domain);
                assert.strictEqual(opt.path, options.path);
                assert.strictEqual(opt.secure, options.secure);
                assertDate(opt.expires, options.expires);
            });
        });

        it('sets options and expires: Date', () => {
            const expires = new Date();
            const options = {
                domain: 'test-domain',
                expires,
                path: 'test-path',
                secure: 'test-source',
            };
            test('test', '42', options, (opt) => {
                assert.strictEqual(opt.domain, options.domain);
                assert.strictEqual(opt.path, options.path);
                assert.strictEqual(opt.secure, options.secure);
                assert.strictEqual(opt.expires, options.expires);
            });
        });

        it('throws error if expires is not a number or a Date', () => {
            assert.throws(() => {
                // @ts-ignore
                return instance.set('test', '42', { expires: 'expires' });
            }, TypeError);
        });
    });

    describe('remove()', () => {
        it('sets null value with correct "expires"', () => {
            instance.remove('test');
            assert.isTrue(res.cookie.calledOnce, 'cookie() called');
            const [key, value, { expires }] = res.cookie.getCall(0).args;
            assert.strictEqual(key, 'test');
            assert.isNull(value);
            assert.instanceOf(expires, Date);
            assertDate(expires);
        });
    });

    describe('getKeys()', () => {
        it('returns empty array if request has no cookies', () => {
            delete req.cookies;
            const result = instance.getKeys();
            assert.isArray(result);
            assert.isEmpty(result);
        });

        it('returns cookie names', () => {
            req.cookies.a = '42';
            req.cookies.b = 'test';
            const result = instance.getKeys();
            assert.sameMembers(result, ['b', 'a']);
        });
    });

    describe('toObject()', () => {
        it('returns copy of request.cookies', () => {
            req.cookies.test = '42';
            assert.notStrictEqual(req.cookies, instance.toObject());
            assert.deepEqual(req.cookies, instance.toObject());
        });

        it('returns empty object without request.cookies', () => {
            delete req.cookies;
            assert.isEmpty(instance.toObject());
        });
    });
});
