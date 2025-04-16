/**
 * @jest-environment jsdom
 */
import { query, hash } from 'Application/Env';

describe('query', function () {
    test('HASH параметры', function () {
        const hashParams = {
            h1: 'v3',
            h2: 'v4',
        };
        window.location.hash = Object.entries(hashParams)
            .map((v) => `${v[0]}=${v[1]}`)
            .join('&');
        expect(query.hash).toEqual(hashParams);
    });

    describe('hash', () => {
        beforeEach(() => {
            window.location.hash = '';
        });

        test('get all', () => {
            window.location.hash = 'hash1=value1&hash2=value2';
            expect(hash.get()).toEqual({ hash1: 'value1', hash2: 'value2' });
        });

        test('get key', () => {
            window.location.hash = 'hash1=value1&hash2=value2';
            expect(hash.get('hash1')).toEqual('value1');
        });

        test('set', () => {
            hash.set('hash3', 'value3');
            expect(window.location.hash).toEqual('#hash3=value3');
            expect(hash.get()).toEqual({ hash3: 'value3' });
        });

        test('remove one', () => {
            window.location.hash = 'hash1=value1&hash2=value2';
            hash.remove('hash1');
            expect(window.location.hash).toEqual('#hash2=value2');
            expect(hash.get()).toEqual({ hash2: 'value2' });
        });

        test('remove few', () => {
            window.location.hash = 'hash1=value1&hash2=value2&hash3=value3';
            hash.remove(['hash1', 'hash3']);
            expect(window.location.hash).toEqual('#hash2=value2');
            expect(hash.get()).toEqual({ hash2: 'value2' });
        });
    });
});
