import { assert } from 'chai';
import { Body as BodyAPI, IBody } from 'Application/Page';

describe('Application/_Page/Body', () => {
    describe('attribute "class"', () => {
        let classes = '';

        it('Инициализация стартовых значений', () => {
            const API: IBody = BodyAPI.getInstance();

            classes = API.getClassString();
            assert.isTrue(
                typeof classes === 'string',
                'Стартовый набор классов не является строкой.'
            );
        });

        it('Добавление класса', () => {
            const API: IBody = BodyAPI.getInstance();
            const classToAdd = 'fooTest1';
            const classesToAdd = ['barTest1', 'bazTest1', 'tizTest1'];

            API.addClass(classToAdd);
            classes = [classes, classToAdd].join(' ').trim();
            assert.equal(
                API.getClassString(),
                classes,
                'Добавление одного класса сработало неверно'
            );

            API.addClass.apply(API, classesToAdd);
            classes = [classes, classesToAdd.join(' ')].join(' ').trim();
            assert.equal(
                API.getClassString(),
                classes,
                'Добавление нескольких классов сработало неверно'
            );
        });

        it('Удаление класса', () => {
            const API: IBody = BodyAPI.getInstance();
            const classToCheck = 'fooTest2';
            const classesToCheck = ['barTest2', 'bazTest2', 'tizTest2'];

            API.addClass(classToCheck);
            API.addClass.apply(API, classesToCheck);

            API.removeClass(classToCheck);
            assert.equal(
                API.getClassString(),
                [classes, classesToCheck.join(' ')].join(' ').trim(),
                'Удаление одного класса сработало неверно'
            );

            API.removeClass.apply(API, classesToCheck);
            assert.equal(
                API.getClassString(),
                classes,
                'Удаление нескольких классов сработало неверно'
            );
        });

        it('Проверка наличия класса', () => {
            const API: IBody = BodyAPI.getInstance();
            const classToCheck = 'fooTest3';

            API.addClass(classToCheck);
            assert.isTrue(API.containsClass(classToCheck), 'Не нашлось искомого класса');

            API.removeClass(classToCheck);
            assert.isFalse(API.containsClass(classToCheck), 'Нашелся искомый класс после удаления');
        });

        it('Проверка переключателя классов', () => {
            const API: IBody = BodyAPI.getInstance();
            const classToCheck = 'fooTest4';

            API.toggleClass(classToCheck);
            assert.equal(
                API.getClassString(),
                [classes, classToCheck].join(' ').trim(),
                'Не нашлось искомого класса после добавления через toggle'
            );

            API.toggleClass(classToCheck, true);
            assert.equal(
                API.getClassString(),
                [classes, classToCheck].join(' ').trim(),
                'Появился дубль класса после toggle'
            );

            API.toggleClass(classToCheck);
            assert.equal(
                API.getClassString(),
                classes,
                'Нашелся искомый класс после удаления через toggle'
            );

            API.toggleClass(classToCheck, true);
            API.toggleClass(classToCheck, false);
            assert.equal(
                API.getClassString(),
                classes,
                'Нашелся искомый класс после принудительного удаления через toggle'
            );
        });
    });

    describe('attribute "dir"', () => {
        let dir = '';
        it('Инициализация стартовых значений', () => {
            const API: IBody = BodyAPI.getInstance();

            dir = API.getDir();
            assert.isTrue(
                typeof dir === 'string',
                'Аттрибут dir по умолчанию не является строкой.'
            );
        });

        it('Установка значения dir', () => {
            const API: IBody = BodyAPI.getInstance();

            API.setDir('ltr');
            assert.equal(API.getDir(), 'ltr', 'Значение dir некорректное');

            API.setDir('rtl');
            assert.equal(API.getDir(), 'rtl', 'Не установилось новое значение dir');
        });
    });
});
