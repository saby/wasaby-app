///// <amd-module name="Application/_Page/_head/ViewPortPS" />

import ElementPS, { IHeadElementType } from 'Application/_Page/_head/ElementPS';

/**
 * Класс HTML элемента для вставки в head
 * Описывает исключительно тег meta с параметрами для viewport на сервере
 * @author Печеркин С.В.
 */
export default class ViewPortPS extends ElementPS {
   getType(): IHeadElementType {
      return ViewPortPS.type;
   }

   isViewPort(): boolean {
      return true;
   }

   clear() {
      delete this._content;
      this._removeElement();
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

   static type: IHeadElementType = {
      isServer: true,
      isTitle: false,
      isViewPort: true
   }
}
