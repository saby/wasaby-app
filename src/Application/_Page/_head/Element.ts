///// <amd-module name="Application/_Page/_head/Element" />

import ElementPS from 'Application/_Page/_head/ElementPS';

/**
 * Класс HTML элемента для вставки в head
 * Основной функционал реализован в родительском классе ElementPS.
 * В текущем, дочернем классе реализован метод для рендера элемента в DOM дереве.
 * @author Хамбелов М.И.
 */
export default class Element extends ElementPS {

    /** Метод отрисовки элемента в head в DOM-дереве.
     * Переопределенный метод от родительского класса.
     */
    protected _render(): void {
        const title = this._name === 'title' ? document.head.querySelector('title') : null;
        /** если в DOM дереве существует title и текущий элемент - title,
         *  в таком случае меняем только content у title в DOM дереве
         */
        if (title){
            title.innerHTML = this._content ? this._content : '';
        }
        else {
            /** проверяем создавался ли ранее элемент или нет */
            const element = this._element ? this._element : document.createElement(this._name);

            element.innerHTML = this._content ? this._content : '';
            for (const [key, value] of Object.entries(this._attrs)) {
                element.setAttribute(key, value);
            }
            document.head.appendChild(element);
            element.addEventListener('load', this._eventHandlers.load);
            element.addEventListener('error', this._eventHandlers.error);
            this._element = element;
        }
    }
    /** Метод удаления элемента из head в DOM-дереве.
     *  Переопределенный метод от родительского класса.
     */
    protected _removeElement(): void {
        const title = this._name === 'title' ? document.head.querySelector('title') : null;
        if (title) {
            title.innerHTML = ``;
        }
        else{
            document.head.removeChild(this._element);
        }
        delete this._element;
    }
}
