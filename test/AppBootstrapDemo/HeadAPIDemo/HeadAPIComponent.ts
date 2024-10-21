// eslint-disable-next-line
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/HeadAPIDemo/HeadAPIComponent';
import { Control, TemplateFunction } from 'UI/Base';
import { Head } from 'Application/Page';
import { constants } from 'Env/Env';

const TAG_CONTENT = 'Test_Content_Script';

interface IHeadAPIComponentState {
    styleTagId: string;
}

export default class HeadAPIComponent extends Control {
    _template: TemplateFunction = template;
    private _HeadAPI: Head = Head.getInstance();
    foundElementDOM: string;
    elementPS: string;
    isFoundTitle: string = '';

    _beforeMount(
        options?: {},
        context?: {},
        receivedState?: IHeadAPIComponentState
    ): Promise<void> | IHeadAPIComponentState {
        if (!constants.isBrowserPlatform) {
            const uid = this._HeadAPI.createTag('script', { type: 'text/javascipt' }, TAG_CONTENT);
            this.elementPS = JSON.stringify(this._HeadAPI.getData(uid));
            const styleTagId = this._HeadAPI.createTag(
                'style',
                {},
                '.bootstrapdemo_headapi-serverID{ color: red !important; }'
            );

            return {
                styleTagId,
            };
        }

        this._HeadAPI.deleteTag(receivedState.styleTagId);
    }
    _afterMount(options?: {}, contexts?: unknown): void {
        this.foundElementDOM = Array.from(document.querySelectorAll('script')).find((item) => {
            return item.textContent === TAG_CONTENT;
        }).outerHTML;
        this.isFoundTitle = document.title !== '' ? 'success' : 'fail';
    }
    _createScript(): void {
        this._HeadAPI.createTag(
            'script',
            { type: 'text/javascript' },
            'document.getElementById("headapi_colorbox").style.backgroundColor = "green"'
        );
    }
}
