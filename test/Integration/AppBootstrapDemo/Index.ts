import { Control, TemplateFunction } from 'UI/Base';
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/Index';

/**
 * Точка входа для демонстрации AppBootstrapDemo
 */
export default class Index extends Control {
    protected _template: TemplateFunction = template;
    protected _styles: string[] = ['AppBootstrapDemo/Index'];
}
