import BaseElement from 'Application/_Page/_pageTagAPI/BaseElement';
import type { IPageTagAttrs, IPageTagEventHandlers } from 'Application/_Page/_pageTagAPI/Interface';

/**
 * Класс HTML элемента для вставки тегов ти па script в верстку страницы на сервере.
 * На сервисе представления(СП) необходим в качестве хранения данных.
 * @author Печеркин С.В.
 * @private
 */
export default class JSLinksElement extends BaseElement {
    changeTag(attrsChange: IPageTagAttrs): void {
        this.setAttrs(attrsChange);
    }
    isEqual(
        name: string,
        attrs: IPageTagAttrs,
        content?: string,
        _eventHandlers?: IPageTagEventHandlers
    ): boolean {
        if (name !== 'script') {
            throw new Error(
                'В методе isEqual класса JSLinksElement параметр name должен равняться "script"'
            );
        }
        return super.isEqual(name, attrs, content);
    }
    isFit(name?: string, attrs?: IPageTagAttrs): boolean {
        if (name && name !== 'script') {
            throw new Error(
                'В методе isFit класса JSLinksElement параметр name должен равняться "script"'
            );
        }
        return super.isFit(name, attrs);
    }
    protected _render(): void {
        this._eventHandlers?.load?.();
    }

    protected _removeElement(): void {
        return;
    }
}
