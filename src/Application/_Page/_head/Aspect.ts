///// <amd-module name="Application/_Page/_head/Aspect" />

import { create } from 'Application/_Page/_head/Factory';
import BaseElement from 'Application/_Page/_pageTagAPI/BaseElement';
import {
    IPageTagAPIAspect,
    IPageTagAttrs,
    IPageTagElement,
    IPageTagEventHandlers,
    IPageTagId,
    JML
} from 'Application/_Page/_pageTagAPI/Interface';

/** Стандартное время до обновления страницы. Используется внутри <noscript> */
const TIME_TO_REFRESH: Number = 2;
const PREFIX: string = typeof window === 'undefined' ? 'ps-' : '';

/**
 * Аспект для работы с <head> страницы.
 * @author Печеркин С.В.
 */
export class HeadAspect implements IPageTagAPIAspect {
    private _comments: string[] = [];
    private _noScriptUrl: string = null;
    protected _id: number = 1;

    createComment(text: string): void {
        if (this._comments.includes(text)) {
            const error = new Error('Application/_Page/_head/Aspect duplicate comment:' +
                '\n\t' + text
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
        elements: {[propName: string]: IPageTagElement}
    ): IPageTagElement {
        const newElement = create(name, attrs, content, eventHandlers);
        HeadAspect._ensureUniq(newElement, elements);
        return newElement
    }

    getComments(wrap?: boolean): string[] {
        /** Важно не позволить случайно повредить исходный массив */
        return wrap ? this._comments.map((comment) => {
            return `<!--${comment}-->`;
        }) : this._comments.concat([]);
    }
    getData(elements: {[propName: string]: IPageTagElement}): JML[] {
        const noscript = this._generateNoScript();
        const httpEquivId = HeadAspect._getHttpEquivId(elements);

        const result: JML[] = [];
        for (const elementsKey in elements) {
            if (elementsKey === httpEquivId) {
                result.unshift(elements[elementsKey].getData());
            } else {
                result.push(elements[elementsKey].getData());
            }
        }
        if (noscript) {
            result.unshift(noscript);
        }

        return result;
    }
    clear(): void {
        delete this._noScriptUrl;
        this._comments = [];
    }

    /** Генератор уникального идентификатора для каждого тега */
    generateGuid(): IPageTagId {
        return `head-${PREFIX}${this._id++}`;
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
            BaseElement.generateTag({
                name: 'meta',
                attrs: {'http-equiv': 'refresh', content: `${TIME_TO_REFRESH}; URL=${this._noScriptUrl}`}
            })
        ];
    }

    /**
     * Поддержка IE (Internet Explorer 11)
     * Очень важно помещать тег вида
     * <meta http-equiv="X-UA-Compatible" content="IE=edge" />
     * Сразу после открывающегося тега <head> (допустимо после noScript)
     * tslint:disable-next-line:max-line-length
     * @private
     */
    // tslint:disable-next-line:max-line-length
    // https://stackoverflow.com/questions/11320069/internet-explorer-sending-different-user-agent-strings-to-different-sites

    private static _getHttpEquivId(elements: {[propName: string]: IPageTagElement}): IPageTagId | null {
        for (const elementsKey in elements) {
            if (elements[elementsKey].isFit('meta', {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'})) {
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
    private static _ensureUniq(element: IPageTagElement, elements: {[propName: string]: IPageTagElement}): void {
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
