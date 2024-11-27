/**
 * @jest-environment jsdom
 */
import { assert } from 'chai';
import { Head as HeadAPI } from 'Application/Page';
import type { JML, IPageTagAPI } from 'Application/Page';
import { SERVER_ID_FIELD } from 'Application/_Page/_pageTagAPI/Interface';

describe('Application/_Page/_head/Favicon', () => {
    let API: IPageTagAPI;
    const attrs = {
        href: 'AppUnit\\Page\\Head\\pink_favicon_16.ico',
        rel: 'shortcut icon',
        type: 'image/x-icon',
        sizes: '16x16',
    };
    const tagName = 'link';
    // eslint-disable-next-line no-shadow, @typescript-eslint/no-shadow
    let processingData: JML[] = [];

    before(() => {
        API = HeadAPI.getInstance();
    });

    beforeEach(() => {
        API.clear();
        processingData = [];
    });

    it('Head API создает только один уникальный favicon ', () => {
        const EXPECTED_ELEMENTS = 1;
        API.createTag(tagName, attrs);
        API.createTag(tagName, {
            ...attrs,
            href: 'AppUnit\\Page\\Head\\pink_favicon_64.ico',
            rel: 'apple-touch-icon',
        });
        assert.equal(
            document.head.querySelectorAll('link[rel*=icon]').length,
            EXPECTED_ELEMENTS,
            'На странице должен быть один уникальный favicon'
        );
    });

    it('Head API создает несколько уникальных favicon ', () => {
        const EXPECTED_ELEMENTS = 3;
        const attrs64 = {
            ...attrs,
            href: 'AppUnit\\Page\\Head\\pink_favicon_64.ico',
            sizes: '64x64',
        };
        const attrs128 = {
            ...attrs,
            href: 'AppUnit\\Page\\Head\\pink_favicon_128.ico',
            sizes: '128x128',
        };
        API.createTag(tagName, attrs);
        processingData.push([tagName, { ...attrs }]);
        API.createTag(tagName, attrs64);
        processingData.push([tagName, attrs64]);
        API.createTag(tagName, attrs128);
        processingData.push([tagName, attrs128]);
        assert.deepEqual(
            API.getData(),
            processingData,
            'Не было создано несколько уникальных favicon'
        );
        assert.equal(
            document.head.querySelectorAll('link[rel*=icon]').length,
            EXPECTED_ELEMENTS,
            'На странице не было создано несколько уникальных favicon'
        );
    });

    it('Head API меняет только href в одном уникальном favicon', () => {
        // Сначала создается один элемент. Затем создается второй, который затирает первый
        // В итоге в HeadAPI остается один элемент - последний.
        API.createTag(tagName, {
            ...attrs,
            href: 'AppUnit\\Page\\Head\\pink_favicon_128.ico',
        });
        const tagAPI = API.createTag(tagName, { ...attrs });
        processingData.push([tagName, { ...attrs, [SERVER_ID_FIELD]: tagAPI }]);
        assert.deepEqual(API.getData(), processingData);
    });

    it('Не возникает ошибок, когда Head API создает уникальный favicon с разными href ', () => {
        let hasError = false;
        try {
            API.createTag(tagName, attrs);
            API.createTag(tagName, attrs);
            API.createTag(tagName, {
                ...attrs,
                href: 'AppUnit\\Page\\Head\\pink_favicon_64.ico',
            });
            API.createTag(tagName, attrs);
            API.createTag(tagName, {
                ...attrs,
                href: 'AppUnit\\Page\\Head\\pink_favicon_128.ico',
            });
        } catch (_) {
            hasError = true;
        } finally {
            assert.isFalse(hasError, 'Возникла ошибка');
        }
    });
});
