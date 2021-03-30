import { Control, TemplateFunction } from 'UI/Base';
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/Index';
import {headDataStore, addPageDeps, aggregateCSS, handlePrefetchModules} from 'UI/Deps';
import {Head as AppHead} from 'Application/_Page/Head';
import {default as TagMarkup} from 'UI/_base/HTML/_meta/TagMarkup';
import {fromJML} from 'UI/_base/HTML/_meta/JsonML';
import {ICollectedDeps} from 'UI/_deps/HeadData';
// import {JSLinks} from 'Application/_Page/JSLinks';

/**
 * Точка входа для демонстрации AppBootstrapDemo
 */

export default class Index extends Control {
    protected _template: TemplateFunction = template;
    // private _JSLinksAPI: JSLinks = JSLinks.getInstance('BootstrapDemo');

    _beforeMount(opt, ctx, receivedState) {

        if(typeof window === 'undefined') {

            // const promise = headDataStore.read('waitAppContent')();
            // promise.then((res) => {
            //     console.log(res);
            // });
            // return new Promise<void>((resolve) => {
            //     def.then((res) => {
            //         this.additionalDeps = res.additionalDeps;
            //         resolve();
            //     });
            // });
            // return headDataStore.read('waitAppContent')()
            //     .then(({ js, css }) => {
            //         return new Promise<void>((resolve) => {
            //             aggregateCSS(options.theme, css.simpleCss, css.themedCss)
            //                 .then(() => { resolve(); })
            //                 .catch((error) => { onerror(error); resolve(); });
            //         }).then(() => {
            //             handlePrefetchModules(js);
            //             /**
            //              * Опросим HEAD API на предмет накопленного результата. Он будет массивом JML.
            //              * Обработаем и добавим его к headApiData
            //              * Напоминаю, что HEAD API это накопитель. Его дергают на протяжение всего процесса построения страницы
            //              */
            //             const data = AppHead.getInstance().getData();
            //             if (data && data.length) {
            //                 this.headApiData += new TagMarkup(data.map(fromJML), {getResourceUrl: false}).outerHTML;
            //             }
            //         });
            //     });
            // const def = headDataStore.read('waitAppContent')();
            // return new Promise<void>((resolve) => {
            //     def.then((res) => {
            //         this.additionalDeps = res.additionalDeps;
            //         resolve();
            //     });
            // });
            // headDataStore.read('setIncludedResources')({links: [], scripts: [{src: 'AppBootstrapDemo/resourceJSLinks.min.js'}]});
            // headDataStore.read('waitAppContent')().then((res)=>{
            //     console.log(res);
            // });
            // headDataStore.read('setIncludedResources')({links: [], scripts: [{src: 'AppBootstrapDemo/resourceJSLinks.min.js'}]})
            // headDataStore.read('collectDependencies')();
            // addPageDeps(['AppBootstrapDemo/ResourceJSLinks']);
            // this._JSLinksAPI.createTag('script', {key: 'resourcejslinks', type: 'text/javascript', defer: 'defer', src: 'AppBootstrapDemo/ResourceJSLinks'}, '');
            // console.log(this._JSLinksAPI.getData());
        }
    }
}
