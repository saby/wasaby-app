///// <amd-module name="Application/_Page/_head/Factory" />

import Element from "Application/_Page/_head/Element";
import ElementPS from "Application/_Page/_head/ElementPS";
import TitleAspect from "Application/_Page/_head/Title";
import ViewPortAspect from "Application/_Page/_head/ViewPort";
import BaseElement, { IPageTagElementAspect } from "Application/_Page/_pageTagAPI/BaseElement";
import type { IPageTagAttrs, IPageTagElement, IPageTagEventHandlers } from 'Application/_Page/_pageTagAPI/Interface';

export function create(name: string,
                       attrs: IPageTagAttrs,
                       content?: string,
                       eventHandlers?: IPageTagEventHandlers,
                       hydratedElement?: HTMLElement): IPageTagElement {
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
    initialAttrs: IPageTagAttrs,
    hydratedElement?: HTMLElement): undefined | IPageTagElementAspect {
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
