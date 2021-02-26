import * as AppEnv from 'Application/Env';
import { IHeadTagAttrs, IHeadTagEventHandlers, IHeadTagId } from 'Application/_Interface/IHead';
import { IJSLinks, IJSLinksInternal, JSLinksTagId } from 'Application/_Interface/IJSLinks';
import { Head as HeadAPI } from 'Application/_Page/Head';
import { default as JSLinksElement } from 'Application/_Page/_jslinks/JSLinksElement';

/**
 * API для работы jslinks, отнаследованный от HeadAPI
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @author Хамбелов М.И.
 */
export default class JSLinks extends HeadAPI implements IJSLinks {
    _elements: {[propName: string]: JSLinksElement } = {};
    _id = 0;
    createTag(
        name: string,
        attrs?: IHeadTagAttrs,
        content?: string,
        eventHandlers?: IHeadTagEventHandlers): IHeadTagId {

        if (typeof window !== 'undefined') {
            AppEnv.logger.warn('Вызывать метод createTag на клиенте запрещено.');
            return;
        }
        if (name !== 'script') {
            throw new Error('Вызывать метод JSLinks API с параметром name, отличным от script запрещено');
        }
        /**
         * при работе с rsSerialized, rtpackModuleNames пробрасывается только content, аттрибуты не требуются.
         * поэтому если контента нету, значит пробрасываем аттрибуты и дополняем необходимые, если они не пришли
         */
        if (!content) {
            attrs = {
                ...attrs,
                type: attrs.type ? attrs.type : 'text/javascript' ,
                defer:  attrs.defer ? attrs.defer : 'defer'
            }
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
    getKeys(): Array<keyof IJSLinksInternal> {
        return Object.keys(this) as Array<keyof IJSLinksInternal>;
    }
    // tslint:disable-next-line:no-any
    toObject(): Record<keyof IJSLinksInternal, any> {
        return Object.assign({}, this);
    }
    // #endregion
    /* tslint:disable:no-empty */
    createComment(): void {};
    createNoScript(): void {};
    /* tslint:enable:no-empty */
    _generateGuid(): JSLinksTagId {
        return `scripts-${this._id++}`;
    };
    static _creator(): JSLinks {
        return new JSLinks();
    }
    static _instance: JSLinks;
    static getInstance(nameSpace: string = 'root'): JSLinks | never {
        if (typeof window !== 'undefined') {
            JSLinks._instance = JSLinks._instance || JSLinks._creator();
            return JSLinks._instance;
        }
        return <JSLinks> AppEnv.getStore(`JSLinksAPI_${nameSpace}`, JSLinks._creator);
    }
}
