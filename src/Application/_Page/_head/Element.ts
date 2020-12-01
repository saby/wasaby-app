///// <amd-module name="Application/_Page/_head/Element" />

import { IHeadTagAttrs, IHeadTagEventHandlers } from 'Application/_Interface/IHead';
import ElementPS from 'Application/_Page/_head/ElementPS';

/**
 * Класс HTML элемента для вставки в head
 * Основной функционал реализован в родительском классе ElementPS.
 * В текущем, дочернем классе реализован метод для рендера элемента в DOM дереве.
 * @author Хамбелов М.И.
 */
export default class Element extends ElementPS {

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

    /** Метод отрисовки элемента в head в DOM-дереве.
     * Переопределенный метод от родительского класса.
     */
    protected _render(): void {
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
}
