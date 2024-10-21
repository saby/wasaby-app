import { assert } from 'chai';
import { Head as HeadAPI } from 'Application/Page';
import type { JML, IPageTagAPI } from 'Application/Page';

/*
 * processingData - массив - накопитель данных, который симулирует хранилище Head API.
 * Используется для сравнения c содержанием Head API
 */
let processingData: JML[] = [];
let countOfMeta: number = 0;
let API: IPageTagAPI;

describe('Application/_Page/Head', () => {
    before(() => {
        API = HeadAPI.getInstance();
    });

    after(() => {
        API.clear();
    });

    beforeEach(() => {
        API.clear();
        processingData = [];
    });

    it('Создание тега title', () => {
        const tag = 'title';
        const attrs = { name: 'this_attr_will_be_delete' };
        const content = 'foo';

        API.createTag(tag, attrs, content);
        // При получении данных от title тега из него удаляются все теги
        processingData.push([tag, content]);

        assert.deepEqual(API.getData(), processingData);
    });

    it('Создание тега meta с name=viewport', () => {
        const tag = 'meta';
        const attrs = { name: 'viewport', content: 'width=1024' };
        countOfMeta = countOfMeta + 1;

        API.createTag(tag, attrs);
        attrs.content = 'width=1920';
        API.createTag(tag, attrs);
        // При добавлении второго тега meta с описанием viewport она заменяет предыдущий
        processingData.push([tag, attrs]);
        assert.deepEqual(API.getData(), processingData);
    });

    it('Добавление тега в набор уже существующих тегов', () => {
        const tag = 'link';
        const attrs = {
            rel: 'preload',
            as: 'font',
            href: '//cdn.sbis.ru/cdn/TensorFont/1.0.3/TensorFont/TensorFont.woff2" type="font/woff2',
            crossorigin: 'crossorigin',
        };

        API.createTag(tag, attrs);
        processingData.push([tag, attrs]);
        assert.deepEqual(API.getData(), processingData);
    });

    it('Добавление noScript', () => {
        const url = 'noScript.html';

        API.createNoScript(url);
        processingData.unshift([
            'noscript',
            [
                'meta',
                {
                    'http-equiv': 'refresh',
                    content: `2; URL=${url}`,
                },
            ],
        ]);
        assert.deepEqual(API.getData(), processingData);
    });

    it('Добавление дубля ни к чему не приводит', () => {
        const tag = 'meta';
        const attrs = {
            type: 'test',
            content: 'width=1024',
        };
        countOfMeta = countOfMeta + 1;

        API.createTag(tag, attrs);
        processingData.push([tag, attrs]);
        assert.deepEqual(API.getData(), processingData);

        API.createTag(tag, attrs);
        assert.deepEqual(
            API.getData(),
            processingData,
            'После добавления дубля он появился в данных'
        );
    });

    describe('Теги, которые занимают определенное положение в финальном результате', () => {
        it('Создание тега с атрибутом important', () => {
            const tag = 'script';
            const attrs = { important: 'true' };

            API.createTag(tag, attrs);
            // Теги с атрибутом important должен возвр. сразу после открывающегося тега <head> (после noScript)
            processingData.splice(1, 0, [tag, attrs]);
            assert.deepEqual(
                API.getData(),
                processingData,
                'Тег с атр. important встал на недопустимое место'
            );
        });

        it('Получение тега для IE в нужном месте', () => {
            const tag = 'meta';
            const attrs = {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
            };

            API.createTag(tag, attrs);
            // Особый тег для IE должен возвр. сразу после открывающегося тега <head> (допустимо после noScript)
            processingData.splice(1, 0, [tag, attrs]);
            assert.deepEqual(
                API.getData(),
                processingData,
                'Особый тег для IE встал на недопустимое место'
            );
        });
    });

    it('Удаление тега', () => {
        // Добавим тег script, чтобы сразу же его удалить
        const tag = 'script';
        const attrs = {};

        const scriptId: string = API.createTag(tag, attrs);
        processingData.push([tag, attrs]);
        assert.deepEqual(API.getData(), processingData);

        API.deleteTag(scriptId);
        processingData.pop();
        assert.deepEqual(API.getData(), processingData, 'Тег script не удалился из набора данных');
    });

    it('Создание комментария', () => {
        const firstComment = 'Lorem ipsum dolor sit amet.';
        const secondComment = 'Ut enim ad minim veniam.';
        const wrapper = (str) => {
            return `<!--${str}-->`;
        };
        const processingResult = [];

        API.createComment(firstComment);
        processingResult.push(firstComment);
        assert.deepEqual(API.getComments(), processingResult);

        API.createComment(secondComment);
        processingResult.push(secondComment);
        assert.deepEqual(
            API.getComments(true),
            processingResult.map(wrapper),
            'Комментарии вернулись без обертки HTML комментария <!-- -->'
        );
    });

    it('Изменение атрибутов тега', () => {
        // Cоздаем теги
        const tagName = 'changeTag';
        const attrs = {
            content: 'width=100',
        };
        const tag = API.createTag(tagName, attrs);

        // Новые аттрибуты
        const changeAttrs = {
            content: 'width=1000; height=1000',
            foo: 'barChange',
        };

        // Может возникнуть такая ситуация, что аттрибутов много, а изменим одну строчку.
        const secondTagName = 'secondChangeTag';
        const secondAttrs = {
            content: 'width=1000; height=1000',
            foo: 'barChange',
        };
        const changeSecondAttrs = {
            content: 'width=3000',
            atr: '3000',
            xMode: 'y',
            c: 'w',
        };
        const secondTag = API.createTag(secondTagName, secondAttrs);

        // Меняем  данные
        API.changeTag(tag, changeAttrs);

        API.changeTag(secondTag, changeSecondAttrs);
        processingData.push([tagName, changeAttrs]);
        processingData.push([secondTagName, changeSecondAttrs]);
        assert.deepEqual(API.getData(), processingData);
    });

    it('Взять атрибуты тега', () => {
        const tagName = 'tagAttr';
        const attrs = {
            content: 'width=100',
            foo: 'BarProp',
        };
        const tag = API.createTag(tagName, attrs);

        assert.isNull(API.getAttrs('errorTag'));
        processingData.push([tagName, attrs]);
        assert.deepEqual(API.getAttrs(tag), attrs);
    });

    it('создание тега style ', () => {
        const tagName = 'style';
        const attrs = {
            type: 'text/css',
            scoped: 'scoped',
        };
        const content = '';
        API.createTag(tagName, attrs, content);
        processingData.push([tagName, { ...attrs }]);
        assert.deepEqual(API.getData(), processingData);
    });

    it('Очистка хранилища', () => {
        // что-то добавим, чтобы в HeadAPI были данные
        API.createTag('style', { type: 'text/css' }, '');
        API.clear();
        assert.isEmpty(API.getData());
        assert.isEmpty(API.getComments());
    });

    describe('createMergeTag script', () => {
        test('Добавление одного script', () => {
            const attrs = { type: 'text/javascript' };
            const content = 'var a = false;';
            API.createMergeTag('script', attrs, content);
            expect(API.getData()).toEqual([['script', expect.objectContaining(attrs), content]]);
        });

        test('Добавление больше одного script', () => {
            const attrs = { type: 'text/javascript' };
            const content1 = 'var a = false;';
            API.createMergeTag('script', attrs, content1);
            const content2 = 'var a = false;';
            API.createMergeTag('script', attrs, content2);
            expect(API.getData()).toEqual([
                ['script', expect.objectContaining(attrs), [content1, content2].join('\n')],
            ]);
        });

        test('Добавление script c атрибутом important', () => {
            // тег с атрибутом important должен встать в начало объединенного тега script
            const attrs1 = { type: 'text/javascript' };
            const content1 = 'var a = false;';
            API.createMergeTag('script', attrs1, content1);
            const attrs2 = { type: 'text/javascript', important: 'true' };
            const content2 = 'var a = false;';
            API.createMergeTag('script', attrs2, content2);
            expect(API.getData()).toEqual([
                [
                    'script',
                    expect.objectContaining({
                        ...attrs2,
                        ...attrs1,
                    }),
                    [content2, content1].join('\n'),
                ],
            ]);
        });

        test('Очистка хранилища', () => {
            API.createMergeTag('script', { type: 'text/javascript' }, 'var a = false;');
            API.clear();
            expect(API.getData()).toEqual([]);
        });
    });
});
