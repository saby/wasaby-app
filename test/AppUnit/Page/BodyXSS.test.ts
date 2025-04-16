/**
 * @jest-environment jsdom
 */
import { Body as BodyAPI, IBody } from 'Application/Page';

describe('Application/_Page/Body', () => {
    describe('attribute "class" - XSS', () => {
        const badClass = 'default\\" onload=\\"console.log(\'XSS\')\\"';

        // Тесты на остальной функционал не имеют смысла, поскольку структура классов может сломаться
        it('Добавление класса', () => {
            const API: IBody = BodyAPI.getInstance();
            const element = document.createElement('div');
            API.addClass(badClass);

            element.setAttribute('class', API.getClassString());

            expect(element.getAttribute('onLoad')).toBeNull();
        });
    });
});
