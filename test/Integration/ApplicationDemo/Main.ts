/// <amd-module name="ApplicationDemo/Main" />

// @ts-ignore
import {Control} from 'UI/Base';
// @ts-ignore
import * as template from 'wml!ApplicationDemo/Main';

/**
 * Точка входа для демонстрации роутинга
 */

export default class Main extends Control {
   _template: Function = template;
   protected value: number;
   protected status: string = 'waiting';

   _beforeMount(options, context, receivedState): any {
      if (!receivedState){
         return Promise.resolve(Math.random());
      }
      if (typeof(window) !== 'undefined' && receivedState) {
         this.status = 'success';
      }
      this.value = receivedState;
   }
}
