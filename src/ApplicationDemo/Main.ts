/// <amd-module name="ApplicationDemo/Main" />

// @ts-ignore
import * as Control from 'Core/Control';
// @ts-ignore
import * as template from 'wml!ApplicationDemo/Main';

/**
 * Точка входа для демонстрации роутинга
 */

export default class Main extends Control {
   _template: Function = template;
   protected value;
   protected status: String = 'waiting';
   _beforeMount(cfg, options, receivedState): any {
      if (typeof(window) !== 'undefined' &&  receivedState) {
         this.status = 'success';
      }
      if (!receivedState){
         return Promise.resolve(Math.random());
      }
      this.value = receivedState;
   }
}
