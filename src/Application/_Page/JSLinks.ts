///// <amd-module name="Application/_Page/JSLinks" />

import * as AppEnv from 'Application/Env';
import { Head as HeadAPI } from 'Application/_Page/Head';
import type { IHeadTagAttrs, IHeadTagEventHandlers, IHeadTagId, JML } from 'Application/_Page/_head/IHead';
import type { IJSLinks, IJSLinksInternal, JSLinksTagId, KeyJSLinksInternal } from 'Application/_Page/_jslinks/IJSLinks';
import { default as JSLinksElement } from 'Application/_Page/_jslinks/JSLinksElement';

/**
 * API для работы jslinks, отнаследованный от HeadAPI
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @author Хамбелов М.И.
 */
export class JSLinks extends HeadAPI implements IJSLinks {
    _elements: {[propName: string]: JSLinksElement } = {};
    _id: number = 0;
    createTag(
        name: string,
        initialAttrs?: IHeadTagAttrs,
        content?: string,
        eventHandlers?: IHeadTagEventHandlers): IHeadTagId {

        if (typeof window !== 'undefined') {
            AppEnv.logger.warn('Вызывать метод createTag на клиенте запрещено.');
            return;
        }
        if (name !== 'script') {
            throw new Error('Вызывать метод JSLinks API с параметром name, отличным от script запрещено');
        }
        let attrs = initialAttrs;
        /**
         * при работе с rsSerialized, rtpackModuleNames пробрасывается только content, аттрибуты не требуются.
         * поэтому если контента нету, значит пробрасываем аттрибуты и дополняем необходимые, если они не пришли
         */
        if (!content) {
            attrs = {
                ...initialAttrs,
                type: initialAttrs.type ? initialAttrs.type : 'text/javascript' ,
                defer:  initialAttrs.defer ? initialAttrs.defer : 'defer'
            };
        }
        for (const elementsKey in this._elements) {
            if (this._elements[elementsKey].isEqual(name, attrs, content, eventHandlers)) {
                eventHandlers?.load();
                return elementsKey;
            }
        }
        const uuid = this._generateGuid();
        this._elements[uuid] = new JSLinksElement(name, attrs, content, eventHandlers);
        return uuid;
    }
    getTag(name?: 'script', attrs?: IHeadTagAttrs): JSLinksTagId | JSLinksTagId[] | null {
        return super.getTag(name, attrs);
    }
    getData(id: IHeadTagId): JML;
    getData(): JML[];
    getData(id?: IHeadTagId): JML[] | JML {
        if (id && this._elements[id]) {
            return this._elements[id].getData();
        }
        const result: JML[] = [];
        for (const elementsKey of Object.keys(this._elements)) {
            result.push(this._elements[elementsKey].getData());
        }
        return result;
    }
    // #region IStore
    get<K extends keyof IJSLinksInternal>(key: string): IJSLinksInternal[K] {
        return this[key];
    }
    set<K extends keyof IJSLinksInternal>(key: string, value: IJSLinksInternal[K]): boolean {
        try {
            this[key] = value;
            return true;
        } catch (_e) {
            return false;
        }
    }
    // tslint:disable-next-line:no-empty
    remove(): void { }
    getKeys(): KeyJSLinksInternal[] {
        return Object.keys(this) as KeyJSLinksInternal[];
    }
    // tslint:disable-next-line:no-any
    toObject(): Record<keyof IJSLinksInternal, any> {
        return Object.assign({}, this);
    }
    // #endregion
    /* tslint:disable:no-empty */
    createComment(): void {}
    createNoScript(): void {}
    /* tslint:enable:no-empty */
    protected _generateGuid(): JSLinksTagId {
        return `scripts-${this._id++}`;
    }
    static _instance: JSLinks;
    static _creator(): JSLinks {
        return new JSLinks();
    }
    static getInstance(nameSpace: string = 'root'): JSLinks | never {
        if (typeof window !== 'undefined') {
            JSLinks._instance = JSLinks._instance || JSLinks._creator();
            return JSLinks._instance;
        }
        return AppEnv.getStore(`JSLinksAPI_${nameSpace}`, JSLinks._creator) as JSLinks;
    }
}
