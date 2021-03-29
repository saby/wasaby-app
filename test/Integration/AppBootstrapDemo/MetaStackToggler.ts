/// <amd-module name="AppBootstrapDemo/MetaStackToggler" />

import { getMetaStack, IMetaState } from 'UI/Base';
import { Control, TemplateFunction } from 'UI/Base';
import * as template from 'wml!AppBootstrapDemo/MetaStackToggler';

export default class MetaStackToggler extends Control {
    _template: TemplateFunction = template;
    _metaState: IMetaState;
    _updateTitle() {
        this._metaState = getMetaStack().push({title: `New Title: ${Math.random()}`});
    }
    _restoreTitle() {
        getMetaStack().remove(this._metaState);
    }
}
