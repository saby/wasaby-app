/// <amd-module name="AppBootstrapDemo/JSLinksComponent" />
// tslint:disable-next-line
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/JSLinksComponent';
import { Control, TemplateFunction } from 'UI/Base';
import { JSLinks } from 'Application/Page';
import {aggregateJS} from 'UI/Deps';
import {default as TagMarkup} from 'UI/_base/HTML/_meta/TagMarkup';
import {fromJML} from 'UI/_base/HTML/_meta/JsonML';

export default class JSLinksComponent extends Control {
    _template: TemplateFunction = template;
    jslinksData: String = '';
    status: String = 'jslinsk has not been loaded';

    _beforeMount(options?: {}, context?: {}, receivedState?: unknown): Promise<void> | void {

        if (typeof window === 'undefined') {
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
        }
    }

    _afterMount(options?: {}, contexts?: unknown): void {
        // tslint:disable-next-line
        // @ts-ignore
        if (window.jslinkFlag) {
            this.status = 'jslinks has loaded successfully';
        }
    }
}
