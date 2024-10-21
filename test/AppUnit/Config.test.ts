import { Config } from 'Application/Config';
import { assert } from 'chai';

const stringValue = 'StringValue';
const numValue = 42;
const boolValue = true;
const cfg = {
    KeyStr: stringValue,
    KeyNum: numValue,
    KeyBool: boolValue,
};
const config = new Config(cfg);

describe('Application/Config', function () {
    describe('get method', function () {
        it('string value', function () {
            assert.strictEqual(stringValue, config.get('KeyStr'), 'String value is broken');
        });
        it('number value', function () {
            assert.strictEqual(numValue, config.get('KeyNum'), 'Number value is broken');
        });
        it('boolean value', function () {
            assert.strictEqual(boolValue, config.get('KeyBool'), 'Boolean value is broken');
        });
        it('getState()', function () {
            assert.strictEqual(cfg, config.getState(), 'State is broken');
        });
    });
});
