///// <amd-module name="Application/_Page/_head/TitlePS" />

import { JML } from 'Application/_Interface/IHead';
import ElementPS, { IHeadElementType } from 'Application/_Page/_head/ElementPS';

/**
 * Класс HTML элемента для вставки в head
 * Описывает исключительно тег title на сервере
 * @author Печеркин С.В.
 */
export default class TitlePS extends ElementPS {
   getType(): IHeadElementType {
      return TitlePS.type;
   }

   isTitle(): boolean {
      return true;
   }

   getData(): JML {
      /** В момент генерации информации убираем из title все атрибуты */
      return ElementPS.generateTag({
         name: this._name,
         attrs: {},
         content: this._content,
         eventHandlers: this._eventHandlers
      });
   }

   clear() {
      delete this._content;
      this._removeElement();
   }

   static type: IHeadElementType = {
      isServer: true,
      isTitle: true,
      isViewPort: false
   }
}
