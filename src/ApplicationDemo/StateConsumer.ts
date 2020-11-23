/// <amd-module name="ApplicationDemo/StateConsumer" />

// @ts-ignore
import * as Control from 'Core/Control';
// @ts-ignore
import * as template from 'wml!ApplicationDemo/StateConsumer';

/**
 * Точка входа для демонстрации ApplicationDemo
 */

export default class StateConsumer extends Control {
    protected _template: Function = template;
    protected _item;

    _beforeMount(options, context, receivedState){
        if (receivedState) {
            console.log(receivedState);
            this._item = receivedState;
        } else {
            return Promise.resolve({someKey: 'someData'});
        }
    }
}
