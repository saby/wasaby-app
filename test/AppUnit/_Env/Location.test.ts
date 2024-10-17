/**
 * @jest-environment jsdom
 */
import { location } from 'Application/Env';

describe('location', function () {
    Object.keys(location).forEach((prop) => {
        test(prop, function () {
            if (typeof location[prop] === 'function') {
                expect(typeof location[prop]).toEqual(typeof window.location[prop]);
            } else {
                expect(location[prop]).toEqual(window.location[prop]);
            }
        });
    });

    test('set hash', () => {
        location.hash = 'test';
        expect(window.location.hash).toStrictEqual('#test');
    });
});
