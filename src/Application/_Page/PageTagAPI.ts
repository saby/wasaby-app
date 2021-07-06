///// <amd-module name="Application/_Page/PageTagAPI" />

import type {
    IPageTagAPI,
    IPageTagAPIAspect,
    IPageTagAPIInternal,
    IPageTagAttrs,
    IPageTagElement,
    IPageTagEventHandlers,
    IPageTagId,
    JML,
    KeyInternalPageTagAPI
} from 'Application/_Page/_pageTagAPI/Interface';

/**
 * API для работы с тегами страницы
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @author Печеркин С.В.
 */
export class PageTagAPI implements IPageTagAPI {
    protected _elements: {[propName: string]: IPageTagElement} = {};
    protected _aspect: IPageTagAPIAspect;

    createComment(text: string): void {
        this._aspect.createComment(text);
    }

    createNoScript(url: string): void {
        this._aspect.createNoScript(url);
    }

    createTag(
        name: 'title',
        attrs: {} | {class: string},
        content: string): IPageTagId;
    createTag(
        name: 'script',
        attrs: {}
            | {src: string}
            | {type: string}
            | {type: string, src: string, key: string}
            | {type: string, src: string, key: string, defer: 'defer'}
    )
    createTag(
        name: 'script',
        attrs: {}
            | {src: string}
            | {type: string}
            | {type: string, src: string, key: string}
            | {type: string, src: string, key: string, defer: 'defer'},
        content: string): IPageTagId;
    createTag(
        name: 'script',
        attrs: {}
            | {src: string}
            | {type: string}
            | {type: string, src: string, key: string}
            | {type: string, src: string, key: string, defer: 'defer'},
        content: string,
        eventHandlers: IPageTagEventHandlers): IPageTagId;
    createTag(
        name: 'meta',
        attrs: {}
            | {'http-equiv': string, content: string}
            | {content: string, name: string}
            | {content: string, 'http-equiv': string, name: string, URL: string}
            | {property: string, content: string, class: string}): IPageTagId;
    createTag(
        name: 'link',
        attrs: {src: ''} | {href: string, as: string, rel: string}): IPageTagId;
    createTag(
        name: 'link',
        attrs: IPageTagAttrs,
        content: null,
        eventHandlers: IPageTagEventHandlers
    ): IPageTagId;
    createTag(
        name: string,
        attrs: IPageTagAttrs,
        content?: string,
        eventHandlers?: IPageTagEventHandlers): IPageTagId {

        for (const elementsKey in this._elements) {
            if (this._elements[elementsKey].isEqual(name, attrs, content)) {
                eventHandlers?.load();
                return elementsKey;
            }
        }
        const uuid = this._aspect.generateGuid();
        // TODO: JSLinks подтянуть под аспекты
        this._elements[uuid] = this._aspect.createTag(name, attrs, content, eventHandlers, this._elements);

        return uuid;
    }

    getAttrs(tagId: IPageTagId): IPageTagAttrs | null {
        if (this._elements[tagId]) {
            return this._elements[tagId].getAttrs();
        }
        return null;
    }

    changeTag(tagId: IPageTagId, attrs: IPageTagAttrs): void {
        if (this._elements[tagId]) {
            this._elements[tagId].changeTag(attrs);
        }
    }

    deleteTag(id: IPageTagId): void {
        if (!this._elements[id]) {
            return;
        }
        this._elements[id].clear();
        delete this._elements[id];
    }

    clear(): void {
        for (const elementsKey in this._elements) {
            if (this._elements.hasOwnProperty(elementsKey)){
                this.deleteTag(elementsKey);
            }
        }

        this._aspect.clear();
    }

    getData(id: IPageTagId): JML;
    getData(): JML[];
    getData(id?: IPageTagId): JML[] | JML {
        if (id && this._elements[id]) {
            return this._elements[id].getData();
        }

        return this._aspect.getData(this._elements);
    }

    getComments(wrap?: boolean): string[] {
        return this._aspect.getComments(wrap);
    }

    // #region IStore
    get<K extends keyof IPageTagAPIInternal>(key: string): IPageTagAPIInternal[K] {
        return this[key];
    }
    set<K extends keyof IPageTagAPIInternal>(key: string, value: IPageTagAPIInternal[K]): boolean {
        try {
            this[key] = value;
            return true;
        } catch (_e) {
            return false;
        }
    }
    // tslint:disable-next-line:no-empty
    remove(): void { }
    getKeys(): KeyInternalPageTagAPI[] {
        return Object.keys(this) as KeyInternalPageTagAPI[];
    }
    // tslint:disable-next-line:no-any
    toObject(): Record<keyof IPageTagAPIInternal, any> {
        return Object.assign({}, this);
    }
    // #endregion
}
