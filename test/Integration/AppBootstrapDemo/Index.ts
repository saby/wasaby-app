// tslint:disable-next-line
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/Index';
import { Control, TemplateFunction } from 'UI/Base';

/**
 * Точка входа для демонстрации AppBootstrapDemo
 */
export default class Index extends Control {
    protected _template: TemplateFunction = template;
    protected _styles: string[] = ['AppBootstrapDemo/Index'];

    _beforeMount(options?: {}, contexts?: object, receivedState?: void): Promise<void> | void {
    }
}
export function getDataToRender(url: string): Promise<object | false> {
    return Promise.resolve({s: 'SUPER TITLE!'});
}
