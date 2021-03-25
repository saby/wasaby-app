/// <amd-module name="AppBootstrapDemo/JSLinksComponent" />

import { Control, TemplateFunction } from 'UI/Base';
import * as template from 'wml!AppBootstrapDemo/JSLinksComponent';
import { JSLinks } from 'Application/Page';



export default class JSLinksComponent extends Control {
    _template: TemplateFunction = template;
    private _JSLinksAPI: JSLinks = JSLinks.getInstance('BootstrapDemo');
    _id: string;
    valueJSLinks: string = 'nothing';
    _beforeMount(opt, ctx, receivedState) {

        if(!receivedState && typeof window === 'undefined') {
            this._id = this._JSLinksAPI.createTag('script', {type: 'text/javascript'}, '', {
                load: () => {
                    this.valueJSLinks = 'something';
                    console.log(this.valueJSLinks);
                }
            });
        }
        console.log(this._JSLinksAPI);
        // tslint:disable-next-line:no-magic-numbers
        // console.log(this._JSLinksAPI.getData().filter(item => item.length => 3));

    }
}
