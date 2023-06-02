import BaseElement, {
    IPageTagElementAspect,
} from 'Application/_Page/_pageTagAPI/BaseElement';
import type { IPageTag, JML } from 'Application/_Page/_pageTagAPI/Interface';

/**
 * Аспект для уникального элемента типа meta с параметрами для viewport
 * @author Печеркин С.В.
 * @private
 */
export default class ViewPortAspect implements IPageTagElementAspect {
    getUniqueKey(): boolean | string {
        return 'ViewPort';
    }
    isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean {
        return BaseElement.isEqual(thisTag, otherTag);
    }
    getData({ name, attrs, content, eventHandlers }: IPageTag): JML {
        return BaseElement.generateTag({ name, attrs, content, eventHandlers });
    }
    getDOMElement({ name }: IPageTag): HTMLElement | undefined {
        let viewPort = document.head.querySelector<HTMLElement>(
            'meta[name=viewport]'
        );
        if (!viewPort) {
            viewPort = document.createElement(name);
            document.head.appendChild(viewPort);
        }
        return viewPort;
    }
    appendDomElement(element: HTMLElement) {
        return;
    }
    removeDOMElement(element: HTMLElement): void {
        /** Нельзя оставлять страницу без информации о viewport */
        return;
    }
}
