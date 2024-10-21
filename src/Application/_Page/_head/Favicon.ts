import BaseElement, { IPageTagElementAspect } from 'Application/_Page/_pageTagAPI/BaseElement';
import type { IPageTag, JML } from 'Application/_Page/_pageTagAPI/Interface';

/**
 * Аспект для уникального элемента типа Favicon
 * @author Печеркин С.В.
 * @remark
 * 1) Уникальность favicon:
 * На странице может быть только один уникальный favicon, уникальность определяется аттрибутом sizes.
 * т.е. на странице может быть несколько фавиконок, но каждая с уникальным значением sizes.
 * Фавиконка с отстутствующим sizes считается как отдельная уникальная фавиконка.
 * 2) Удаление, изменение favicon:
 * В случае разных иконок (разные значения href), но одинаковым размером (sizes),
 * в таком случае иконка со старым href не удаляется, а ее аттрибуты перезаписываются на новые.
 * Эти действия совершаются в другом месте (на момент написания коммента - в Application/_Page/_head/Element _render)
 * @private
 */
export default class FaviconAspect implements IPageTagElementAspect {
    constructor(private readonly _sizes: string = '') {}
    private _existingDOMElement: HTMLElement; /** ссылка на DOM-элемент */
    getUniqueKey(): boolean | string {
        return `Favicon${this._sizes}`;
    }
    isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean {
        return BaseElement.isEqual(thisTag, otherTag);
    }
    getData({ name, attrs, content, eventHandlers }: IPageTag): JML {
        return BaseElement.generateTag({ name, attrs, content, eventHandlers });
    }
    getDOMElement({ name }: IPageTag): HTMLElement {
        if (this._existingDOMElement) {
            return this._existingDOMElement;
        }
        /** Определяем условие поиска favicon в DOM дереве, когда задан размер и когда нет. */
        let predicate = (item: { attributes: NamedNodeMap }) => {
            return item.attributes.getNamedItem('sizes')?.value === this._sizes;
        };
        if (!this._sizes) {
            predicate = (item) => {
                return !item.attributes.getNamedItem('sizes');
            };
        }
        this._existingDOMElement = Array.from(
            document.head.querySelectorAll<HTMLElement>("link[rel*='icon']")
        ).find(predicate) as HTMLElement;
        if (!this._existingDOMElement) {
            this._existingDOMElement = document.createElement(name);
        }
        return this._existingDOMElement;
    }
    appendDomElement(element: HTMLElement): void {
        /** Прикрепляем к DOM дереву, если он не был прикреплен ранее */
        if (!element.parentNode) {
            document.head.appendChild(element);
        }
    }
    removeDOMElement(_element: HTMLElement): void {
        /** фавикон удалять нельзя */
        return;
    }
}
