/* eslint-disable-next-line */
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/SerializerDemo/SerializerDemo';
import { Control, TemplateFunction } from 'UI/Base';

/**
 * Демонстрация работы сериализации на сервере.
 */
export default class SerializerDemo extends Control {
    _template: TemplateFunction = template;
}
