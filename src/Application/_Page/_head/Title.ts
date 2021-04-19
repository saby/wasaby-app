///// <amd-module name="Application/_Page/_head/Title" />

import { IHeadTagAttrs, IHeadTagEventHandlers } from 'Application/_Interface/IHead';
import { IElementRestoredData } from 'Application/_Page/_head/Element'
import { default as ElementPS, IHeadElementType } from "Application/_Page/_head/ElementPS";
import TitlePS from "Application/_Page/_head/TitlePS";

/**
 * Класс HTML элемента для вставки в head
 * Описывает исключительно тег title на клиенте
 * @author Печеркин С.В.
 */
export default class Title extends TitlePS {
   constructor(name?: string,
               attrs?: IHeadTagAttrs,
               content?: string,
               eventHandlers?: IHeadTagEventHandlers,
               element?: HTMLElement) {
      const data: IElementRestoredData = ElementPS._restoreElement(element);
      super(data.name || name, data.attrs || attrs, data.content || content, eventHandlers, element);
   }

   getType(): IHeadElementType {
      return Title.type;
   }

   /** Переопределенный метод для проверки тэга на идентичность.
    * в текущем переопределенном методе отдельно сравнивается title напрямую в DOM,
    * в отличии от родительского, в котором сравниваются по метаданным.
    * title проверяется только по контенту.
    */
   isEqual(name: string, attrs: IHeadTagAttrs, content?: string, eventHandlers?: IHeadTagEventHandlers): boolean {
      return document.title === content;
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

   protected _render() {
      if (this._element) {
         return;
      }
      /** если текущий элемент - title, меняем только content у title в DOM дереве
       */
      document.title = this._content || '';
      this._element = document.head.querySelector('title');
      this._startEvents();
   }

   /**
    * Нельзя оставлять страницу с пустым title - это приводит к морганию заголовка
    * @protected
    */
   protected _removeElement() {
      delete this._element;
   }

   static type: IHeadElementType = {
      isServer: false,
      isTitle: true,
      isViewPort: false
   }
}
