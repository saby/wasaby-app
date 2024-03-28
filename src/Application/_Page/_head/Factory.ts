import Element from 'Application/_Page/_head/Element';
import ElementPS from 'Application/_Page/_head/ElementPS';
import FaviconAspect from 'Application/_Page/_head/Favicon';
import TitleAspect from 'Application/_Page/_head/Title';
import ViewPortAspect from 'Application/_Page/_head/ViewPort';
import BaseElement, {
    IPageTagElementAspect,
} from 'Application/_Page/_pageTagAPI/BaseElement';
import type {
    IPageTagAttrs,
    IPageTagElement,
    IPageTagEventHandlers,
} from 'Application/_Page/_pageTagAPI/Interface';

/**
 * Значение rel в favicon является отличительным признаком favicon от других тегов.
 * Сравниваем значения rel, чтобы определить FaviconAspect.
 */
const FAVICON_REL_TYPES = [
    'icon',
    'apple-touch-icon',
    'shortcut icon',
    'apple-touch-icon-precomposed',
];

export function create(
    name: string,
    attrs: IPageTagAttrs,
    content?: string,
    eventHandlers?: IPageTagEventHandlers,
    hydratedElement?: HTMLElement
): IPageTagElement {
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
    hydratedElement?: HTMLElement
): undefined | IPageTagElementAspect {
    let name = initialName;
    let attrs = initialAttrs;
    if (hydratedElement) {
        name = hydratedElement.tagName.toLowerCase();
        attrs = Element.getElementAttrs(hydratedElement);
    }

    const isTitle: boolean = name === 'title';
    const isViewPort: boolean =
        name === 'meta' && attrs.name === 'viewport' && !!attrs.content;
    const isFavicon: boolean =
        name === 'link' &&
        !!attrs.href &&
        attrs.rel?.split(' ').some((el) => {
            return FAVICON_REL_TYPES.includes(el);
        });

    return (
        (isTitle && new TitleAspect()) ||
        (isViewPort && new ViewPortAspect()) ||
        (isFavicon && new FaviconAspect(attrs.sizes)) ||
        undefined
    );
}
