///// <amd-module name="Application/_Page/Head" />

import {IHeadTagAttrs, IHead, IHeadTag, IHeadTagId, IHeadTagEventHandlers, JML} from 'Application/_Interface/IHead'
import * as AppEnv from 'Application/Env';

/** Стандартное время до обновления страницы. Используется внутри <noscript> */
const TIME_TO_REFRESH = 2;

/**
 * API для работы с <head> страницы
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @author Печеркин С.В.
 */
class Head implements IHead {
    //TODO: Привязать один Head к одному App

    //TODO: дождаться реализации Element и ElementPS
    //private _elements: Array<null> = [];
    private _comments: Array<string> = [];
    private _noScriptUrl: string = null;
    //TODO: Временное решение для срочной задачи https://online.sbis.ru/doc/d4a880ac-2e2b-46d4-9843-cce486044787
    private _rawElements: {[propName: string]: IHeadTag} = {};
    private _prefix = typeof window === 'undefined' ? 'ps-' : '';
    private _id = 1;

    constructor() {
        this.createComment = this.createComment.bind(this)
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

    //TODO: Сейчас этим есть смысл пользоваться только на Presentation Service
    createTag(
        name: 'title',
        attrs: {},
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
        name: 'link',
        attrs: {src: ''}
    ): IHeadTagId;
    createTag(
        name: string,
        attrs: IHeadTagAttrs,
        content?: string,
        eventHandlers?: IHeadTagEventHandlers): IHeadTagId {

        const uuid = this._generateGuid();
        this._rawElements[uuid] = {name, attrs, content, eventHandlers};

        return uuid;
    }

    deleteTag(id: IHeadTagId): void {
        delete this._rawElements[id];
    }

    getData(): Array<JML> {
        const noscript = this._generateNoScript();
        const result: Array<JML> = [].concat(noscript ? [noscript] : []);
        for (const rawElementsKey in this._rawElements) {
            result.push(Head._generateTag(this._rawElements[rawElementsKey]))
        }

        return result;
    }

    getComments(wrap: boolean): string[] {
        /** Важно не позволить случайно повредить исходный массив */
        return wrap ? this._comments.map((comment) => {
            return `<!--${comment}-->`;
        }) : this._comments.concat([]);
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
            Head._generateTag({
                name: 'meta',
                attrs: {'http-equiv': 'refresh', 'content': `${TIME_TO_REFRESH}; URL=${this._noScriptUrl}`}
            })
        ]
    }

    /** Генератор уникального идентификатора для каждого тега */
    private _generateGuid(): IHeadTagId {
        return `head-${this._prefix}${this._id++}`;
    };

    /**
     * Генератор JML информации для тега.
     * @param data
     * @private
     */
    private static _generateTag(data: IHeadTag): JML {
        //TODO: Убрать этот патчинг в конце проекта. Ради избавления от data-vdomignore все и затевалось.
        data.attrs['data-vdomignore'] = true;
        const result: JML = [data.name];
        if (Object.keys(data.attrs).length) {
            result.push(data.attrs);
        }
        if (data.content) {
            result.push(data.content);
        }

        return result;
    };

    private static _instance: Head;

    static getInstance(): Head | never {
        if (!AppEnv.getStore('HeadApi')) {
            // @ts-ignore
            AppEnv.setStore('HeadApi', new Head());
        }
        // @ts-ignore
        return AppEnv.getStore('HeadApi');
    }
}

/*class HeadStore {
    constructor(private readonly storageKey: string) { }

    createComment<K extends keyof Head>(key: K): Head[K] {
        return AppEnv.getStore<Head>(this.storageKey, () => new Head()).createComment(key);
    }
}

export const headStore = new HeadStore('Head');*/
