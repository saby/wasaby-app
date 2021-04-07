/// <amd-module name="AppBootstrapDemo/HeadAPIComponent" />
// tslint:disable-next-line
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/HeadAPIComponent';
import { Control, TemplateFunction } from 'UI/Base';
import { Head } from 'Application/Page';

const TAG_CONTENT =  'Test_Content_Script';

export default class HeadAPIComponent extends Control {
    _template: TemplateFunction = template;
    private _HeadAPI: Head = Head.getInstance();
    foundElementDOM: string;
    elementPS: string;
    isFoundTitle: string = '';

    _beforeMount(options?: {}, context?: {}, receivedState?: unknown): Promise<void> | void {
        if (typeof window === 'undefined' && !receivedState) {
            const uid = this._HeadAPI.createTag('script', {type: 'text/javascipt'}, TAG_CONTENT);
            this.elementPS = JSON.stringify(this._HeadAPI.getData(uid));
        }
    }
    _afterMount(options?: {}, contexts?: unknown): void {
        this.foundElementDOM = Array.from(document.querySelectorAll('script'))
            .find(item => item.textContent === TAG_CONTENT).outerHTML;
        this.isFoundTitle = document.title !== '' ? 'success' : 'fail';
    }
    _createScript(): void {
        this._HeadAPI.createTag('script', {type: 'text/javascript'},
            'document.getElementById("headapi_colorbox").style.backgroundColor = "green"');
    }
}
