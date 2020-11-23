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
}

// constructor(cfg: any) {
//    super();
//    if (!AppInit.isInit()) {
//       AppInit.default(cfg);
//    }
// }
// require(['ApplicationDemo/Main'], function (Main) {
//    Main.default.createControl(Main.default, {}, document.getElementById("root"));
// });


// <script>
//
//     require(['Application/Env'], function (AppEnv) {
//        var serverState = AppEnv.getStateReceiver();
//        var serializedState = serverState.serialize();
//        console.log(serializedState);
//     });
// require(['ApplicationDemo/StateConsumer'], function (StateConsumer) {
//    StateConsumer.default.createControl(StateConsumer.default, {}, document.getElementById("main-id"));
// });
//
// </script>
