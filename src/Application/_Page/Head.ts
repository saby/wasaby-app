///// <amd-module name="Application/_Page/Head" />

import * as AppEnv from 'Application/Env';
import { IHead, IHeadTagAttrs, IHeadTagEventHandlers, IHeadTagId, IInternalHead, JML } from 'Application/_Interface/IHead'
import { default as Element } from 'Application/_Page/_head/Element';
import { default as ElementPS } from 'Application/_Page/_head/ElementPS';

/** Стандартное время до обновления страницы. Используется внутри <noscript> */
const TIME_TO_REFRESH: Number = 2;
const PREFIX: string = typeof window === 'undefined' ? 'ps-' : '';

/**
 * API для работы с <head> страницы
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @author Печеркин С.В.
 */
// tslint:disable-next-line:no-any
export class Head implements IHead {
    private _elements: {[propName: string]: Element | ElementPS} = {};
    private _comments: Array<string> = [];
    private _noScriptUrl: string = null;
    private _id = 1;

    constructor() {
        this._collectTags();
    }

    /**
     * Важно собрать на клиенте всю информацию о тегах внутри head при инициализации Head API
     * @private
     */
    private _collectTags(): void {
        if (typeof document === 'undefined') { return; }

        Array.from(document.head.children)
            .forEach((item: HTMLElement) => {
                /** Нет смысла собирать noscript тег. В живой странице ты его не применишь. */
                if (item.tagName === 'NOSCRIPT') {
                    return
                }
                this._elements[this._generateGuid()] = new Element(null, null, null, null, item);
            })
    }

    createComment(text: string): void {
        if (this._comments.includes(text)) {
            const error = new Error('Application/_Page/Head duplicate comment:' +
                '\n\t' + text
            );
            throw new Error(error.stack);
        }

        this._comments.push(text);
    }

    createNoScript(url: string): void {
        this._noScriptUrl = url;
    }

    createTag(
        name: 'title',
        attrs: {},
        content: string): IHeadTagId;
    createTag(
        name: 'title',
        attrs: {class: string},
        content: string): IHeadTagId;
    createTag(
        name: 'script',
        attrs: {type: string},
        content: string): IHeadTagId;
    createTag(
        name: 'script',
        attrs: {type: string, src: string, key: string},
        content: string): IHeadTagId;
    createTag(
        name: 'script',
        attrs: {type: string, src: string, key: string},
        content: string,
        eventHandlers: IHeadTagEventHandlers): IHeadTagId;
    createTag(
        name: 'meta',
        attrs: {'http-equiv': string, content: string}): IHeadTagId;
    createTag(
        name: 'meta',
        attrs: {content: string, 'http-equiv': string, name: string, URL: string}): IHeadTagId;
    createTag(
        name: 'meta',
        attrs: {property: string, content: string, class: string}): IHeadTagId;
    createTag(
        name: 'link',
        attrs: {src: ''}
    ): IHeadTagId;
    createTag(
        name: 'link',
        attrs: {href: string, as: string, rel: string}
    ): IHeadTagId;
    createTag(
        name: 'link',
        attrs: IHeadTagAttrs,
        content: null,
        eventHandlers: IHeadTagEventHandlers
    ): IHeadTagId;
    createTag(
        name: string,
        attrs: IHeadTagAttrs,
        content?: string,
        eventHandlers?: IHeadTagEventHandlers): IHeadTagId {

        for (const elementsKey in this._elements) {
            if (this._elements[elementsKey].isEqual(name, attrs, content, eventHandlers)) {
                eventHandlers?.load();
                return elementsKey;
            }
        }
        const elementClass = typeof window === 'undefined' ? ElementPS : Element;
        const uuid = this._generateGuid();
        this._elements[uuid] = new elementClass(name, attrs, content, eventHandlers);

        return uuid;
    }
    getTag(name?: string, attrs?: IHeadTagAttrs): IHeadTagId | IHeadTagId[] | null {
        const result: IHeadTagId[] = [];

        for (const elementsKey in this._elements) {
            if (this._elements[elementsKey].isFit(name, attrs)) {
                result.push(elementsKey);
            }
        }

        if (!result.length) {
            return null;
        }
        if (result.length === 1) {
            return result.shift();
        }
        return result;
    }

    deleteTag(id: IHeadTagId): void {
        if (!this._elements[id]) {
            return
        }
        this._elements[id].clear();
        delete this._elements[id];
    }

    clear(): void {
        for (const elementsKey in this._elements) {
            this.deleteTag(elementsKey);
        }
        delete this._noScriptUrl;
        this._comments = [];
    }

    getData(id: IHeadTagId): JML;
    getData(): Array<JML>;
    getData(id?: IHeadTagId): Array<JML> | JML {
        if (id && this._elements[id]) {
            return this._elements[id].getData();
        }

        const noscript = this._generateNoScript();
        const result: Array<JML> = [].concat(noscript ? [noscript] : []);
        for (const elementsKey in this._elements) {
            result.push(this._elements[elementsKey].getData())
        }

        return result;
    }

    getComments(wrap?: boolean): string[] {
        /** Важно не позволить случайно повредить исходный массив */
        return wrap ? this._comments.map((comment) => {
            return `<!--${comment}-->`;
        }) : this._comments.concat([]);
    }

    // #region IStore
    get<K extends keyof IInternalHead>(key: string): IInternalHead[K] {
        return this[key];
    }
    set<K extends keyof IInternalHead>(key: string, value: IInternalHead[K]): boolean {
        try {
            this[key] = value;
            return true;
        } catch (_e) {
            return false;
        }
    }
    // tslint:disable-next-line:no-empty
    remove(): void { }
    getKeys(): Array<keyof IInternalHead> {
        return Object.keys(this) as Array<keyof IInternalHead>;
    }
    // tslint:disable-next-line:no-any
    toObject(): Record<keyof IInternalHead, any> {
        return Object.assign({}, this);
    }
    // #endregion

    /**
     * Возвращает аттрибуты тега
     * @param tagId {IHeadTagId} Идентификатор тега
     */
    getAttrs(tagId: IHeadTagId): IHeadTagAttrs | null {
        if (this._elements[tagId]) return this._elements[tagId].getAttrs();
        return null;
    }

    /* Меняет аттрибуты тега
     * @param tagId {IHeadTagId} Идентификатор тега
     * @param attrs {IHeadTagAttrs} Атрибуты для замены 
     */
    changeTag(tagId: IHeadTagId, attrs: IHeadTagAttrs): void {
       if (this._elements[tagId]) this._elements[tagId].changeTag(attrs);
       return null;
    }

    /**
     * Генератор noscript тега с содержимым, если был задан _noScriptUrl
     * @private
     */
    private _generateNoScript(): JML | null {
        if (!this._noScriptUrl) {
            return  null;
        }
        return [
            'noscript',
            ElementPS.generateTag({
                name: 'meta',
                attrs: {'http-equiv': 'refresh', 'content': `${TIME_TO_REFRESH}; URL=${this._noScriptUrl}`}
            })
        ]
    }

    /** Генератор уникального идентификатора для каждого тега */
    private _generateGuid(): IHeadTagId {
        return `head-${PREFIX}${this._id++}`;
    };

    private static _creator(): Head {
        return new Head();
    }

    static _instance: Head;

    /**
     * Сложилась очень сложная ситуация.
     * Она разгребается в задаче https://online.sbis.ru/opendoc.html?guid=a3203b23-b620-4ebc-bc7a-0a59cfec006b
     */
    static getInstance(): Head | never {
        if (typeof window !== 'undefined') {
            Head._instance = Head._instance || Head._creator();
            return Head._instance;
        }
        return <Head> AppEnv.getStore('HeadApi', Head._creator);
    }
}
