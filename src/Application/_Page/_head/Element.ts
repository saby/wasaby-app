import ElementPS from 'Application/_Page/_head/ElementPS';
import { TAGS_PRIOR } from 'Application/_Page/_head/ElementPS';

/**
 * Класс HTML элемента для вставки в head
 * Основной функционал реализован в родительском классе ElementPS.
 * В текущем, дочернем классе реализован метод для рендера элемента в DOM дереве.
 * @author Хамбелов М.И.
 */
export default class Element extends ElementPS {

    _render(): void {
        let element;
        if (!this._element) {
            element = document.createElement(this._name);
        }
        for (const [key, value] of Object.entries(this._attrs)) {
            element.setAttribute(key, value);
        }
        if (this._content) {
            element.innerHTML = `${this._content}`;
        }
        document.head.appendChild(element);
        element.addEventListener('load', this._eventHandlers.load);
        element.addEventListener('error', this._eventHandlers.error);
        this._element = element;
    }

    protected _removeElement() {
        document.head.removeChild(this._element);
        delete this._element;
    }
}
