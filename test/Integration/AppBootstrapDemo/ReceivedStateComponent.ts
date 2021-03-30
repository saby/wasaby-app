/// <amd-module name="AppBootstrapDemo/ReceivedStateComponent" />

// tslint:disable-next-line
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/ReceivedStateComponent';
import { Control, TemplateFunction } from 'UI/Base';

export default class ReceivedStateComponent extends Control {
    _template: TemplateFunction = template;
    protected value: number;
    protected status: string = 'waiting';
    // tslint:disable-next-line
    // @ts-ignore
    _beforeMount(options?: {}, context?: object, receivedState?: number): Promise<number> | void {

        if (!receivedState){
            return Promise.resolve(Math.random());
        }
        if (typeof(window) !== 'undefined' && receivedState) {
            this.status = 'success';
        }
        this.value = receivedState;
    }
}
