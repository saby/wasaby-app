/**
 * @jest-environment jsdom
 */
import { assert } from 'chai';
import { Head as HeadAPI } from 'Application/Page';
import type { JML, IPageTagAPI } from 'Application/Page';
import { SERVER_ID_FIELD } from 'Application/_Page/_pageTagAPI/Interface';

/**
 * processingData - массив - накопитель данных, который симулирует хранилище Head API.
 * Используется для сравнения c содержанием Head API
 */
let processingData: JML[] = [];
let countOfMeta: number = 0;
let API: IPageTagAPI;

function isEqualAttributes(attrs: object, attrsOrigin: object): boolean {
    return Object.keys(attrs).every((key) => {
        return Object.keys(attrsOrigin).some((keyOrigin) => {
            return keyOrigin === key && attrsOrigin[keyOrigin] === attrs[key];
        });
    });
}

describe('Application/_Page/Head', () => {
    after(() => {
        API.clear();
    });
    describe('Восстановление состояния на клиенте', () => {
        const EXPECTED_TAG = 'meta';
        const serverId = 'head-ps-1';
        const expectedAttrs = {
            'data-foo': 'bar',
            'head-api-restore-test': 'true',
            [SERVER_ID_FIELD]: serverId,
        };

        before(() => {
            const el = document.createElement(EXPECTED_TAG);
            for (const attrsKey in expectedAttrs) {
                if (expectedAttrs.hasOwnProperty(attrsKey)) {
                    el.setAttribute(attrsKey, expectedAttrs[attrsKey]);
                }
            }
            document.head.appendChild(el);
            // А если мы на клиенте, то вот она: точка создания инстанса. После создания контрольных тегов.
            API = HeadAPI.getInstance();
        });

        test('тест', () => {
            const data = API.getData();
            assert.isTrue(
                !!data.length,
                'Не было собрано ни одного тега при оживлении'
            );
            // попытаемся найти созданный напрямую в DOM html-элемент,
            // который Head API должен был при инициализации найти и добавить его к себе.
            const tagData = API.getData().find((jml: JML[] | string[]) => {
                // сравним имя тега из HeadAPI и ожидаемым тегом
                // сравним аттрибуты из HeadAPI и ожидаемыми аттрибутами
                return (
                    jml[0] === EXPECTED_TAG &&
                    isEqualAttributes(expectedAttrs, jml[1] as object)
                );
            });
            assert.isTrue(
                !!tagData,
                'Не был восстановлен контрольный тег при оживлении'
            );
            assert.deepEqual(
                tagData,
                [EXPECTED_TAG, expectedAttrs],
                'Неверно был восстановлен контрольный тег при оживлении'
            );
            assert.deepEqual(
                API.getData(serverId),
                [EXPECTED_TAG, expectedAttrs],
                'Не восстановился id с сервера на клиенте'
            );
        });
    });

    describe('Остальные клиентские тесты', () => {
        before(() => {
            API = HeadAPI.getInstance();
        });

        beforeEach(() => {
            API.clear();
            processingData = [];
        });

        it('Создание тега title', () => {
            const tag = 'title';
            const attrs = { name: 'this_attr_will_be_delete' };
            let content = 'foo';

            API.createTag(tag, attrs, content);
            // При получении данных от title тега из него удаляются все теги
            processingData.push([tag, content]);

            assert.deepEqual(API.getData(), processingData);

            content = 'bar';
            API.createTag(tag, attrs, content);
            processingData.pop();
            // При добавлении второго тега title он заменяет предыдущий
            processingData.push([tag, content]);
            assert.deepEqual(
                API.getData(),
                processingData,
                'Добавление второго тега title не привело к его замене'
            );
            assert.equal(
                content,
                document.title,
                'Добавление второго тега title не привело к изменению заголовка HTML страницы'
            );
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

            const element = document.head.querySelector<HTMLElement>(
                'meta[name=viewport]'
            );
            assert.isTrue(
                !!element,
                'Не нашелся элемент meta с описанием viewport'
            );
            assert.equal(
                element.getAttribute('content'),
                attrs.content,
                'Данные в meta не обновились'
            );
        });
    });
});
