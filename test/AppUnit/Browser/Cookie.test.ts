import Cookie from 'Application/_Env/Browser/Cookie';
import { assert } from 'chai';

describe('Cookie', function () {


    describe('Env NodeJS', function () {
        if (typeof window !== "undefined") { return; }

        it('constructor выбрасывает исключение при попытке создать экземпляр в NodeJS окружении', () => {
            try {
                new Cookie();
                assert.fail('new Cookie() не выбрасывает исключение в NodeJS окружении');
            } catch (_) {
                assert(true, 'new Cookie() выбрасывает исключение в NodeJS окружении');
            }
        });
    });
});