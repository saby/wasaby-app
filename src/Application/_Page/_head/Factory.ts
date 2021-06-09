///// <amd-module name="Application/_Page/_head/Factory" />

import BaseElement, { IHeadElement, IHeadElementAspect } from "Application/_Page/_head/BaseElement";
import Element from "Application/_Page/_head/Element";
import ElementPS from "Application/_Page/_head/ElementPS";
import type { IHeadTagAttrs, IHeadTagEventHandlers } from 'Application/_Page/_head/IHead';
import TitleAspect from "Application/_Page/_head/Title";
import ViewPortAspect from "Application/_Page/_head/ViewPort";

export function create(name: string,
                       attrs: IHeadTagAttrs,
                       content?: string,
                       eventHandlers?: IHeadTagEventHandlers,
                       hydratedElement?: HTMLElement): IHeadElement {
   const elementClass = BaseElement.isServer ? ElementPS : Element;

   return new elementClass(
       name,
       attrs,
       content,
       eventHandlers,
       getAspect(name, attrs, hydratedElement),
       hydratedElement
   );
}

function getAspect(
    initialName: string,
    initialAttrs: IHeadTagAttrs,
    hydratedElement?: HTMLElement): undefined | IHeadElementAspect {
   let name = initialName;
   let attrs = initialAttrs;
   if (hydratedElement) {
      name = hydratedElement.tagName.toLowerCase();
      attrs = Element.getElementAttrs(hydratedElement);
   }

   const isTitle: boolean = name === 'title';
   const isViewPort: boolean = name === 'meta' && attrs.name === 'viewport' && !!attrs.content;

   return (isTitle && new TitleAspect())
      || (isViewPort && new ViewPortAspect())
      || undefined;
}
