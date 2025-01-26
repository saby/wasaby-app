import { assert } from 'chai';
import * as sinon from 'sinon';
import { JSLinks, JML, IPageTagAttrs, IPageTag } from 'Application/Page';
import { location } from 'Application/Env';
import { SERVER_ID_FIELD } from 'Application/_Page/_pageTagAPI/Interface';

const JSLINKS_PROPS = {
    name: 'script',
    attrs: { defer: 'defer', type: 'text/javascript' },
};

const TAG = 'script';
describe('Application/_Page/JSLinks', () => {
    describe('server side', () => {
        let locationHostStub;

        beforeEach(() => {
            locationHostStub = sinon.stub(location, 'host').returns('');
        });

        afterEach(() => {
            locationHostStub.restore();
        });

        it('Создание тега', () => {
            const NAMESPACE_STORE = 'custom_name';
            const API: JSLinks = JSLinks.getInstance(NAMESPACE_STORE);
            const attrs = {};
            const localData: JML[] = [];

            API.createTag(TAG, attrs);
            localData.push([TAG, { ...attrs, ...JSLINKS_PROPS.attrs }]);

            assert.deepEqual(API.getData(), localData);
        });

        it('Создание дублирующего тега', () => {
            const NAMESPACE_STORE = 'custom_name2';
            const API: JSLinks = JSLinks.getInstance(NAMESPACE_STORE);
            const localData: JML[] = [];
            const attrs = {
                src: `to/${NAMESPACE_STORE}`,
            };

            API.createTag(TAG, attrs);
            localData.push([TAG, { ...attrs, ...JSLINKS_PROPS.attrs }]);
            assert.deepEqual(API.getData(), localData);

            API.createTag(TAG, attrs);
            assert.deepEqual(
                API.getData(),
                localData,
                'После добавления дубля он появился в данных'
            );
        });

        it('Создание тега c ошибочным name', () => {
            const NAMESPACE_STORE = 'custom_name3';
            const API: JSLinks = JSLinks.getInstance(NAMESPACE_STORE);
            const attrs = {};
            const WRONG_TAG = 'meta';
            let hasError = false;

            try {
                API.createTag(WRONG_TAG, attrs);
            } catch (e) {
                hasError = true;
            }

            assert.isTrue(hasError);
        });

        it('Данные не смешиваются при добавлении тегов по разным nameSpace', () => {
            const NAMESPACE_STORE = 'custom_name4';
            const API: JSLinks = JSLinks.getInstance(NAMESPACE_STORE);
            const NAMESPACE_STORE2 = 'custom_name42';
            const API2: JSLinks = JSLinks.getInstance(NAMESPACE_STORE2);

            API.createTag('script', { src: `to/${NAMESPACE_STORE}` });
            API2.createTag('script', { src: `to/${NAMESPACE_STORE2}` });

            assert.isFalse(
                (API.getData() as unknown as IPageTag[]).some((item: IPageTag): boolean => {
                    return item.attrs?.src === `to/${NAMESPACE_STORE2}`;
                })
            );
            assert.isFalse(
                (API2.getData() as unknown as IPageTag[]).some((item: IPageTag): boolean => {
                    return item.attrs?.src === `to/${NAMESPACE_STORE}`;
                })
            );
        });

        it('Создание тега, который содержит контент', () => {
            const NAMESPACE_STORE = 'custom_name5';
            const API: JSLinks = JSLinks.getInstance(NAMESPACE_STORE);
            const CONTENT = 'custom_content5';
            const localData: JML[] = [];
            const tagId = API.createTag(TAG, {}, CONTENT);

            localData.push([TAG, { [SERVER_ID_FIELD]: tagId }, CONTENT]);

            assert.deepEqual(API.getData(), localData);
        });

        it('Создание тега, у которого скрипт запрашивается с другого домена', () => {
            locationHostStub.returns('otherDomain');
            const NAMESPACE_STORE = 'custom_name13';
            const NAMESPACE_STORE2 = 'custom_name31';
            const API: JSLinks = JSLinks.getInstance(NAMESPACE_STORE);
            const API2: JSLinks = JSLinks.getInstance(NAMESPACE_STORE2);

            API.createTag('script', {
                src: `//otherDomain/to/${NAMESPACE_STORE}`,
            });
            API2.createTag('script', {
                src: `https://otherDomain/to/${NAMESPACE_STORE}`,
            });

            assert.strictEqual(
                (API.getData()[0][1] as IPageTagAttrs).crossorigin,
                'use-credentials'
            );
            assert.strictEqual(
                (API2.getData()[0][1] as IPageTagAttrs).crossorigin,
                'use-credentials'
            );
        });
    });
});
