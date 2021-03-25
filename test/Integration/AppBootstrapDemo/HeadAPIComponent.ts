/// <amd-module name="AppBootstrapDemo/HeadAPIComponent" />
// tslint:disable:max-line-length
import { Control, TemplateFunction } from 'UI/Base';
import * as template from 'wml!AppBootstrapDemo/HeadAPIComponent';
import {Head, JSLinks} from 'Application/Page';

const TAG_CONTENT =  'Test_Content_Script';

export default class HeadAPIComponent extends Control {
    _template: TemplateFunction = template;
    private _HeadAPI: Head = Head.getInstance();
    foundItem: string | undefined;
    elementPS: string | undefined;

    _beforeMount(options, context, receivedState): any {

        if (!receivedState) {
            const uid = this._HeadAPI.createTag('script', {type: 'text/javascipt'}, TAG_CONTENT);
            this.elementPS = JSON.stringify(this._HeadAPI.getData(uid));
        }
    }
    _afterMount(options?: {}, contexts?: any) {
        this.foundItem = Array.from(document.querySelectorAll('script')).find(item => item.textContent === TAG_CONTENT).outerHTML;
    }
    _createScript(): void {
        this._HeadAPI.createTag('script', {key: 'key-colorboxscript', src: 'from/colorboxscript', type: 'text/javascript'}, '', {
            load: () => document.getElementById('headapi_colorbox').style.backgroundColor = 'green'
        });
    }
}
