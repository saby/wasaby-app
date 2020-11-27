import { assert } from 'chai';
import { default as ElementPS } from 'Application/_Page/_head/ElementPS';
import { default as Element } from 'Application/_Page/_head/Element';

const additionalAttrs = {
    'data-vdomignore': true
};

// найдена ошибка в Element


describe('Application/_Page/_head/ElementPS', () => {
    if(typeof(window) !== 'undefined') {
        describe('client side', () => {
            it('Проверяется создан/отрисовался ли элемент в DOM дереве', () => {
                new Element('title', {}, 'perfect_content1');
                assert.isTrue(document.querySelector('title').textContent === 'perfect_content1',
                    'title не создан в DOM дереве');
                new Element('meta', {name: 'meta_name1'});
                assert.isNotNull(document.querySelector("meta[name='meta_name1']"),
                    'элемент не создан в DOM дереве');
            });
            it('Проверка одинаковый ли title', () => {
                assert.isTrue(new Element('title', {}, 'perfect_content2').isEqual('title', {}, 'perfect_content2'),
                    'элемент title не прошёл проверку на идентичность');
            });
            it('Проверяется удалился ли элемент в DOM дереве', () => {
                new Element('meta', {name: 'meta_name2'})._removeElement();
                assert.isNull(document.querySelector("meta[name='meta_name2']"),
                    'тестируемый элемент "script" не удалился из DOM');
                const title = new Element('title', {}, 'perfect_content3');
                title._removeElement();
                assert.notExists(title._element, 'в тестируемом элементе "title" сохраняется свойство _element');
            });
        });
    }
    else {
        describe('server side', () => {
            it('Создается ElementPS', () => {
                const element = new ElementPS('title', {class: 'testing-class-elementPS'});
                assert.isDefined(element,
                    'ElementPS не создался: ElementPS is not defined');
                assert.isTrue(element instanceof ElementPS ,
                    'Новосозданный элемент не соответствует классу, к которому он принадлежит (ElementPS)' );
            });
            it('Возврат данных Element в формате JML', () => {
                const element = new ElementPS('title', {class: 'testing-class-elementPS'}, 'hello world!');
                assert.deepEqual(element.getData(),
                    ['title', {class: 'testing-class-elementPS', ...additionalAttrs}, 'hello world!']);
            });
            it('Удаление информации из свойств класса', () => {
                const title = new ElementPS('title', {}, 'perfect_content');
                title.clear();
                assert.doesNotHaveAnyKeys(title, { _content: 'perfect_content'}, 'в элементе title не был удалён content');
                const script = new ElementPS('script', {src: 'to/the/great/lands'}, 'perfect_content', {load: () => {return 'load';}});
                script.clear();
                assert.doesNotHaveAnyKeys(script,
                    { _name: 'script', _attrs: {src: 'to/the/great/lands'}, _content: 'perfect_content', _eventHandlers: {load: () => {return 'load';}}},
                    'в элементе script не были удалены свойства полностью');
            });
            it('Проверяет одинаковый ли элемент', () => {
                assert.isTrue(new ElementPS('link', {})
                        .isEqual('link', {}),
                    'Проверка на идентичность свойств прошла неудачно.' +
                    ' \n Проверялись свойства: _name, и пустой _attrs');

                assert.isTrue(new ElementPS('link', {href: 'to/the/great/lands'})
                        .isEqual('link', {href: 'to/the/great/lands'}),
                    'Проверка на идентичность свойств прошла неудачно. ' +
                    '\n  Проверялись свойства: _name, _attrs (одно поле в attrs входит в группу приоритетных аттрибутов). \n Ошибка вероятнее всего в _attrs');

                assert.isTrue(new ElementPS('link', {href: 'to/the/great/lands', class: 'perfect_class'})
                        .isEqual('link', {href: 'to/the/great/lands', class: 'perfect_class'}),
                    'Проверка на идентичность свойств прошла неудачно.' +
                    ' \n  Проверялись свойства: _name, _attrs (два поля attrs: одно входит в группу приоритетных аттрибутов, другое нет). \n Ошибка вероятнее всего в _attrs ');

                assert.isTrue(new ElementPS('link', {href: 'to/the/great/lands', class: 'perfect_class'}, 'perfect_content')
                        .isEqual('link', {href: 'to/the/great/lands', class: 'perfect_class'}, 'perfect_content'),
                    'Проверка на идентичность свойств прошла неудачно.' +
                    ' \n  Проверялись свойства: _name, _content, _attrs (два поля attrs: одно входит в группу приоритетных аттрибутов, другое нет). \n Ошибка вероятнее всего в _content' );
            });
            it('Проверяет подходит ли этот элемент под описание', () => {
                const element = new ElementPS('link', {href: 'to/the/great/lands'});
                assert.isFalse(element.isFit('script'), 'Проверка на соответствие описания имени не сработала');
                assert.isFalse(element.isFit('', {href: 'to/the/neverlands'}), 'Проверка на соответствие описания аттрибута не сработала');
            });

            it('Проверяет title ли этот элемент', () => {
                assert.isTrue(new ElementPS('title', {}, 'perfect_content')._isTitle());
            });

            it('Генерирует данные в формате JML', () => {
                assert.deepEqual(ElementPS.generateTag({name: 'title', attrs: {class: 'testing-class-elementPS'}, content: 'hello world!'}),
                    ['title', {class: 'testing-class-elementPS', ...additionalAttrs}, 'hello world!']);
            });
        });
    }
});
