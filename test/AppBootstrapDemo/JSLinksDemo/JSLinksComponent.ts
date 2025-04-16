// eslint-disable-next-line
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/JSLinksDemo/JSLinksComponent';
import { JSLinks } from 'Application/Page';
import { Control, TemplateFunction, TagMarkup, fromJML } from 'UI/Base';
import { constants } from 'Env/Constants';
import * as ModulesLoader from 'WasabyLoader/ModulesLoader';

export default class JSLinksComponent extends Control {
    _template: TemplateFunction = template;
    jslinksData: String = '';
    status: String = 'waiting';
    isBuildnumberString: string = '';
    buildnumber: string = '';

    _beforeMount(options?: {}, context?: {}, receivedState?: unknown): Promise<void> | void {
        if (!constants.isBrowserPlatform) {
            const JSLinksAPI = JSLinks.getInstance();
            JSLinksAPI.createTag('script', {
                src: ModulesLoader.getModuleUrl('AppBootstrapDemo/JSLinksDemo/JSLinksResource.js'),
            });
            this.jslinksData += new TagMarkup(JSLinksAPI.getData().map(fromJML), {
                getResourceUrl: false,
            }).outerHTML;
            return;
        }
        /* eslint-disable */
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
