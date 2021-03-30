/// <amd-module name="AppBootstrapDemo/Main" />

import { Control, TemplateFunction } from 'UI/Base';
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/Main';
/**
 * Точка входа для демонстрации работы StateReceiver
 */

export default class Main extends Control {
   _template: TemplateFunction = template;
   _beforeMount(options, context, receivedState): any {
   }
}
