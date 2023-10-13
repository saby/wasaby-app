// eslint-disable-next-line
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/Index';
import { Control, TemplateFunction } from 'UI/Base';
import { constants } from 'Env/Env';

/**
 * Точка входа для демонстрации AppBootstrapDemo
 */
export default class Index extends Control {
    /** общий статус загрузки всей демки */
    isBootstrapLoaded: string = 'waiting';
    /** Определяем содержит ли демка в теге body класс undefined. */
    bodyHasNotUndefinedClass: string = 'waiting';
    protected _template: TemplateFunction = template;
    protected _styles: string[] = ['AppBootstrapDemo/Index'];
    _beforeMount(
        options?: {},
        contexts?: object,
        receivedState?: void
    ): Promise<void> | void {
        Index.setBuildNumberJSLinksAPI();
    }
    _afterMount(options?: {}, contexts?: object): void {
        this._setStatusBootstrapDemo();
        this._hasBodyUndefinedClass();
    }
    /**
     * Устанавливаем общий статус загрузки всей демки
     */
    private _setStatusBootstrapDemo(): void {
        this.isBootstrapLoaded = 'success';
    }
    /**
     * Определим содержит ли демка в теге body класс undefined.
     */
    private _hasBodyUndefinedClass(): void {
        this.bodyHasNotUndefinedClass = !document.body.classList.contains(
            'undefined'
        )
            ? 'success'
            : 'fail';
    }
    /**
     * Устанавливаем buildnumber в constants.
     * Проверим этот результат в jslinksAPI
     */
    static setBuildNumberJSLinksAPI(): void {
        constants.buildnumber = '4.8.15.16.23.42';
    }
}
export function getDataToRender(): Promise<object | false> {
    /** задать дефолтный title */
    return Promise.resolve({ title: 'Default Title AppBootstrapDemo' });
}
