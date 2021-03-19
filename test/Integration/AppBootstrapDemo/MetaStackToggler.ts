/// <amd-module name="AppBootstrapDemo/MetaStackToggler" />

import { getMetaStack } from 'UI/_base/HTML/meta';
import { Control, TemplateFunction } from 'UI/Base';
import * as template from 'wml!AppBootstrapDemo/MetaStackToggler';

export default class MetaStackToggler extends Control {
    _template: TemplateFunction = template;
    _toggleTitle(){
        getMetaStack().push({title: `New Title: ${Math.random()}`});
    }
}
