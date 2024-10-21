import BaseElement, { IPageTagElementAspect } from 'Application/_Page/_pageTagAPI/BaseElement';
import type { IPageTag, JML } from 'Application/_Page/_pageTagAPI/Interface';

/**
 * Аспект для уникального элемента типа title
 * @author Печеркин С.В.
 * @private
 */
export default class TitleAspect implements IPageTagElementAspect {
    getUniqueKey(): boolean | string {
        return 'Title';
    }
    isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean {
        if (BaseElement.isServer) {
            return BaseElement.isEqual(thisTag, otherTag);
        }
        return document.title === otherTag.content;
    }
    // @ts-ignore
    getDOMElement({ name, content }: IPageTag): HTMLElement {
        document.title = content || '';
        return document.head.querySelector('title') as HTMLElement;
    }
    appendDomElement(_element: HTMLElement) {
        // У нас уже есть тег title, который лежит в DOM дереве
        return;
    }
    removeDOMElement(_element: HTMLElement): void {
        // Нельзя оставлять страницу без заголовка
        return;
    }
    // @ts-ignore
    getData({ name, attrs, content, eventHandlers }: IPageTag): JML {
        // В момент генерации информации убираем из title все атрибуты
        return BaseElement.generateTag({
            name,
            attrs: {},
            content,
            eventHandlers,
        });
    }
}
