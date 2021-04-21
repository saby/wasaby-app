///// <amd-module name="Application/_Page/_head/BaseElement" />

import { IHeadTag, JML } from 'Application/_Interface/IHead';
import BaseElement, { IHeadElementAspect } from 'Application/_Page/_head/BaseElement';

/**
 * Аспект для уникального элемента типа meta с параметрами для viewport
 * @author Печеркин С.В.
 */
export default class ViewPortAspect implements IHeadElementAspect {
   getUniqueKey(): boolean | string {
      return 'ViewPort';
   }
   isEqual(thisTag: IHeadTag, otherTag: IHeadTag): boolean {
      return BaseElement.isEqual(thisTag, otherTag);
   }
   getData({name, attrs, content, eventHandlers}: IHeadTag): JML {
      return BaseElement.generateTag({name, attrs, content, eventHandlers});
   }
   getDOMElement({name, attrs, content}: IHeadTag): HTMLElement | undefined {
      let viewPort = document.head.querySelector<HTMLElement>('meta[name=viewport]');
      if (!viewPort) {
         viewPort = document.createElement(name);
         document.head.appendChild(viewPort);
      }
      return viewPort;
   }
   appendDomElement(element: HTMLElement) {
      return;
   }
   removeDOMElement(element: HTMLElement): void {
      /** Нельзя оставлять страницу без информации о viewport */
      return;
   }
}
