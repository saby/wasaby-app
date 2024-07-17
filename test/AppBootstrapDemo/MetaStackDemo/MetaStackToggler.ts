/* eslint-disable-next-line */
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/MetaStackDemo/MetaStackToggler';
import { getMetaStack, Control, TemplateFunction } from 'UI/Base';
import { IMetaState } from 'UI/_base/HTML/meta';

export default class MetaStackToggler extends Control {
    _template: TemplateFunction = template;
    _metaState: IMetaState = null;
    private _counter: number = 0;
    _updateTitle(): void {
        this._metaState = getMetaStack().push({
            title: `New Title ${++this._counter}`,
        });
    }
    _restoreTitle(): void {
        try {
            getMetaStack().remove(this._metaState);
            this._metaState = null;
        } catch (_) {
            // eslint-disable-next-line no-empty, no-empty-function, @typescript-eslint/no-empty-function
        }
    }
}
