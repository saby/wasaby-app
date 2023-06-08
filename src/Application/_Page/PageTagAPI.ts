import {
    IPageTagAPI,
    IPageTagAPIAspect,
    IPageTagAPIInternal,
    IPageTagAttrs,
    IPageTagElement,
    IPageTagEventHandlers,
    IPageTagId,
    JML,
    KeyInternalPageTagAPI,
    SERVER_ID_FIELD,
} from 'Application/_Page/_pageTagAPI/Interface';

/**
 * API для работы с тегами страницы
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @class Application/_Page/PageTagAPI
 * @public
 * @implements Application/_Page/_pageTagAPI/IPageTagAPI
 * @author Печеркин С.В.
 */
export class PageTagAPI implements IPageTagAPI {
    protected _elements: { [propName: string]: IPageTagElement } = {};
    protected _aspect: IPageTagAPIAspect;

    createComment(text: string): void {
        this._aspect.createComment(text);
    }

    createNoScript(url: string): void {
        this._aspect.createNoScript(url);
    }

    createTag(
        name: 'title',
        attrs: {} | { class: string },
        content: string
    ): IPageTagId;
    createTag(
        name: 'script',
        attrs:
            | {}
            | { src: string }
            | { type: string }
            | { type: string; src: string; key: string }
            | { type: string; src: string; key: string; defer: 'defer' }
            | {
                  type: string;
                  src: string;
                  key: string;
                  defer: 'defer';
                  onerror: string;
              }
    );
    createTag(
        name: 'script',
        attrs:
            | {}
            | { src: string }
            | { type: string }
            | { type: string; src: string; key: string }
            | { type: string; src: string; key: string; defer: 'defer' },
        content: string,
        eventHandlers?: IPageTagEventHandlers
    ): IPageTagId;
    createTag(
        name: 'meta',
        attrs:
            | {}
            | { 'http-equiv': string; content: string }
            | { content: string; name: string }
            | {
                  content: string;
                  'http-equiv': string;
                  name: string;
                  URL: string;
              }
            | { property: string; content: string; class: string }
    ): IPageTagId;
    createTag(
        name: 'link',
        attrs:
            | { src: '' }
            | { href: string; as: string; rel: string }
            | { href: string; type: string; rel: string }
            | { href: string; as: string; rel: string; sizes: string }
            | { href: string; type: string; rel: string; sizes: string }
    ): IPageTagId;
    createTag(
        name: 'link',
        attrs: IPageTagAttrs,
        content: null,
        eventHandlers: IPageTagEventHandlers
    ): IPageTagId;
    createTag(
        name: 'style',
        attrs: {} | ({ scoped: 'scoped' } & IPageTagAttrs) | IPageTagAttrs,
        content: string,
        eventHandlers?: IPageTagEventHandlers
    ): IPageTagId;
    createTag(
        name: string,
        attrs: IPageTagAttrs,
        content?: string,
        eventHandlers?: IPageTagEventHandlers
    ): IPageTagId {
        for (const elementsKey in this._elements) {
            if (this._elements[elementsKey].isEqual(name, attrs, content)) {
                eventHandlers?.load();
                return elementsKey;
            }
        }
        attrs[SERVER_ID_FIELD] = this._aspect.generateGuid();

        this._elements[attrs[SERVER_ID_FIELD]] = this._aspect.createTag(
            name,
            attrs,
            content,
            eventHandlers,
            this._elements
        );

        return attrs[SERVER_ID_FIELD];
    }

    /**
     * Добавит в спец. очередь данные о теге script.
     * При вставке такого тега в <head>, объединит все данные из очереди в один общий тег.
     * Актуально только на СП.
     * @hidden
     */
    createMergeTag(
        name: 'script',
        attrs: IPageTagAttrs,
        content: string
    ): void {
        if (typeof window !== 'undefined' || !content) {
            return;
        }
        this._aspect.createMergeTag(name, attrs, content);
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
            if (this._elements.hasOwnProperty(elementsKey)) {
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
    get<K extends keyof IPageTagAPIInternal>(
        key: string
    ): IPageTagAPIInternal[K] {
        return this[key];
    }
    set<K extends keyof IPageTagAPIInternal>(
        key: string,
        value: IPageTagAPIInternal[K]
    ): boolean {
        try {
            this[key] = value;
            return true;
        } catch (_e) {
            return false;
        }
    }
    // eslint-disable-next-line no-empty, no-empty-function, @typescript-eslint/no-empty-function
    remove(): void {}
    getKeys(): KeyInternalPageTagAPI[] {
        return Object.keys(this) as KeyInternalPageTagAPI[];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toObject(): Record<keyof IPageTagAPIInternal, any> {
        return { ...this };
    }
    // #endregion
}
