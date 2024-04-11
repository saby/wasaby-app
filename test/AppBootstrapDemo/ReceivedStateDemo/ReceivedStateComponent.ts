// eslint-disable-next-line
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/ReceivedStateDemo/ReceivedStateComponent';
import { Control, TemplateFunction } from 'UI/Base';
import { constants } from 'Env/Env';

export default class ReceivedStateComponent extends Control {
    _template: TemplateFunction = template;
    protected value: number;
    protected status: string = 'waiting';
    // eslint-disable-next-line
    // @ts-ignore
    _beforeMount(
        options?: {},
        context?: object,
        receivedState?: number
    ): Promise<number> | void {
        if (!receivedState) {
            return Promise.resolve(Math.random());
        }
        if (constants.isBrowserPlatform && receivedState) {
            this.status = 'success';
        }
        this.value = receivedState;
    }
}
