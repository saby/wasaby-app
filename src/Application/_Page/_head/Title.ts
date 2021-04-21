///// <amd-module name="Application/_Page/_head/BaseElement" />

import { IHeadTag, JML } from 'Application/_Interface/IHead';
import BaseElement, { IHeadElementAspect } from 'Application/_Page/_head/BaseElement';

/**
 * Аспект для уникального элемента типа title
 * @author Печеркин С.В.
 */
export default class TitleAspect implements IHeadElementAspect {
   getUniqueKey(): boolean | string {
      return 'Title';
   }
   isEqual(thisTag: IHeadTag, otherTag: IHeadTag): boolean {
      if (BaseElement.isServer) {
         return BaseElement.isEqual(thisTag, otherTag);
      }
      return document.title === otherTag.content;
   }
   getDOMElement({name, content}: IHeadTag): HTMLElement | undefined {
      document.title = content || '';
      return document.head.querySelector('title');
   }
   appendDomElement(element: HTMLElement) {
      /** У нас уже есть тег title, который лежит в DOM дереве */
      return;
   }
   removeDOMElement(element: HTMLElement): void {
      /** Нельзя оставлять страницу без заголовка */
      return;
   }
   getData({name, attrs, content, eventHandlers}: IHeadTag): JML {
      /** В момент генерации информации убираем из title все атрибуты */
      return BaseElement.generateTag({name, attrs: {}, content, eventHandlers});
   }
}
