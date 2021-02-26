import { assert } from 'chai';
import { default as AppInit } from 'Application/Initializer';
import { additionalAttrs, JSLINKS_PROPS } from './utils';
import { JSLinks } from 'Application/Page';
import { JML } from 'Application/_Interface/IHead';

const TAG = 'script';
describe('Application/_Page/JSLinks', () => {
    if(typeof(window) !== 'undefined'){
        it('Тесты JSLinks не проводятся на клиенте', function(): void{
            this.skip();
        });
        return;
    }
    AppInit();
    describe('server side', () => {
        it('Создание тега', () => {
            const NAMESPACE_STORE = 'custom_name';
            const API: JSLinks = JSLinks.getInstance(NAMESPACE_STORE);
            const attrs = {};
            const localData: JML[] = [];
            API.createTag(TAG, attrs);
            localData.push([TAG, {...attrs, ...additionalAttrs, ...JSLINKS_PROPS.attrs}]);
            assert.deepEqual(API.getData(), localData);
        });
        it('Создание дублирующего тега', () => {
            const NAMESPACE_STORE = 'custom_name2';
            const API: JSLinks = JSLinks.getInstance(NAMESPACE_STORE);
            const localData: JML[] = [];
            const attrs = {
                src: `to/${NAMESPACE_STORE}`
            };

            API.createTag(TAG, attrs);
            localData.push([TAG, {...attrs, ...additionalAttrs, ...JSLINKS_PROPS.attrs}]);
            assert.deepEqual(API.getData(), localData);

            API.createTag(TAG, attrs);
            assert.deepEqual(API.getData(), localData, 'После добавления дубля он появился в данных');
        });
        it('Создание тега c ошибочным name', () => {
            const NAMESPACE_STORE = 'custom_name3';
            const API: JSLinks = JSLinks.getInstance(NAMESPACE_STORE);
            const attrs = {};
            const WRONG_TAG = 'meta';
            let hasError = false;
            try{
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
            API.createTag(JSLINKS_PROPS.name, {src: `to/${NAMESPACE_STORE}`});
            API2.createTag(JSLINKS_PROPS.name, {src: `to/${NAMESPACE_STORE2}`});
            // tslint:disable-next-line:ban-ts-ignore
            // @ts-ignore
            assert.isFalse(API.getData().includes(item=> item.attrs?.src === `to/${NAMESPACE_STORE2}`));
            // tslint:disable-next-line:ban-ts-ignore
            // @ts-ignore
            assert.isFalse(API2.getData().includes(item=> item.attrs?.src === `to/${NAMESPACE_STORE}`));
        });
        it('Создание тега, который содержит контент', () => {
            const NAMESPACE_STORE = 'custom_name5';
            const API: JSLinks = JSLinks.getInstance(NAMESPACE_STORE);
            const CONTENT = 'custom_content5';
            const localData: JML[] = [];
            API.createTag(TAG, {}, CONTENT);
            localData.push([TAG, {...additionalAttrs}, CONTENT]);
            assert.deepEqual(API.getData(), localData);
        });
    });

});
