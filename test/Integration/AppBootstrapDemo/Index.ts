// tslint:disable-next-line
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/Index';
import { Control, TemplateFunction } from 'UI/Base';
import { constants } from 'Env/Env';

/**
 * Точка входа для демонстрации AppBootstrapDemo
 */
export default class Index extends Control {
    protected _template: TemplateFunction = template;
    protected _styles: string[] = ['AppBootstrapDemo/Index'];
    isBootstrapLoaded: string = 'waiting';
    _beforeMount(options?: {}, contexts?: object, receivedState?: void): Promise<void> | void {
        constants.buildnumber = '4.8.15.16.23.42';
    }

    // tslint:disable-next-line:no-any
    _afterMount(options?: {}, contexts?: any): void {
        this.isBootstrapLoaded = 'success';
    }
}
export function getDataToRender(): Promise<object | false> {
    /** задать дефолтный title */
    return Promise.resolve({title: 'Default Title AppBootstrapDemo'});
}
