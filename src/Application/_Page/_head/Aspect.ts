import { create } from 'Application/_Page/_head/Factory';
import BaseElement from 'Application/_Page/_pageTagAPI/BaseElement';
import {
    IPageTagAPIAspect,
    IPageTagAttrs,
    IPageTagElement,
    IPageTagEventHandlers,
    IPageTagId,
    JML,
    SERVER_ID_FIELD,
} from 'Application/_Page/_pageTagAPI/Interface';

/**
 * Интерфейс единицы данных спец. очереди тегов script, которые будут объединены в один тег script.
 * @private
 */
interface IMergeScript {
    name: 'script';
    attrs: IPageTagAttrs;
    content: string;
}

/** Стандартное время до обновления страницы. Используется внутри <noscript> */
const TIME_TO_REFRESH: Number = 2;
const PREFIX: string = typeof window === 'undefined' ? 'ps-' : '';

/**
 * Аспект для работы с <head> страницы.
 * @author Печеркин С.В.
 * @private
 */
export class HeadAspect implements IPageTagAPIAspect {
    private _comments: string[] = [];
    private _noScriptUrl: string = null;
    protected _id: number = 1;
    protected _mergeScripts: IMergeScript[] = [];

    createComment(text: string): void {
        if (this._comments.includes(text)) {
            const error = new Error(
                'Application/_Page/_head/Aspect duplicate comment:' +
                    '\n\t' +
                    text
            );
            throw new Error(error.stack);
        }

        this._comments.push(text);
    }

    createNoScript(url: string): void {
        if (!url) {
            throw new Error('Полученный url пустой');
        }
        this._noScriptUrl = url;
    }

    createTag(
        name: string,
        attrs: IPageTagAttrs,
        content: string,
        eventHandlers: IPageTagEventHandlers,
        elements: { [propName: string]: IPageTagElement }
    ): IPageTagElement {
        const newElement = create(name, attrs, content, eventHandlers);
        HeadAspect._ensureUniq(newElement, elements);
        return newElement;
    }

    createMergeTag(
        name: 'script',
        attrs: IPageTagAttrs,
        content: string
    ): void {
        this._mergeScripts.push({ name, attrs, content });
    }

    getComments(wrap?: boolean): string[] {
        // Важно не позволить случайно повредить исходный массив
        return wrap
            ? this._comments.map((comment) => {
                  return `<!--${comment}-->`;
              })
            : this._comments.concat([]);
    }

    getData(elements: { [propName: string]: IPageTagElement }): JML[] {
        this._addMergedScript(elements);
        const noscript = this._generateNoScript();
        const httpEquivId = HeadAspect._getHttpEquivId(elements);
        const priorityData: JML[] = [];
        let httpEquiv;

        const result: JML[] = [];
        // eslint-disable-next-line guard-for-in
        for (const elementsKey in elements) {
            if (elements[elementsKey].isImportant()) {
                priorityData.push(elements[elementsKey].getData());
                continue;
            }

            if (elementsKey === httpEquivId) {
                httpEquiv = elements[elementsKey].getData();
                continue;
            }

            result.push(elements[elementsKey].getData());
        }
        if (httpEquiv) {
            priorityData.unshift(httpEquiv);
        }
        if (noscript) {
            priorityData.unshift(noscript);
        }

        return priorityData.concat(result);
    }

    /**
     * Объединит все теги script из спец. очереди в один тег script, создаст один итоговый тег script
     * и добавит его в списко тегов для вставки в <head>
     */
    private _addMergedScript(elements: {
        [propName: string]: IPageTagElement;
    }): IPageTagElement {
        if (!this._mergeScripts.length) {
            return;
        }
        let attrs = { [SERVER_ID_FIELD]: this.generateGuid() };
        const content = [];
        this._mergeScripts
            // теги с аттрибутом important должны быть вначале объединенного тега script
            .sort((left, right) => {
                if (
                    left.attrs.important === 'true' &&
                    right.attrs.important !== 'true'
                ) {
                    return -1;
                }
                if (
                    left.attrs.important !== 'true' &&
                    right.attrs.important === 'true'
                ) {
                    return 1;
                }
                return 0;
            })
            .forEach((script: IMergeScript) => {
                attrs = { ...attrs, ...script.attrs };
                content.push(script.content);
            });
        elements[attrs[SERVER_ID_FIELD]] = this.createTag(
            'script',
            attrs,
            content.join('\n'),
            undefined,
            elements
        );
    }

    clear(): void {
        delete this._noScriptUrl;
        this._comments = [];
        this._mergeScripts = [];
    }

    /** Генератор уникального идентификатора для каждого тега */
    generateGuid(): IPageTagId {
        return `h-${PREFIX}${this._id++}`;
    }

    /**
     * Генератор noscript тега с содержимым, если был задан _noScriptUrl
     * @private
     */
    private _generateNoScript(): JML | null {
        if (!this._noScriptUrl) {
            return null;
        }
        return [
            'noscript',
            BaseElement.generateTag({
                name: 'meta',
                attrs: {
                    'http-equiv': 'refresh',
                    content: `${TIME_TO_REFRESH}; URL=${this._noScriptUrl}`,
                },
            }),
        ];
    }

    /* eslint-disable-next-line ,  */
    // eslint-disable-next-line max-len
    // https://stackoverflow.com/questions/11320069/internet-explorer-sending-different-user-agent-strings-to-different-sites
    private static _getHttpEquivId(elements: {
        [propName: string]: IPageTagElement;
    }): IPageTagId | null {
        for (const elementsKey in elements) {
            if (
                elements[elementsKey].isFit('meta', {
                    'http-equiv': 'X-UA-Compatible',
                    content: 'IE=edge',
                })
            ) {
                return elementsKey;
            }
        }

        return null;
    }

    /**
     * Перед добавлением нового элемента в набор необходимо обеспечить его уникальность в полном наборе
     * Сейчас уникальными должны быть следующие теги:
     * title (проверяется методом isTitle)
     * meta с параметрами для viewport (проверяется методом isViewPort)
     * @param element вновь созданный, но еще не добавленный элемент
     * @param elements весь набор элементов
     * @private
     */
    private static _ensureUniq(
        element: IPageTagElement,
        elements: { [propName: string]: IPageTagElement }
    ): void {
        const uniqueKey = element.getUniqueKey();
        if (!uniqueKey) {
            return;
        }

        for (const elementsKey in elements) {
            if (elements.hasOwnProperty(elementsKey)) {
                if (elements[elementsKey].getUniqueKey() === uniqueKey) {
                    elements[elementsKey].clear();
                    delete elements[elementsKey];
                }
            }
        }
    }
}
