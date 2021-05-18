import { assert } from 'chai';
import { create } from 'Application/_Page/_head/Factory';
import type { IHeadTagAttrs } from 'Application/Page';

const ALL_KEYS_ELEMENT = ['_name', '_attrs', '_content', '_eventHandlers'];
const KEY_TITLE = ['_content'];
const TITLE_PROPS = {
    _name: 'title',
    _attrs: {},
    _content: 'title_content'
};
const META_PROPS = {
    _name: 'meta',
    _attrs: {name: 'meta_name'},
    _content: 'meta_content'
};
const EVENT_HANDLER = {load: () => {return 'load';}};


/**
 * У классов Element, ElementPS есть особенность, что если у данных классов поле _name является 'title',
 * в таком случае методы могут работать по-особенному.
 * Поэтому иногда необходимо тестировать элемент для общего случая и отдельно для элемента title.
 */

/** В тестах на клиенте, в которых производится поиск элемента через querySelector,
 *  в данном случае для более прозрачных результатов, необходимо указывать уникальные свойства,
 *  по которым необходимо проводить поиск
 */
describe('Application/_Page/_head/Element', () => {
    if(typeof(window) === 'undefined'){
        it('Если window undefined, то тесты для Element не проводятся', function(): void{
            this.skip();
        });
        return;
    }
    describe('client side', () => {
        it('Проверяется создан/отрисовался ли title в DOM дереве', () => {
            const titleContentUnique = 'title_content_unique10';
            const title = create('title', TITLE_PROPS._attrs, titleContentUnique, EVENT_HANDLER);
            assert.deepInclude(title, {...TITLE_PROPS, _content: titleContentUnique},
                'Все или некоторые свойства ElementPS (_name, _attrs, _content) не совпадают с образцом');
            // tslint:disable-next-line:ban-ts-ignore
            // @ts-ignore
            assert.isDefined(title._eventHandlers,
                'Свойство _eventHandlers не определено');
            assert.isTrue(document.querySelector('title').textContent === titleContentUnique,
                'title в DOM дереве не был изменен');
        });
        it('Проверяется создан/отрисовался ли элемент в DOM дереве', () => {
            const metaNameUnique = 'meta_name_unique10';
            const meta = create('meta', {name: metaNameUnique}, META_PROPS._content, EVENT_HANDLER);
            assert.deepInclude(meta, {...META_PROPS, _attrs: {name: metaNameUnique}},
                'Все или некоторые свойства ElementPS (_name, _attrs, _content) не совпадают с образцом');
            // tslint:disable-next-line:ban-ts-ignore
            // @ts-ignore
            assert.isDefined(meta._eventHandlers,
                'Свойство _eventHandlers не определено');
            assert.isNotNull(document.querySelector(`meta[name=${metaNameUnique}]`),
                'Элемент не создан в DOM дереве');
        });
        it('Проверка одинаковый ли title', () => {
            const title = create('title', {}, '');
            document.title = 'Foo';
            assert.isTrue(title.isEqual('title', {}, 'Foo'),'Элемент title не прошёл проверку на идентичность');
        });
        it('Проверка одинаковый ли element', () => {
            assert.isTrue(create('meta', META_PROPS._attrs, META_PROPS._content)
                    .isEqual('meta', META_PROPS._attrs, META_PROPS._content),
                'Элемент не прошёл проверку на идентичность');
        });
        it('Проверяется удалился ли title в DOM дереве', () => {
            const title = create('title', {}, TITLE_PROPS._content);
            title.clear();
            assert.doesNotHaveAnyKeys(title, KEY_TITLE,
                'В элементе title не был удалён content');
            // tslint:disable-next-line:ban-ts-ignore
            // @ts-ignore
            assert.notExists(title._element,
                'В элементе "title" сохраняется свойство _element');
            assert.isTrue(document.title && document.title === TITLE_PROPS._content, 'title пустой или содержит несоответствующий контент');
        });
        it('Проверяется удалился ли элемент в DOM дереве', () => {
            const metaNameUnique = 'meta_name_unique20';
            const meta = create('meta', {name: metaNameUnique}, META_PROPS._content, EVENT_HANDLER);
            meta.clear();
            assert.doesNotHaveAnyKeys(meta, ALL_KEYS_ELEMENT,
                'В тестируемом элементе не были удалены свойства');
            assert.isNull(document.querySelector(`meta[name=${metaNameUnique}]`),
                'Тестируемый элемент не был удален из DOM дерева');
        });
        it('Взять атрибуты тега на клиенте', () => {
            const meta = create('meta', META_PROPS._attrs, META_PROPS._content);
            assert.deepEqual(META_PROPS._attrs as IHeadTagAttrs, meta.getAttrs());
        });
        it('Изменение атрибутов тега на клиенте', () => {
            const meta = create('changeTag', META_PROPS._attrs, META_PROPS._content);
            const newAttrs = {
                name: 'meta_name_new',
                content: 'width=100',
                class: 'css_new',
                src: 'src.jpg'
            };
            meta.changeTag(newAttrs);
            assert.deepEqual(meta.getAttrs(), newAttrs);
            const doc = document.querySelector('changeTag').attributes;
            Object.getOwnPropertyNames(newAttrs).forEach((item) => {
                assert.deepEqual(doc[item].value, newAttrs[item]);
            });
        });
    });
});
