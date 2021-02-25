import { IJSLinksTagAttrs, IJSLinksTagEventHandlers } from 'Application/_Interface/IJSLinks';
import ElementPS from 'Application/_Page/_head/ElementPS';

/**
 * Элемент класса jslinks, отнаследованный от ElementPS
 * @author Хамбелов М.И.
 */
export default class JSLinksElement extends ElementPS {
    // tslint:disable-next-line:max-line-length
    isEqual(name: 'script', attrs: IJSLinksTagAttrs, content?: string, eventHandlers?: IJSLinksTagEventHandlers): boolean {
        return super.isEqual(name, attrs, content, eventHandlers);
    }
    isFit(name?: 'script', attrs?: IJSLinksTagAttrs): boolean {
        return super.isFit(name, attrs);
    }
    _isTitle(): boolean {
        return false;
    }
};
