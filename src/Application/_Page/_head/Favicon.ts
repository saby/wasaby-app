///// <amd-module name="Application/_Page/_head/Favicon" />

import BaseElement, { IPageTagElementAspect } from 'Application/_Page/_pageTagAPI/BaseElement';
import type { IPageTag, JML } from 'Application/_Page/_pageTagAPI/Interface';

/**
 * Аспект для уникального элемента типа Favicon
 * @author Печеркин С.В.
 */
export default class FaviconAspect implements IPageTagElementAspect {
    getUniqueKey(): boolean | string {
        return 'Favicon';
    }
    isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean {
        return BaseElement.isEqual(thisTag, otherTag);
    }
    getData({name, attrs, content, eventHandlers}: IPageTag): JML {
        return BaseElement.generateTag({name, attrs, content, eventHandlers});
    }
    getDOMElement({name}: IPageTag): HTMLElement | undefined {
        let favicon = document.head.querySelector<HTMLElement>('link[rel~=\'icon\']');
        if (!favicon) {
            favicon = document.createElement(name);
            document.head.appendChild(favicon);
        }
        return favicon;
    }
    appendDomElement(element: HTMLElement) {
        return;
    }
    removeDOMElement(element: HTMLElement): void {
        /** Нельзя оставлять страницу без favicon */
        return;
    }
}
