///// <amd-module name="Application/_Page/_head/Element" />

import ElementPS from 'Application/_Page/_head/ElementPS';

/**
 * Класс HTML элемента для вставки в head
 * Основной функционал реализован в родительском классе ElementPS.
 * В текущем, дочернем классе реализован метод для рендера элемента в DOM дереве.
 * @author Хамбелов М.И.
 */
export default class Element extends ElementPS {

    _render(): void {
        const element = document.createElement(this._name);
        for (const [key, value] of Object.entries(this._attrs)) {
            element.setAttribute(key, value);
        }
        element.innerHTML = `${this._content}`;
        document.head.appendChild(element);
        element.addEventListener('load', this._eventHandlers.load.bind(this));
        element.addEventListener('error', this._eventHandlers.error.bind(this));
    }
}
