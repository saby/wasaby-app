import { assert } from 'chai';
import { Head as HeadAPI } from 'Application/Page';
import { JML, IHead, IHeadTagAttrs } from "Application/Interface";
import { additionalAttrs } from "./utils";

const processingData: JML[] = [];

describe('Application/_Page/Head', () => {
    let API: IHead;

    it('Восстановление состояния на клиенте', () => {
        if (typeof window === 'undefined') {
            /** Если мы не на клиенте, то ничего не делаем. Но инстанс создать надо. */
            API = HeadAPI.getInstance();
            API.clear();
            return;
        }

        const tag = 'meta';
        const attrs = {
            'data-foo': 'bar',
            'head-api-restore-test': 'true'
        };

        const el = document.createElement(tag);
        for (const attrsKey in attrs) {
            if (attrs.hasOwnProperty(attrsKey)) {
                el.setAttribute(attrsKey, attrs[attrsKey]);
            }
        }
        document.head.appendChild(el);

        /** А ли мы на клиенте, то вот она: точка создания инстанса. После создания контрольных тегов. */
        API = HeadAPI.getInstance();
        const data = API.getData();
        assert.isTrue(!!data.length, 'Не было собрано ни одного тега при оживлении');

        const tagData = API.getData(( API.getTag(tag, ( attrs as IHeadTagAttrs )) as string ));
        assert.isTrue(!!tagData, 'Не был восстановлен контрольный тег при оживлении');
        assert.deepEqual(tagData, [tag, {...attrs, ...additionalAttrs}], 'Неверно был восстановлен контрольный тег при оживлении');

        API.clear();
    });

    it('Создание пустого тега', () => {
        const tag = 'title';
        const attrs = {};

        API.createTag(tag, attrs);
        processingData.push([tag, {...attrs, ...additionalAttrs}]);
        assert.deepEqual(API.getData(), processingData);
    });

    it('Добавление тега в набор уже существующих тегов', () => {
        const tag = 'link';
        const attrs = {
            rel: 'preload',
            as: 'font',
            href: '//cdn.sbis.ru/cdn/TensorFont/1.0.3/TensorFont/TensorFont.woff2" type="font/woff2',
            crossorigin: 'crossorigin'
        };

        API.createTag(tag, attrs);
        processingData.push([tag, {...attrs, ...additionalAttrs}]);
        assert.deepEqual(API.getData(), processingData);
    });

    it('Добавление noScript', () => {
        const url = 'noScript.html';

        API.createNoScript(url);
        processingData.unshift(['noscript', ['meta', {...additionalAttrs, ...{
                'http-equiv': 'refresh',
                content: `2; URL=${url}`
            }}]]);
        assert.deepEqual(API.getData(), processingData);
    });

    it('Добавление дубля ни к чему не приводит', () => {
        const tag = 'meta';
        const attrs = {
            name: 'viewport',
            content: 'width=1024'
        };

        API.createTag(tag, attrs);
        processingData.push([tag, {...attrs, ...additionalAttrs}]);
        assert.deepEqual(API.getData(), processingData);

        API.createTag(tag, attrs);
        assert.deepEqual(API.getData(), processingData, 'После добавления дубля он появился в данных');
    });

    it('Получение id тега из хранилища по параметрам', () => {
        /** Добавим еще один тег meta для массы */
        const tag = 'meta';
        const attrs = {
            'http-equiv': 'bar',
            content: 'IE=edge',
            foo: 'bar'
        };

        API.createTag(tag, attrs);
        processingData.push([tag, {...attrs, ...additionalAttrs}]);

        /** title мы добавляли ранее */
        assert.isString(API.getTag('title'), 'Не нашелся пустой тег title в данных');
        assert.isNull(API.getTag('title', ({foo: 'bar'} as IHeadTagAttrs)),
            'Нашелся несуществующий тег title в данных');
        assert.isString(API.getTag('meta', ({foo: 'bar'} as IHeadTagAttrs)),
            'Нашлось более 2-х тегов meta в данных');
        assert.equal(API.getTag('meta').length, 2, 'Не нашлось 2 тега meta в данных');
    });

    it('Получение тега для IE в нужном месте', () => {
        const tag = 'meta';
        const attrs = {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'};

        API.createTag(tag, attrs);
        /** Особый тег для IE должен возвращаться сразу после открывающегося тега <head> (допустимо после noScript) */
        processingData.splice(1, 0, [tag, {...attrs, ...additionalAttrs}]);
        assert.deepEqual(API.getData(), processingData, 'Особый тег для IE встал на недопусимое место');
    });

    it('Удаление тега', () => {
        /** Добавим тег script, чтобы сразу же его удалить */
        const tag = 'script';
        const attrs = {};

        API.createTag(tag, attrs);
        processingData.push([tag, {...attrs, ...additionalAttrs}]);
        assert.deepEqual(API.getData(), processingData);

        API.deleteTag((API.getTag(tag) as string));
        processingData.pop();
        assert.deepEqual(API.getData(), processingData, 'Тег script не удалился из набора данных');
    });

    it('Создание комментария', () => {
        const firstComment = 'Lorem ipsum dolor sit amet.';
        const secondComment = 'Ut enim ad minim veniam.';
        const wrapper = (str) => `<!--${str}-->`;
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
        /** Cоздаем теги */
        const tagName = 'changeTag';
        const attrs = {
            content: 'width=100'
        };
        const tag = API.createTag(tagName, attrs);

        /** Новые аттрибуты */
        const changeAttrs = {
            content: 'width=1000; height=1000',
            foo: 'barChange'
        };

        /** Может возникнуть такая ситуация, что аттрибутов много, а изменим одну строчку. */
        const secondTagName = 'secondChangeTag';
        const secondAttrs = {
            content: 'width=1000; height=1000',
            foo: 'barChange'
        };
        const changeSecondAttrs = {
            content: 'width=3000',
            atr: '3000',
            xMode: 'y',
            c: 'w'
        };
        const secondTag = API.createTag(secondTagName, secondAttrs);

        /** Меняем  данные */
        API.changeTag(tag, changeAttrs);

        API.changeTag(secondTag, changeSecondAttrs);
        processingData.push([tagName, {...changeAttrs, ...additionalAttrs}]);
        processingData.push([secondTagName, {...changeSecondAttrs, ...additionalAttrs}]);
        assert.deepEqual(API.getData(), processingData);
    });

    it('Взять атрибуты тега', () => {
        const tagName = 'tagAttr';
        const attrs = {
            content: 'width=100',
            foo: 'BarProp'
        };
        const tag = API.createTag(tagName, attrs);

        assert.isNull(API.getAttrs('errorTag'));
        processingData.push([tagName, { ...attrs }]);
        assert.deepEqual(API.getAttrs(tag), attrs);
    });

    it('Очистка хранилища', () => {
        API.clear();
        assert.isEmpty(API.getData());
        assert.isEmpty(API.getComments());
    });
});
