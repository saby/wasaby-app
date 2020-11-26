import { assert } from 'chai';
// import { JML, IHead, IHeadTagAttrs } from "Application/Interface";
// import { JML } from "Application/Interface";
import { default as ElementPS } from 'Application/_Page/_head/ElementPS';
import { default as Element } from 'Application/_Page/_head/Element';

const additionalAttrs = {
    'data-vdomignore': true
};


describe('Application/_Page/_head/ElementPS', () => {
    if(typeof(window) !== 'undefined') {
        describe('client side', () => {
            it('Проверка одинаковый ли элемент', () => {
                const newTitle = new Element('title', {}, 'perfect_content');
                const newEl = new Element('script', {src: 'to/the/great/lands', someKey: 'someValue'}, 'perfect_content');
                assert.isTrue(newTitle.isEqual('title', {}, 'perfect_content'), 'элемент title не одинаковый'); //TODO: заменить описание.
                // TODO: добавить проверку isFalse || isTrue для каждого свойства элемента
                assert.isTrue(newEl.isEqual('script', {src: 'to/the/great/lands', someKey: 'someValue'}, 'perfect_content'));
            });

        });
    }
    else {
        describe('server side', () => {
            it('Создается ElementPS', () => {
                assert.isDefined(new ElementPS('title', {class: 'testing-class-elementPS'}, 'hello world!'));
                //instanceOf
            });
            it('Возврат данных Element в формате JML', () => {
                const newElPS = new ElementPS('title', {class: 'testing-class-elementPS'}, 'hello world!');
                // const processingData = ['title', {class: 'testing-class-elementPS', ...additionalAttrs}, 'hello world!'];
                // assert.deepEqual(newElPS.getData(), processingData);
                //TODO: возможно тут не стоит использовать getData()
                assert.deepEqual(newElPS.getData(), ['title', {class: 'testing-class-elementPS', ...additionalAttrs}, 'hello world!']);
            });
            it('Удаление информации из свойств класса', () => {
                const newTitlePS = new ElementPS('title', {class: 'testing-class-elementPS'}, 'hello world!');
                newTitlePS.clear();
                // console.log(newTitlePS);
                // assert.doesNotHaveAllKeys(newTitlePS, ['_attrs'], "element with name 'title' has not have content"); //FIXME: я работаю неправильно
                const newScriptPS = new ElementPS('script', {src: 'to/the/great/lands'}, 'hello world!');
                newScriptPS.clear();
                // assert.doesNotHaveAllKeys(newTitlePS, ['_attrs', '_content', '_name', '_eventHandlers'], "element properties have not been removed completely"); //FIXME: я работаю неправильно
            });
            it('Проверяет одинаковый ли элемент', () => {
                const newElPS = new ElementPS('script', {src: 'to/the/great/lands', someKey: 'someValue'}, 'perfect_content');
                // TODO: добавить проверку  isFalse || isTrue для каждого свойства элемента
                assert.isTrue(newElPS.isEqual('script', {src: 'to/the/great/lands', someKey: 'someValue'}, 'perfect_content'));
            });
            it('Проверяет подходит ли этот элемент под описание', () => {
                //TODO: уточнить у Сергея.
            });

            it('Проверяет title ли этот элемент', () => {
                const newElPS = new ElementPS('title', {}, 'perfect_content');
                assert.isTrue(newElPS._isTitle());
            });
            it('Генерирует данные в формате JML', () => {
                //TODO: нужно ли проверять если данные генерируются уже и так в другом тесте.

            });
            //TODO: возможно стоит проверить пустые методы removeElement, render для ElementPS
        });
    }

});
