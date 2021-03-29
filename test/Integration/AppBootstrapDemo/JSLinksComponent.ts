/// <amd-module name="AppBootstrapDemo/JSLinksComponent" />

import { Control, TemplateFunction } from 'UI/Base';
import * as template from 'wml!AppBootstrapDemo/JSLinksComponent';
import { JSLinks } from 'Application/Page';
// import {addPageDeps, headDataStore} from 'UI/Deps';

export default class JSLinksComponent extends Control {
    _template: TemplateFunction = template;
    private _JSLinksAPI: JSLinks = JSLinks.getInstance('BootstrapDemo');
    _id: string;
    valueJSLinks: string = 'nothing';
    _beforeMount(opt, ctx, receivedState) {

        if(typeof window === 'undefined') {
            // addPageDeps(['AppBootstrapDemo/ResourceJSLinks']);
            // this._JSLinksAPI.createTag('script', {key: 'resourcejslinks', type: 'text/javascript', defer: 'defer', src: 'AppBootstrapDemo/ResourceJSLinks'}, '');
            // this._id = this._JSLinksAPI.createTag('script', {type: 'text/javascript'}, '', {
            //     load: () => {
            //         this.valueJSLinks = 'something';
            //         console.log(this.valueJSLinks);
            //     }
            // });
            // console.log(this._JSLinksAPI.getData());
        }
    }
}
