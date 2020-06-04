import { parseQueryGet, parseQueryHash, extractParams, extractQuery } from 'Application/_Env/QueryParams';
import { assert } from 'chai';

describe('Application/_Env/QueryParams', function () {

    describe('extractParams', function () {
        const params = {
            '': {},
            'p=v': { p: 'v' },
            'p1=v1&p2=v2': { p1: 'v1', p2: 'v2' }
        };
        Object.keys(params).forEach((param_string) => {
            it(param_string, function () {
                assert.deepEqual(extractParams(param_string),params[param_string]);
            });
        });
    });

    describe('extractQuery', function () {
        const get_params = {
            '': {},
            'g1=v1': { g1: 'v1' },
            'g1=v1&g2=v2': { g1: 'v1', g2: 'v2' },
        }
        const hash_params = {
            '': {},
            'h1=v1': { h1: 'v1' },
            'h1=v1&h2=v2': { h1: 'v1', h2: 'v2' },
        }
        Object.keys(get_params).forEach((get_param) => {
            const hash_sep = '#';
            const get_sep = '?';
            Object.keys(hash_params).forEach((hash_param) => {
                const g1 = `${get_sep}${get_param}${hash_sep}${hash_param}`;
                const g2 = `${hash_sep}${hash_param}${get_sep}${get_param}`;

                test(g1);
                test(g2);

                function test(query) {
                    it(`${query} GET параметры извлечены`, function () {
                        assert.deepEqual(extractQuery(query, get_sep), get_params[get_param]);
                    });
                    it(`${query} HASH параметры извлечены`, function () {
                        assert.deepEqual(extractQuery(query, hash_sep), hash_params[hash_param]);
                    });
                }
            });
        });
    });

    describe('parseQueryGet / parseQueryHash', function () {
        const queries = {
            'http://example.com/over/there?name=ferret': {
                get: { name: 'ferret' },
                hash: {}
            },
            '?field1=value1&field2=value2&field3=value3': {
                get: {
                    field1: 'value1',
                    field2: 'value2',
                    field3: 'value3'
                },
                hash: {}
            },
            'http://example.com/path#name=leha&age=2?name=ferret&color=purple': {
                get: { name: 'ferret', color: 'purple' },
                hash: { name: 'leha', age: '2' }
            }
        };
        Object.keys(queries).forEach((query) => {
            it(`${query} GET параметры извлечены`, function () {
                assert.deepEqual(parseQueryGet(query), queries[query].get);
            });
            it(`${query} HASH параметры извлечены`, function () {
                assert.deepEqual(parseQueryHash(query), queries[query].hash);
            });
        })
    })
});
