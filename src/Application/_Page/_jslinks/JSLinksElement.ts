import { IHeadTagAttrs, IHeadTagEventHandlers } from 'Application/_Interface/IHead';
import ElementPS from 'Application/_Page/_head/ElementPS';

/**
 * Элемент класса jslinks, отнаследованный от ElementPS
 * @author Хамбелов М.И.
 */
export default class JSLinksElement extends ElementPS {
    // tslint:disable-next-line:max-line-length
    isEqual(name: string, attrs: IHeadTagAttrs, content?: string, eventHandlers?: IHeadTagEventHandlers): boolean {
        if (name !== 'string'){
            throw new Error('Параметр name должен равняться "script"');
        }
        return super.isEqual(name, attrs, content, eventHandlers);
    }
    isFit(name?: string, attrs?: IHeadTagAttrs): boolean {
        if (name && name !== 'string'){
            throw new Error('Параметр name должен равняться "script"');
        }
        return super.isFit(name, attrs);
    }
    _isTitle(): boolean {
        return false;
    }
};
