///// <amd-module name="Application/_Page/_jslinks/JSLinksElement" />

import { IHeadTagAttrs, IHeadTagEventHandlers } from 'Application/_Interface/IHead';
import ElementPS from 'Application/_Page/_head/ElementPS';

/**
 * Элемент класса jslinks, отнаследованный от ElementPS
 * @author Хамбелов М.И.
 */
export default class JSLinksElement extends ElementPS {
    // tslint:disable-next-line:max-line-length
    isEqual(name: string, attrs: IHeadTagAttrs, content?: string, eventHandlers?: IHeadTagEventHandlers): boolean {
        if (name !== 'script'){
            throw new Error('В методе isEqual класса JSLinksElement параметр name должен равняться "script"');
        }
        return super.isEqual(name, attrs, content, eventHandlers);
    }
    isFit(name?: string, attrs?: IHeadTagAttrs): boolean {
        if (name && name !== 'script'){
            throw new Error('В методе isFit класса JSLinksElement параметр name должен равняться "script"');
        }
        return super.isFit(name, attrs);
    }
    _isTitle(): boolean {
        return false;
    }
}
