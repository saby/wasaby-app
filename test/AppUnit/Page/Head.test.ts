import { assert } from 'chai';
import { Head as HeadAPI } from 'Application/Page';
import type { JML, IHead } from 'Application/Page';

const additionalAttrs = {
    'data-vdomignore': true
};

const processingData: JML[] = [];
let countOfMeta: number = 0;

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
        /** А если мы на клиенте, то вот она: точка создания инстанса. После создания контрольных тегов. */
        API = HeadAPI.getInstance();
        const data = API.getData();
        assert.isTrue(!!data.length, 'Не было собрано ни одного тега при оживлении');
        /**
         * попытаемся найти созданный напрямую в DOM html-элемент,
         * который headapi должен был при инициализации найти и добавить его к себе.
         */
            // tslint:disable-next-line:max-line-length
        const tagData = (API.getData().find((arr: JML[] | string[]) => arr.some((item: string | object ) => arr[0] === tag && isEqualAttributes(attrs, item as object))));
        assert.isTrue(!!tagData, 'Не был восстановлен контрольный тег при оживлении');
        assert.deepEqual(tagData, [tag, {...attrs, ...additionalAttrs}], 'Неверно был восстановлен контрольный тег при оживлении');

        API.clear();
    });

    it('Создание тега title', () => {
        const tag = 'title';
        const attrs = {name: 'this_attr_will_be_delete'};
        let content = 'foo';

        API.createTag(tag, attrs, content);
        /** При получении данных от title тега из него удаляются все теги */
        processingData.push([tag, {...additionalAttrs}, content]);

        assert.deepEqual(API.getData(), processingData);

        if (typeof window !== 'undefined') {
            content = 'bar';
            API.createTag(tag, attrs, content);
            processingData.pop();
            /** При добавлении второго тега title он заменяет предыдущий */
            processingData.push([tag, {...additionalAttrs}, content]);
            assert.deepEqual(API.getData(), processingData, 'Добавление второго тега title не привело к его замене');
            assert.equal(content, document.title,
                'Добавление второго тега title не привело к изменению заголовка HTML страницы');
        }
    });

    it('Создание тега meta с name=viewport', () => {
        const tag = 'meta';
        const attrs = {name: 'viewport', content: 'width=1024'};
        countOfMeta = countOfMeta + 1;

        API.createTag(tag, attrs);
        attrs.content = 'width=1920';
        API.createTag(tag, attrs);
        /** При добавлении второго тега meta с описанием viewport она заменяет предыдущий */
        processingData.push([tag, {...attrs, ...additionalAttrs}]);
        assert.deepEqual(API.getData(), processingData);

        if (typeof window !== 'undefined') {
            const element = document.head.querySelector<HTMLElement>('meta[name=viewport]');
            assert.isTrue(!!element, 'Не нашелся элемент meta с описанием viewport');
            assert.equal(element.getAttribute('content'), attrs.content, 'Данные в meta не обновились');
        }
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
            type: 'test',
            content: 'width=1024'
        };
        countOfMeta = countOfMeta + 1;

        API.createTag(tag, attrs);
        processingData.push([tag, {...attrs, ...additionalAttrs}]);
        assert.deepEqual(API.getData(), processingData);

        API.createTag(tag, attrs);
        assert.deepEqual(API.getData(), processingData, 'После добавления дубля он появился в данных');
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

        const scriptId: string = API.createTag(tag, attrs);
        processingData.push([tag, {...attrs, ...additionalAttrs}]);
        assert.deepEqual(API.getData(), processingData);

        API.deleteTag(scriptId);
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


function isEqualAttributes(attrs: object, attrsOrigin: object): boolean {
    return Object.keys(attrs).every((key) => {
        return Object.keys(attrsOrigin).some(keyOrigin => keyOrigin === key && attrsOrigin[keyOrigin] === attrs[key]);
    });
}
