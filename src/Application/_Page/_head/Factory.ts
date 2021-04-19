///// <amd-module name="Application/_Page/_head/Factory" />

import { IHeadTagAttrs, IHeadTagEventHandlers } from 'Application/_Interface/IHead';
import Element from "Application/_Page/_head/Element";
import { default as ElementPS, IHeadElement, IHeadElementType } from "Application/_Page/_head/ElementPS";
import Title from "Application/_Page/_head/Title";
import TitlePS from "Application/_Page/_head/TitlePS";
import ViewPort from "Application/_Page/_head/ViewPort";
import ViewPortPS from "Application/_Page/_head/ViewPortPS";

export function create(name: string,
                       attrs: IHeadTagAttrs,
                       content?: string,
                       eventHandlers?: IHeadTagEventHandlers,
                       element?: HTMLElement): IHeadElement {
   const filter: IHeadElementType = {
      isServer: typeof window === 'undefined',
      isTitle: name === 'title',
      isViewPort: name === 'meta' && attrs.name === 'viewport' && !!attrs.content
   }
   const item = [ElementPS, Element, TitlePS, Title, ViewPortPS, ViewPort].filter((element) => {
      return _isEqual(filter, element.type);
   }).pop();

   return new item(name, attrs, content, eventHandlers, element);
}

function _isEqual(filter: IHeadElementType, elementType: IHeadElementType): boolean {
   return (filter.isServer === elementType.isServer)
      && (filter.isTitle === elementType.isTitle)
      && (filter.isViewPort === elementType.isViewPort)
}
