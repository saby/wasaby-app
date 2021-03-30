/// <amd-module name="AppBootstrapDemo/MetaStackToggler" />
/* tslint:disable-next-line */
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/MetaStackToggler';
import { getMetaStack, Control, TemplateFunction } from 'UI/Base';
import { IMetaState } from 'UI/_base/HTML/meta';

export default class MetaStackToggler extends Control {
    _template: TemplateFunction = template;
    _metaState: IMetaState;
    _updateTitle(): void {
        this._metaState = getMetaStack().push({title: `New Title: ${Math.random()}`});
    }
    _restoreTitle(): void {
        getMetaStack().remove(this._metaState);
    }
}
