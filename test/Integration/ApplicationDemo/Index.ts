// @ts-ignore
import * as Control from 'Core/Control';
// @ts-ignore
import * as template from 'wml!test/Integration/ApplicationDemo/Index';

/**
 * Точка входа для демонстрации ApplicationDemo
 */

export default class Index extends Control {
    protected _template: Function = template;
}
