import { assert } from 'chai';
import { create } from 'Application/_Page/_head/Factory';
import { default as ElementPS } from 'Application/_Page/_head/ElementPS';
import type { IPageTagAttrs } from 'Application/Page';

const ALL_KEYS_ELEMENT = ['_name', '_attrs', '_content', '_eventHandlers'];
const KEY_TITLE = ['_content'];
const TITLE_PROPS = {
    _name: 'title',
    _attrs: {},
    _content: 'title_content',
};
const EVENT_HANDLER = {
    load: () => {
        return 'load';
    },
};
const SCRIPT_PROPS = {
    _name: 'script',
    _attrs: { src: 'to/the/great/lands' },
    _content: 'script_content',
};
const LINK_PROPS = {
    _name: 'link',
    _attrs: { href: 'to/the/great/lands' },
    _content: 'link_content',
};

/**
 * У классов Element, ElementPS есть особенность, что если у данных классов поле _name является 'title',
 * в таком случае методы могут работать по-особенному.
 * Поэтому иногда необходимо тестировать элемент для общего случая и отдельно для элемента title.
 */
describe('Application/_Page/_head/ElementPS', () => {
    describe('server side', () => {
        it('Создается ElementPS', () => {
            const element = create(
                'title',
                TITLE_PROPS._attrs,
                TITLE_PROPS._content,
                EVENT_HANDLER
            );
            assert.isDefined(element, 'ElementPS не создался: ElementPS is not defined');
            assert.deepInclude(
                element,
                TITLE_PROPS,
                'Все или некоторые свойства ElementPS (_name, _attrs, _content) не совпадают с образцом'
            );
            assert.isDefined(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                element._eventHandlers,
                'Свойство _eventHandlers не определено'
            );
        });
        it('Возврат данных ElementPS в формате JML', () => {
            const element = create('title', TITLE_PROPS._attrs, TITLE_PROPS._content);
            assert.deepEqual(
                element.getData(),
                ['title', TITLE_PROPS._content],
                'данные формата JML класса ElementPS вернулись не должным образом'
            );
        });
        it('Удаление свойств из элемента', () => {
            const script = create(
                'script',
                SCRIPT_PROPS._attrs,
                SCRIPT_PROPS._content,
                EVENT_HANDLER
            );
            script.clear();
            assert.doesNotHaveAnyKeys(
                script,
                ALL_KEYS_ELEMENT,
                'в элементе script не были удалены свойства полностью'
            );
        });
        it('Удаление свойств из элемента title', () => {
            const title = create('title', {}, TITLE_PROPS._content);
            title.clear();
            assert.doesNotHaveAnyKeys(title, KEY_TITLE, 'в элементе title не был удалён content');
        });
        it('Проверяет одинаковый ли элемент', () => {
            const MSG_PART1 = 'Проверка на идентичность свойств прошла неудачно. ';
            assert.isTrue(
                create('link', {}).isEqual('link', {}),
                `${MSG_PART1} \n Проверялись свойства: _name, и пустой _attrs');`
            );
            assert.isTrue(
                create('link', LINK_PROPS._attrs).isEqual('link', LINK_PROPS._attrs),
                `${MSG_PART1} \n Проверялись свойства: _name, _attrs (одно поле в attrs входит в группу приоритетных аттрибутов).
                \n Ошибка вероятнее всего в _attrs`
            );
            assert.isTrue(
                create('link', {
                    ...LINK_PROPS._attrs,
                    class: 'link-class',
                }).isEqual('link', {
                    ...LINK_PROPS._attrs,
                    class: 'link-class',
                }),
                `${MSG_PART1} \n  Проверялись свойства: _name, _attrs (два поля attrs: одно входит в группу приоритетных аттрибутов, другое нет).
                \n Ошибка вероятнее всего в _attrs `
            );
            assert.isTrue(
                create(
                    'link',
                    { ...LINK_PROPS._attrs, class: 'link-class' },
                    LINK_PROPS._content
                ).isEqual(
                    'link',
                    { ...LINK_PROPS._attrs, class: 'link-class' },
                    LINK_PROPS._content
                ),
                `${MSG_PART1} \n Проверялись свойства: _name, _content, _attrs (два поля attrs: одно входит в группу приоритетных аттрибутов, другое нет).
                \n Ошибка вероятнее всего в _content`
            );
        });
        it('Проверяет подходит ли этот элемент под описание', () => {
            const element = create('link', LINK_PROPS._attrs);
            assert.isFalse(
                element.isFit('script'),
                'Проверка на соответствие описания имени не сработала'
            );
            assert.isFalse(
                element.isFit('link', { href: 'to/the/neverlands' }),
                'Проверка на соответствие описания аттрибута не сработала'
            );
            assert.isTrue(
                element.isFit('link', LINK_PROPS._attrs),
                'Общая проверка на соответствие описания не сработала'
            );
        });
        it('Проверяет title ли этот элемент', () => {
            assert.equal(create('title', {}, TITLE_PROPS._content).getUniqueKey(), 'Title');
        });
        it('Генерирует данные в формате JML', () => {
            const tag = ElementPS.generateTag({
                name: 'title',
                attrs: TITLE_PROPS._attrs,
                content: TITLE_PROPS._content,
            });
            assert.deepEqual(tag, ['title', TITLE_PROPS._content]);
        });
        it('Взять атрибуты тега на сервере', () => {
            const script = create(
                'script',
                SCRIPT_PROPS._attrs,
                SCRIPT_PROPS._content,
                EVENT_HANDLER
            );
            assert.deepEqual(SCRIPT_PROPS._attrs as IPageTagAttrs, script.getAttrs());
        });
        it('Изменение атрибутов тега на сервере', () => {
            const script = create(
                'script',
                SCRIPT_PROPS._attrs,
                SCRIPT_PROPS._content,
                EVENT_HANDLER
            );
            const newAttrs = {
                content: 'width=100',
                foo: 'BarProp',
            };
            script.changeTag(newAttrs);
            assert.deepEqual(script.getAttrs(), newAttrs);
            script.changeTag({});
            assert.deepEqual(script.getAttrs(), {});
        });
    });
});
