import { location, logger } from 'Application/Env';
import { default as JSLinksElement } from 'Application/_Page/_jsLinks/JSLinksElement';
import {
    IPageTagAPIAspect,
    IPageTagAttrs,
    IPageTagElement,
    IPageTagEventHandlers,
    IPageTagId,
    JML,
} from 'Application/_Page/_pageTagAPI/Interface';

/**
 * Аспект для работы с тегами типа script страницы.
 * @author Печеркин С.В.
 * @private
 */
export class JSLinksAspect implements IPageTagAPIAspect {
    protected _id: number = 1;

    isCrossOrigin(src: string): boolean {
        return (
            (src.startsWith('//') || src.startsWith('http')) &&
            src.includes(`//${location.host}`)
        );
    }

    createComment(text: string): void {
        return;
    }

    createNoScript(url: string): void {
        return;
    }

    createTag(
        name: string,
        initialAttrs: IPageTagAttrs,
        content: string,
        eventHandlers: IPageTagEventHandlers,
        elements: { [propName: string]: IPageTagElement }
    ): IPageTagElement {
        const errorPrefix = 'Application/_Page/_jsLinks/Aspect';

        if (typeof window !== 'undefined') {
            logger.warn(
                `${errorPrefix} Вызывать метод createTag на клиенте запрещено.`
            );
            return;
        }
        if (name !== 'script') {
            throw new Error(
                `${errorPrefix} Вызывать метод createTag с параметром name, отличным от script запрещено`
            );
        }

        let attrs = initialAttrs;

        /**
         * при работе с rsSerialized, rtpackModuleNames пробрасывается только content, аттрибуты не требуются.
         * поэтому если контента нету, значит пробрасываем аттрибуты и дополняем необходимые, если они не пришли
         */
        if (!content) {
            attrs = {
                ...initialAttrs,
                type: initialAttrs.type ? initialAttrs.type : 'text/javascript',
                defer: initialAttrs.defer ? initialAttrs.defer : 'defer',
            };
        }

        if (attrs.src && this.isCrossOrigin(attrs.src)) {
            attrs.crossorigin = 'use-credentials';
        }

        return new JSLinksElement(name, attrs, content, eventHandlers);
    }

    createMergeTag(name: string, attrs: IPageTagAttrs, content: string): void {
        logger.error(
            new Error('Для скриптов в JSLinks API этот метод не реализован')
        );
    }

    getComments(wrap?: boolean): string[] {
        return [];
    }

    getData(elements: { [propName: string]: IPageTagElement }): JML[] {
        const result: JML[] = [];
        for (const elementsKey of Object.keys(elements)) {
            result.push(elements[elementsKey].getData());
        }
        return result;
    }

    clear(): void {
        return;
    }

    /** Генератор уникального идентификатора для каждого тега */
    generateGuid(): IPageTagId {
        return `s-${this._id++}`;
    }
}
