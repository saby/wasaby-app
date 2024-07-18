/* eslint-disable-next-line */
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/Main';
import { Control, TemplateFunction } from 'UI/Base';

export default class Main extends Control {
    _template: TemplateFunction = template;
}
