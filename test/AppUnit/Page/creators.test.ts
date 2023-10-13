import { assert } from 'chai';
import { Head as HeadAPI, creators } from 'Application/Page';
import type { JML, IPageTagAPI, TFontAttrs } from 'Application/Page';
import { SERVER_ID_FIELD } from 'Application/_Page/_pageTagAPI/Interface';

const {
    createTitle,
    createCSS,
    createFavicon,
    createFont,
    createHttpEquiv,
    createMicroData,
    createScript,
    createViewPort,
} = creators;

let API: IPageTagAPI;

/**
 * Функционал creators подразумевает использование HeadAPI,
 * и тестирование HeadAPI в раздельных файлах затруднительно,
 * т.к. HeadAPI имеет общие данные и при разделении,
 * можем влиять на тесты, которые исполняются в других файлах.
 */
describe('Application/_Page/creators', () => {
    before(() => {
        API = HeadAPI.getInstance();
    });

    after(() => {
        API.clear();
    });

    it('createTitle ', () => {
        const VALUE = 'creatorsTitle';
        const tagId = createTitle(VALUE);
        const title = API.getData(tagId)[1];
        assert.equal(title, VALUE);
    });

    it('createCSS', () => {
        const VALUE = 'AppUnit\\Page\\creators\\styles.css';
        const EXPECTED_TAGID = createCSS(VALUE);
        const tagId = API.getData(EXPECTED_TAGID)[1][SERVER_ID_FIELD];
        assert.equal(tagId, EXPECTED_TAGID);
    });

    it('createViewPort', () => {
        const VALUE = 'width=1280';
        const EXPECTED_TAGID = createViewPort(VALUE);
        const tagId = API.getData(EXPECTED_TAGID)[1][SERVER_ID_FIELD];
        assert.equal(tagId, EXPECTED_TAGID);
    });

    it('createFont', () => {
        /**
         * createFont внутри сам определит формат шрифтов из href и вставит это значение в type.
         * в ином случае вставит в аттрибут type значение "font".
         */
        const HREF_VALUE = 'AppUnit\\Page\\creators\\TensorFont.woff2';
        const EXPECTED_TYPE = 'font/woff2';
        const tagId = createFont(HREF_VALUE);
        const type = (API.getData(tagId)[1] as TFontAttrs).type;
        assert.equal(type, EXPECTED_TYPE);
    });

    it('createMicroData', () => {
        const VALUE = "{name: 'creatorsName', content: 'creatorsContent'}";
        const EXPECTED_TAGID = createMicroData(VALUE);
        const tagId = API.getData(EXPECTED_TAGID)[1][SERVER_ID_FIELD];
        assert.equal(tagId, EXPECTED_TAGID);
    });

    it('createHttpEquiv with additional attributes ', () => {
        const HTTPEQUIV_VALUE = 'Content-Type';
        const CONTENT_VALUE = 'text/html;';
        const attrs = {
            'http-equiv': 'creatorsHttpEquiv',
            content: 'creatorsContent;',
            charset: 'utf-8',
        };
        const tagId = createHttpEquiv(HTTPEQUIV_VALUE, CONTENT_VALUE, attrs);
        /**
         * В элемент должны попасть HTTPEQUIV_VALUE, CONTENT_VALUE,
         * они пробрасываются в createHttpEquiv в качестве аргументов строками отдельно (Content-Type, text/html)
         */
        const expectedAttrs = {
            [SERVER_ID_FIELD]: tagId,
            ...attrs,
            'http-equiv': HTTPEQUIV_VALUE,
            content: CONTENT_VALUE,
        };
        const expectedElement: JML = ['meta', expectedAttrs];
        const element = API.getData(tagId);
        assert.deepEqual(element, expectedElement);
    });

    it('createScript with additional attributes', () => {
        const SRC_VALUE = 'AppUnit\\Page\\creators\\script2.js';
        const attrs = {
            src: 'AppUnit\\Page\\creators\\script.js',
            defer: 'defer',
            key: 'scripts_0',
        };
        const tagId = createScript(SRC_VALUE, attrs);
        /** в элемент должен попасть SRC_VALUE, который приходит в createScript отдельной строкой (script2) */
        const expectedAttrs = {
            type: 'text/javascript',
            ...attrs,
            [SERVER_ID_FIELD]: tagId,
            src: SRC_VALUE,
        };
        const expectedElement: JML = ['script', expectedAttrs];
        const element = API.getData(tagId);
        assert.deepEqual(element, expectedElement);
    });

    it('createFavicon with additional attributes', () => {
        const HREF_VALUE = 'AppUnit\\Page\\creators\\favicon_256.ico';
        const attrs = {
            href: 'AppUnit\\Page\\creators\\favicon.ico',
            rel: 'icon',
            type: 'icon',
            sizes: '256x256',
        };
        const tagId = createFavicon(HREF_VALUE, attrs);
        /** в элемент должен попасть HREF_VALUE, который приходит в createFavicon отдельной строкой (favicon_256) */
        const expectedElement: JML = [
            'link',
            {
                [SERVER_ID_FIELD]: tagId,
                ...attrs,
                href: HREF_VALUE,
            },
        ];
        const element = API.getData(tagId);
        assert.deepEqual(element, expectedElement);
    });
});
