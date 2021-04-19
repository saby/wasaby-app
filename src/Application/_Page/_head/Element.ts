///// <amd-module name="Application/_Page/_head/Element" />

import { IHeadTagAttrs, IHeadTagEventHandlers } from 'Application/_Interface/IHead';
import ElementPS, { IHeadElementType } from 'Application/_Page/_head/ElementPS';

export interface IElementRestoredData {
    name: string;
    attrs: IHeadTagAttrs;
    content: string;
    element: HTMLElement;
}

/**
 * Класс HTML элемента для вставки в head
 * Основной функционал реализован в родительском классе ElementPS.
 * В текущем, дочернем классе реализован метод для рендера элемента в DOM дереве.
 * @author Хамбелов М.И.
 */
export default class Element extends ElementPS {
    constructor(name?: string,
                attrs?: IHeadTagAttrs,
                content?: string,
                eventHandlers?: IHeadTagEventHandlers,
                element?: HTMLElement) {
        const data: IElementRestoredData = ElementPS._restoreElement(element);
        super(data.name || name, data.attrs || attrs, data.content || content, eventHandlers, element);
    }

    getType(): IHeadElementType {
        return Element.type;
    }

    /**
     * Меняет атрибуты элемента. Переопределенный метод
     * @param attrsChange {IHeadTagAttrs} Атрибуты для замены
     */
    changeTag(attrsChange: IHeadTagAttrs): void {
        const attrs = this.getAttrs();
        /* находим все свойства в оригинале и изменяемом объекте - если свойства нет в изменяемом
        удаляем его, если разные значения, то удаляем и создаем новое свойство, так нужно из-за
        специфики DOM*/
        const oldItems = Object.getOwnPropertyNames(attrs);
        const newItems = Object.getOwnPropertyNames(attrsChange);
        const allItems = Object.getOwnPropertyNames({ ...attrs, ...attrsChange });

        allItems.forEach((item) => {
            const isOld = oldItems.includes(item);
            const isNew = newItems.includes(item);
            if (isOld && isNew) {
                if (attrs[item] !== attrsChange[item]) {
                    this._element.removeAttribute(item);
                    delete attrs[item];
                    attrs[item] = attrsChange[item];
                    this._element.setAttribute(item, attrs[item]);
                }
            } else if (isOld) {
                this._element.removeAttribute(item);
                delete attrs[item];
            } else {
                attrs[item] = attrsChange[item];
                this._element.setAttribute(item, attrs[item]);
            }
        });
        this.setAttrs(attrs);
    }

    /** Метод отрисовки элемента в head в DOM-дереве.
     * Переопределенный метод от родительского класса.
     */
    protected _render(): void {
        if (this._element) {
            return;
        }

        /** проверяем создавался ли ранее элемент или нет */
        const element = document.createElement(this._name);
        element.innerHTML = this._content ? this._content : '';
        this._applyAttrs(element);
        document.head.appendChild(element);
        this._element = element;
        this._startEvents();
    }

    protected _startEvents() {
        if (this._eventHandlers?.load) {
            (this._element as HTMLLinkElement)
               .addEventListener('load', (this._eventHandlers.load as EventListener));
        }
        if (this._eventHandlers?.error) {
            this._element.addEventListener('error', (this._eventHandlers.error as EventListener));
        }
    }

    /** Метод удаления элемента из head в DOM-дереве.
     *  Переопределенный метод от родительского класса.
     */
    protected _removeElement(): void {
        document.head.removeChild(this._element);
    }

    static type: IHeadElementType = {
        isServer: false,
        isTitle: false,
        isViewPort: false
    }
}
