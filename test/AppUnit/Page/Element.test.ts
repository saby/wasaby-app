import { assert } from 'chai';
import { default as ElementPS } from 'Application/_Page/_head/ElementPS';
import { default as Element } from 'Application/_Page/_head/Element';

const ALL_KEYS_ELEMENT = ['_name', '_attrs', '_content', '_eventHandlers'];
const KEY_TITLE = ['_content'];
const TITLE_PROPS = {
    _name: 'title',
    _attrs: {class: 'title-class'},
    _content: 'title_content'
};
const META_PROPS = {
    _name: 'meta',
    _attrs: {name: 'meta_name'},
    _content: 'meta_content'
};
const SCRIPT_PROPS = {
    _name: 'script',
    _attrs: {src: 'to/the/great/lands'},
    _content: 'script_content'
};
const LINK_PROPS = {
    _name: 'link',
    _attrs: {href: 'to/the/great/lands'},
    _content: 'link_content'
};
const EVENT_HANDLER = {load: () => {return 'load';}};

const additionalAttrs = {
    'data-vdomignore': true
};

//TODO: найдена ошибка в Element. создать отдельный коммит

/**
 * У классов Element, ElementPS есть особенность, что если у данных классов поле _name является 'title',
 * в таком случае методы могут работать по-особенному.
 * Поэтому иногда необходимо тестировать элемент для общего случая и отдельно для элемента title.
 */

/** В тестах на клиенте, в которых производится поиск элемента через querySelector,
 *  в данном случае для более прозрачных результатов, необходимо указывать уникальные свойства,
 *  по которым необходимо проводить поиск
 */
describe('Application/_Page/_head/ElementPS', () => {
    if(typeof(window) !== 'undefined') {
        describe('client side', () => {
            it('Проверяется создан/отрисовался ли title в DOM дереве', () => {
                const title = new Element('title', TITLE_PROPS._attrs, 'title_content_unique10', EVENT_HANDLER);
                assert.deepInclude(title, {...TITLE_PROPS, _content: 'title_content_unique10'},
                    'Все или некоторые свойства ElementPS (_name, _attrs, _content) не совпадают с образцом');
                assert.isDefined(title._eventHandlers,
                    'Свойство _eventHandlers не определено');
                assert.isTrue(document.querySelector('title').textContent === 'title_content_unique10',
                    'title в DOM дереве не был изменен');
            });
            it('Проверяется создан/отрисовался ли элемент в DOM дереве', () => {
                const meta = new Element('meta', {name: 'meta_name_unique10'}, META_PROPS._content, EVENT_HANDLER);
                assert.deepInclude(meta, {...META_PROPS, _attrs: {name: 'meta_name_unique10'}},
                    'Все или некоторые свойства ElementPS (_name, _attrs, _content) не совпадают с образцом');
                assert.isDefined(meta._eventHandlers,
                    'Свойство _eventHandlers не определено');
                assert.isNotNull(document.querySelector("meta[name='meta_name_unique10']"),
                    'Элемент не создан в DOM дереве');
            });
            it('Проверка одинаковый ли title', () => {
                assert.isTrue(new Element('title', {}, TITLE_PROPS._content).isEqual('title', {}, TITLE_PROPS._content),
                    'Элемент title не прошёл проверку на идентичность');
            });
            it('Проверка одинаковый ли element', () => {
                assert.isTrue(new Element('meta', META_PROPS._attrs, META_PROPS._content)
                        .isEqual('meta', META_PROPS._attrs, META_PROPS._content),
                    'Элемент не прошёл проверку на идентичность');
            });
            it('Проверяется удалился ли title в DOM дереве', () => {
                const title = new Element('title', {}, TITLE_PROPS._content);
                title.clear();
                assert.doesNotHaveAnyKeys(title, KEY_TITLE,
                    'В элементе title не был удалён content');
                assert.notExists(title._element,
                    'В элементе "title" сохраняется свойство _element');
            });
            it('Проверяется удалился ли элемент в DOM дереве', () => {
                const meta = new Element('meta', {name: 'meta_name_unique20'}, META_PROPS._content, EVENT_HANDLER);
                meta.clear();
                assert.doesNotHaveAnyKeys(meta, ALL_KEYS_ELEMENT,
                    'В тестируемом элементе не были удалены свойства');
                assert.isNull(document.querySelector("meta[name='meta_name_unique20']"),
                    'Тестируемый элемент не был удален из DOM дерева');
            });
        });
    }
    else {
        describe('server side', () => {
            it('Создается ElementPS', () => {
                const element = new ElementPS('title', TITLE_PROPS._attrs, TITLE_PROPS._content, EVENT_HANDLER);
                assert.isDefined(element,
                    'ElementPS не создался: ElementPS is not defined');
                assert.deepInclude(element, TITLE_PROPS,
                    'Все или некоторые свойства ElementPS (_name, _attrs, _content) не совпадают с образцом');
                assert.isDefined(element._eventHandlers,
                    'Свойство _eventHandlers не определено');
            });
            it('Возврат данных ElementPS в формате JML', () => {
                const element = new ElementPS('title', TITLE_PROPS._attrs, TITLE_PROPS._content);
                assert.deepEqual(element.getData(),
                    ['title', {...TITLE_PROPS._attrs, ...additionalAttrs}, TITLE_PROPS._content],
                    'данные формата JML класса ElementPS вернулись не должным образом');
            });
            it('Удаление свойств из элемента', () => {
                const script = new ElementPS('script', SCRIPT_PROPS._attrs, SCRIPT_PROPS._content, EVENT_HANDLER);
                script.clear();
                assert.doesNotHaveAnyKeys(script, ALL_KEYS_ELEMENT,
                    'в элементе script не были удалены свойства полностью');
            });
            it('Удаление свойств из элемента title', () => {
                const title = new ElementPS('title', {}, TITLE_PROPS._content);
                title.clear();
                assert.doesNotHaveAnyKeys(title, KEY_TITLE,
                    'в элементе title не был удалён content');
            });
            it('Проверяет одинаковый ли элемент', () => {
                const MSG_PART1 = 'Проверка на идентичность свойств прошла неудачно. ';
                assert.isTrue(new ElementPS('link', {})
                        .isEqual('link', {}),
                    `${MSG_PART1} \n Проверялись свойства: _name, и пустой _attrs');`);
                assert.isTrue(new ElementPS('link', LINK_PROPS._attrs)
                        .isEqual('link', LINK_PROPS._attrs),
                    `${MSG_PART1} \n Проверялись свойства: _name, _attrs (одно поле в attrs входит в группу приоритетных аттрибутов).
                    \n Ошибка вероятнее всего в _attrs`);
                assert.isTrue(new ElementPS('link', {...LINK_PROPS._attrs, class: 'link-class'})
                        .isEqual('link', {...LINK_PROPS._attrs, class: 'link-class'}),
                    `${MSG_PART1} \n  Проверялись свойства: _name, _attrs (два поля attrs: одно входит в группу приоритетных аттрибутов, другое нет).
                    \n Ошибка вероятнее всего в _attrs `);
                assert.isTrue(new ElementPS('link', {...LINK_PROPS._attrs, class: 'link-class'}, LINK_PROPS._content)
                        .isEqual('link', {...LINK_PROPS._attrs, class: 'link-class'}, LINK_PROPS._content),
                    `${MSG_PART1} \n Проверялись свойства: _name, _content, _attrs (два поля attrs: одно входит в группу приоритетных аттрибутов, другое нет).
                    \n Ошибка вероятнее всего в _content` );
            });
            it('Проверяет подходит ли этот элемент под описание', () => {
                const element = new ElementPS('link', LINK_PROPS._attrs);
                assert.isFalse(element.isFit('script'), 'Проверка на соответствие описания имени не сработала');
                assert.isFalse(element.isFit('link', {href: 'to/the/neverlands'}), 'Проверка на соответствие описания аттрибута не сработала');
                assert.isTrue(element.isFit('link', LINK_PROPS._attrs), 'Общая проверка на соответствие описания не сработала');
            });
            it('Проверяет title ли этот элемент', () => {
                assert.isTrue(new ElementPS('title', {}, TITLE_PROPS._content)._isTitle());
            });
            it('Генерирует данные в формате JML', () => {
                assert.deepEqual(ElementPS.generateTag(
                    {name: 'title', attrs: TITLE_PROPS._attrs, content: TITLE_PROPS._content}),
                    ['title', {...TITLE_PROPS._attrs, ...additionalAttrs}, TITLE_PROPS._content]);
            });
        });
    }
});
