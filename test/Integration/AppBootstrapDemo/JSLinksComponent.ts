/// <amd-module name="AppBootstrapDemo/JSLinksComponent" />
// tslint:disable-next-line
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/JSLinksComponent';
import { JSLinks } from 'Application/Page';
import {aggregateJS} from 'UI/Deps';
import { Control, TemplateFunction, TagMarkup, fromJML } from 'UI/Base';
import { constants } from 'Env/Constants';

export default class JSLinksComponent extends Control {
    _template: TemplateFunction = template;
    jslinksData: String = '';
    status: String = 'waiting';
    isBuildnumberString: string = '';
    buildnumber: string = '';

    _beforeMount(options?: {}, context?: {}, receivedState?: unknown): Promise<void> | void {

        if (!constants.isBrowserPlatform) {
            const JSLinksAPI = JSLinks.getInstance();
            aggregateJS(
                {
                    css: { themedCss: [], simpleCss: [] },
                    tmpl: [],
                    wml: [],
                    js: ['AppBootstrapDemo/JSLinksResource.js'],
                    scripts: [],
                    rsSerialized: '',
                    rtpackModuleNames: [],
                    additionalDeps: []
                }
            );
            this.jslinksData += new TagMarkup(JSLinksAPI.getData().map(fromJML), { getResourceUrl: false }).outerHTML;
            return;
        }
        /* tslint:disable */
        // @ts-ignore
        this.buildnumber = window.buildnumber;
        // @ts-ignore
        this.isBuildnumberString = typeof window.buildnumber === 'string' ? 'success' : 'fail';
    }

    _afterMount(options?: {}, contexts?: unknown): void {
        // @ts-ignore
        if (window.jslinkFlag) {
            this.status = 'success';
        }
    }
}
