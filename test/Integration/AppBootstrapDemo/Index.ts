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

    _beforeMount(options?: {}, contexts?: object, receivedState?: void): Promise<void> | void {
        constants.buildnumber = '4.8.15.16.23.42';
    }
}
export function getDataToRender(url: string): Promise<object | false> {
    return Promise.resolve({title: 'Default Title'});
}
