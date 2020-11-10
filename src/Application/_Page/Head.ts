///// <amd-module name="Application/_Page/Head" />

import * as AppEnv from 'Application/Env';
import { IHead, IHeadTagAttrs, IHeadTagEventHandlers, IHeadTagId, JML } from 'Application/_Interface/IHead'
import { IStore } from 'Application/_Interface/IStore';
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
export class Head implements IStore<Record<keyof IHead, any>> {
    private _elements: {[propName: string]: Element | ElementPS} = {};
    private _comments: Array<string> = [];
    private _noScriptUrl: string = null;
    private _id = 1;

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
        name: string,
        attrs: IHeadTagAttrs,
        content?: string,
        eventHandlers?: IHeadTagEventHandlers): IHeadTagId {

        for (const elementsKey in this._elements) {
            if (this._elements[elementsKey].isEqual(name, attrs, content, eventHandlers)) {
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
        this._elements[id].clear();
        delete this._elements[id];
    }

    getData(): Array<JML> {
        const noscript = this._generateNoScript();
        const result: Array<JML> = [].concat(noscript ? [noscript] : []);
        for (const elementsKey in this._elements) {
            result.push(this._elements[elementsKey].getData())
        }

        return result;
    }

    getComments(wrap: boolean): string[] {
        /** Важно не позволить случайно повредить исходный массив */
        return wrap ? this._comments.map((comment) => {
            return `<!--${comment}-->`;
        }) : this._comments.concat([]);
    }

    // #region IStore
    get<K extends keyof Head>(key: K): Head[K] {
        return this[key];
    }
    set<K extends keyof Head>(key: K, value: this[K]): boolean {
        try {
            this[key] = value;
            return true;
        } catch (_e) {
            return false;
        }
    }
    // tslint:disable-next-line:no-empty
    remove(): void { }
    getKeys(): Array<keyof Head> {
        return Object.keys(this) as Array<keyof Head>;
    }
    // tslint:disable-next-line:no-any
    toObject(): Record<keyof Head, any> {
        return Object.assign({}, this);
    }
    // #endregion

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

    private static creator(): Head {
        return new Head();
    }

    // tslint:disable-next-line:no-any
    static getInstance(): IStore<Record<keyof IHead, any>> | never {
        return AppEnv.getStore('HeadApi', Head.creator);
    }
}
