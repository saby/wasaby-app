///// <amd-module name="Application/_Page/_head/ViewPort" />

import { IHeadTagAttrs, IHeadTagEventHandlers } from "Application/_Interface/IHead";
import { IElementRestoredData } from "Application/_Page/_head/Element";
import { default as ElementPS, IHeadElementType } from "Application/_Page/_head/ElementPS";
import ViewPortPS from "Application/_Page/_head/ViewPortPS";

/**
 * Класс HTML элемента для вставки в head
 * Описывает исключительно тег meta с параметрами для viewport на клиенте
 * @author Печеркин С.В.
 */
export default class ViewPort extends ViewPortPS {
   constructor(name?: string,
               attrs?: IHeadTagAttrs,
               content?: string,
               eventHandlers?: IHeadTagEventHandlers,
               element?: HTMLElement) {
      const data: IElementRestoredData = ElementPS._restoreElement(element);
      super(data.name || name, data.attrs || attrs, data.content || content, eventHandlers, element);
   }

   getType(): IHeadElementType {
      return ViewPort.type;
   }

   protected _render() {
      if (this._element) {
         return;
      }
      const viewPort = document.head.querySelector<HTMLElement>('meta[name=viewport]');
      if (viewPort) {
         this._element = viewPort;
      }
      const element = this._element ? this._element : document.createElement(this._name);
      this._applyAttrs(element);
      if (!this._element) {
         document.head.appendChild(element);
         this._element = element;
      }
      this._startEvents();
   }

   /**
    * Нельзя оставлять страницу с пустым ViewPort - это приводит к морганию размеров
    * @protected
    */
   protected _removeElement() {
      delete this._element;
   }

   static type: IHeadElementType = {
      isServer: false,
      isTitle: false,
      isViewPort: true
   }
}
