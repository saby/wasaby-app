///// <amd-module name="Application/_Page/_head/Element" />

import { IHeadTagAttrs, IHeadTagEventHandlers } from 'Application/_Interface/IHead';
import ElementPS from 'Application/_Page/_head/ElementPS';

interface IElementRestoredData {
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
        const data: IElementRestoredData = Element._restoreElement(element);
        super(data.name || name, data.attrs || attrs, data.content || content, eventHandlers, element);
    }

    /** Переопределенный метод для проверки тэга на идентичность.
     * в текущем переопределенном методе отдельно сравнивается title напрямую в DOM,
     * в отличии от родительского, в котором сравниваются по метаданным.
     * title проверяется только по контенту.
     */
    isEqual(name: string,
            attrs: IHeadTagAttrs,
            content?: string,
            eventHandlers?: IHeadTagEventHandlers): boolean{
        if (this._isTitle()) {
            return document.title === content;
        }
        return super.isEqual(name, attrs, content, eventHandlers);
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
        let oldItems = Object.getOwnPropertyNames(attrs);
        let newItems = Object.getOwnPropertyNames(attrsChange);
        let allItems = Object.getOwnPropertyNames({ ...attrs, ...attrsChange });

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
        })
        this.setAttrs(attrs);
    }

    /** Метод отрисовки элемента в head в DOM-дереве.
     * Переопределенный метод от родительского класса.
     */
    protected _render(): void {
        if (this._element) {
            return;
        }
        const title = this._isTitle() ? document.head.querySelector('title') : null;
        /** если в DOM дереве существует title и текущий элемент - title,
         *  в таком случае меняем только content у title в DOM дереве
         */
        if (title) {
            document.title = this._content ? this._content : '';
            return;
        }

        /** проверяем создавался ли ранее элемент или нет */
        const element = this._element ? this._element : document.createElement(this._name);
        element.innerHTML = this._content ? this._content : '';
        for (const [key, value] of Object.entries(this._attrs)) {
            element.setAttribute(key, value);
        }
        //TODO: убрать после реалзации старта от div
        element.setAttribute('data-vdomignore', 'true');
        document.head.appendChild(element);
        if (this._eventHandlers?.load) {
            (element as HTMLLinkElement)
                .addEventListener('load', (this._eventHandlers.load as EventListener));
        }
        if (this._eventHandlers?.error) {
            element.addEventListener('error', (this._eventHandlers.error as EventListener));
        }
        this._element = element;
    }

    /** Метод удаления элемента из head в DOM-дереве.
     *  Переопределенный метод от родительского класса.
     *  Нельзя оставлять страницу с пустым title - это приводит к морганию заголовка
     */
    protected _removeElement(): void {
        if (!this._isTitle()) {
            document.head.removeChild(this._element);
        }
        delete this._element;
    }

    /**
     * Есть 2 путя создать инстанс класса Element:
     * Из мета информации или из реального DOM элемента.
     * Еси из реального элемента, надо восстановить мета информацию.
     * Когда это используется? При оживлении страницы, чтобы Head API собрал информацию, вставленную на серваке.
     * @private
     */
    private static _restoreElement(element?: HTMLElement): IElementRestoredData {
        const result: IElementRestoredData = {
            name: '',
            attrs: null,
            content: '',
            element
        };

        if (element) {
            result.attrs = {};
            result.name = element.tagName.toLowerCase();
            result.attrs = {};
            Array.prototype.slice.call(element.attributes).forEach((attr) => {
                result.attrs[attr.name] = attr.value;
            })
            result.content = element.innerText;
        }

        return result
    }
}
