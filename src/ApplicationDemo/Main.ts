/// <amd-module name="ApplicationDemo/Main" />

// @ts-ignore
import * as AppInit from 'Application/Initializer';
// @ts-ignore
import * as Control from 'Core/Control';
// @ts-ignore
import * as template from 'wml!ApplicationDemo/Main';

/**
 * Точка входа для демонстрации роутинга
 */

export default class Main extends Control {
   _template: Function = template;

   // tslint:disable-next-line: no-any
   constructor(cfg: any) {
      super();
      // Initialize the Request storage that is used by Router/Data.
      // This is usually done by Application/Core, which is not used
      // in these demos
      if (!AppInit.isInit()) {
         AppInit.default(cfg);
      }
   }

}

// <script>
//     console.log('hello');
// var serverValue = '{ \
//    "uuid": { "someKey": "someValue" } \
// }';
//
// define('Core', ['Application/Initializer', 'Application/Env'], ({ default: init }, { StateReceiver }) => {
//    const serverState = new StateReceiver();
//    serverState.deserialize(serverValue);
//    init({}, undefined, serverState);
// });
// </script>
