/// <amd-module name="AppBootstrapDemo/Main" />

import { Control, TemplateFunction } from 'UI/Base';
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/Main';

/**
 * Точка входа для демонстрации работы StateReceiver
 */

export default class Main extends Control {
   _template: TemplateFunction = template;
   // protected value: number;
   // protected status: string = 'waiting';

   // tslint:disable-next-line:typedef
   _beforeMount(options, context, receivedState): any {
      // if (!receivedState){
      //    return Promise.resolve(Math.random());
      // }
      // if (typeof(window) !== 'undefined' && receivedState) {
      //    this.status = 'success';
      // }
      // this.value = receivedState;
   }
}
