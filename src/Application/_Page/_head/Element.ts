import BaseElement, { IPageTagElementAspect } from 'Application/_Page/_pageTagAPI/BaseElement';
import type { IPageTagAttrs, IPageTagEventHandlers } from 'Application/_Page/_pageTagAPI/Interface';

export interface IElementRestoredData {
    name: string;
    attrs: IPageTagAttrs | null;
    content: string;
    element?: HTMLElement;
}

/**
 * Класс HTML элемента для вставки в head
 * Основной функционал реализован в родительском классе ElementPS.
 * В текущем, дочернем классе реализован метод для рендера элемента в DOM дереве.
 * @author Печеркин С.В.
 * @private
 */
export default class Element extends BaseElement {
    constructor(
        name: string,
        attrs: IPageTagAttrs,
        content?: string,
        eventHandlers?: IPageTagEventHandlers,
        aspect?: IPageTagElementAspect,
        hydrateElement?: HTMLElement
    ) {
        const data: IElementRestoredData = Element._restoreElement(hydrateElement);
        super(
            data.name || name,
            data.attrs || attrs,
            data.content || content,
            eventHandlers,
            aspect,
            hydrateElement
        );
    }

    changeTag(attrsChange: IPageTagAttrs): void {
        const attrs = this.getAttrs();
        /* находим все свойства в оригинале и изменяемом объекте - если свойства нет в изменяемом
        удаляем его, если разные значения, то удаляем и создаем новое свойство, так нужно из-за
        специфики DOM*/
        const oldItems = Object.getOwnPropertyNames(attrs);
        const newItems = Object.getOwnPropertyNames(attrsChange);
        const allItems: string[] = Object.getOwnPropertyNames({
            ...attrs,
            ...attrsChange,
        });

        allItems.forEach((item) => {
            const isOld = oldItems.includes(item);
            const isNew = newItems.includes(item);
            if (isOld && isNew) {
                if (
                    attrs[item as keyof IPageTagAttrs] !== attrsChange[item as keyof IPageTagAttrs]
                ) {
                    this._element.removeAttribute(item);
                    delete attrs[item as keyof IPageTagAttrs];
                    attrs[item as keyof IPageTagAttrs] = attrsChange[item as keyof IPageTagAttrs];
                    this._element.setAttribute(item, attrs[item as keyof IPageTagAttrs] as string);
                }
            } else if (isOld) {
                this._element.removeAttribute(item);
                delete attrs[item as keyof IPageTagAttrs];
            } else {
                attrs[item as keyof IPageTagAttrs] = attrsChange[item as keyof IPageTagAttrs];
                this._element.setAttribute(item, attrs[item as keyof IPageTagAttrs] as string);
            }
        });
        this.setAttrs(attrs);
    }

    isImportant(): boolean {
        return this._attrs.important === 'true';
    }

    /** Метод отрисовки элемента в head в DOM-дереве.
     * Переопределенный метод от родительского класса.
     */
    protected _render(): void {
        if (this._hydratedElement) {
            this._element = this._hydratedElement;
            return;
        }

        const element = this._aspect.getDOMElement(this.toPageTag());
        this._applyAttrs(element);
        if (this._content) {
            element.textContent = this._content;
        }
        this._aspect.appendDomElement(element);
        this._element = element;
        this._startEvents();
    }

    /**
     * Применение атрибутов на DOM элемент
     * @param element
     * @protected
     */
    protected _applyAttrs(element: HTMLElement): void {
        for (const [key, value] of Object.entries(this._attrs)) {
            element.setAttribute(key, value);
        }
    }

    protected _startEvents() {
        if (this._eventHandlers?.load) {
            (this._element as HTMLLinkElement).addEventListener(
                'load',
                this._eventHandlers.load as EventListener
            );
        }
        if (this._eventHandlers?.error) {
            this._element.addEventListener('error', this._eventHandlers.error as EventListener);
        }
    }

    protected _removeElement(): void {
        this._aspect.removeDOMElement(this._element);
        // @ts-ignore delete следует указывать для опциональных переменных, но по типам _element обязательный
        delete this._element;
    }

    /**
     * Есть 2 путя создать инстанс класса Element:
     * Из мета информации или из реального DOM элемента.
     * Еси из реального элемента, надо восстановить мета информацию.
     * Когда это используется? При оживлении страницы, чтобы Head API собрал информацию, вставленную на серваке.
     * @private
     */
    protected static _restoreElement(element?: HTMLElement): IElementRestoredData {
        const result: IElementRestoredData = {
            name: '',
            attrs: null,
            content: '',
            element,
        };

        if (element) {
            result.attrs = Element.getElementAttrs(element);
            result.name = element.tagName.toLowerCase();
            result.content = element.textContent as string;
        }

        return result;
    }

    /**
     * Вернет все атрибуты у тега
     * @param element
     */
    static getElementAttrs(element?: HTMLElement): IPageTagAttrs {
        const result: Record<string, unknown> = {};
        if (element) {
            Array.prototype.slice.call(element.attributes).forEach((attr) => {
                result[attr.name] = attr.value;
            });
        }

        return result;
    }
}
