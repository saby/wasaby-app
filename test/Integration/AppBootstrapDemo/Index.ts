import { Control, TemplateFunction } from 'UI/Base';
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/Index';
import {headDataStore, addPageDeps} from 'UI/Deps';
// import {JSLinks} from 'Application/_Page/JSLinks';

/**
 * Точка входа для демонстрации AppBootstrapDemo
 */

export default class Index extends Control {
    protected _template: TemplateFunction = template;
    // private _JSLinksAPI: JSLinks = JSLinks.getInstance('BootstrapDemo');

    _beforeMount(opt, ctx, receivedState) {

        if(typeof window === 'undefined') {
            // headDataStore.read('setIncludedResources')({links: [], scripts: [{src: 'AppBootstrapDemo/ResourceJSLinks'}]})
            addPageDeps(['AppBootstrapDemo/ResourceJSLinks']);
            // this._JSLinksAPI.createTag('script', {key: 'resourcejslinks', type: 'text/javascript', defer: 'defer', src: 'AppBootstrapDemo/ResourceJSLinks'}, '');
            // console.log(this._JSLinksAPI.getData());
        }
    }

}
