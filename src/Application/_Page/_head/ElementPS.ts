///// <amd-module name="Application/_Page/_head/ElementPS" />

import { IHeadTagAttrs } from 'Application/_Interface/IHead';
import BaseElement from "Application/_Page/_head/BaseElement";

/**
 * Класс HTML элемента для вставки в head.
 * На сервисе представления(СП) необходим в качестве хранения данных.
 * Будет рендериться только на клиенте, используя дочерний класс Element
 * @author Хамбелов М.И.
 */

export default class ElementPS extends BaseElement {
    changeTag(attrsChange: IHeadTagAttrs): void {
        this.setAttrs(attrsChange);
    }

    protected _render(): void {
        this._eventHandlers?.load();
    }

    protected _removeElement(): void {
        return;
    }
}
