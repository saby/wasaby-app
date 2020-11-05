// @ts-ignore
import * as Control from 'Core/Control';
// @ts-ignore
import * as template from 'wml!ApplicationDemo/Index';
// import 'css!ApplicationDemo/Index';

/**
 * Точка входа для демонстрации ApplicationDemo
 */

export default class Index extends Control {
    protected _template: Function = template;
    protected _items;
    _beforeMount(options, context, receivedState) {
        // console.log('receivedState: ' + receivedState);
        if (!receivedState) {
            this._items = receivedState;
        } else {
            return Promise.resolve({data: 'crashed data'});
        }
    }
}
// <!doctype html>
// <html lang="ru" xml="ru" xmlns="http://www.w3.org/1999/xhtml">
// <head tabindex="0">
// <meta name="viewport" content="width=480"/>
// <meta charset="utf-8"/>
//     <title>saby-application</title>
//     <script key="ws-config">
// window.wsConfig = {
//     wsRoot: '/WS.Core/',
//     resourceRoot: '/',
//     appRoot: '/',
//     compatible: false
// };
// </script>
// </head>
// <body tabindex="0">
// <script type="text/javascript" src="/cdn/RequireJS/2.3.5-p5/require-min.js"></script>
//     <script type="text/javascript" src="/RequireJsLoader/config.js"></script>
//     <div id="root"></div>
//     <script>
//     require(['ApplicationDemo/Main'], function (Main) {
//         Main.default.createControl(Main.default, {}, document.getElementById("root"));
//     });
//
// </script>
//
// </body>
// </html>
