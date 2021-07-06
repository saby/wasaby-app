///// <amd-module name="Application/_Page/_head/ElementPS" />

import BaseElement from "Application/_Page/_pageTagAPI/BaseElement";
import type { IPageTagAttrs } from 'Application/_Page/_pageTagAPI/Interface';

/**
 * Класс HTML элемента для вставки в head.
 * На сервисе представления(СП) необходим в качестве хранения данных.
 * Будет рендериться только на клиенте, используя дочерний класс Element
 * @author Печеркин С.В.
 */

export default class ElementPS extends BaseElement {
    changeTag(attrsChange: IPageTagAttrs): void {
        this.setAttrs(attrsChange);
    }

    protected _render(): void {
        this._eventHandlers?.load();
    }

    protected _removeElement(): void {
        return;
    }
}
