/// <amd-module name="AppBootstrapDemo/ReceivedStateComponent" />

import { Control, TemplateFunction } from 'UI/Base';
import * as template from 'wml!AppBootstrapDemo/ReceivedStateComponent';

export default class ReceivedStateComponent extends Control {
    _template: TemplateFunction = template;
    protected value: number;
    protected status: string = 'waiting';

    // tslint:disable-next-line:typedef
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
