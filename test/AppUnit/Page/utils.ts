export const ALL_KEYS_ELEMENT = ['_name', '_attrs', '_content', '_eventHandlers'];
export const KEY_TITLE = ['_content'];
export const TITLE_PROPS = {
    _name: 'title',
    _attrs: {},
    _content: 'title_content'
};
export const META_PROPS = {
    _name: 'meta',
    _attrs: {name: 'meta_name'},
    _content: 'meta_content'
};
export const SCRIPT_PROPS = {
    _name: 'script',
    _attrs: {src: 'to/the/great/lands'},
    _content: 'script_content'
};
export const LINK_PROPS = {
    _name: 'link',
    _attrs: {href: 'to/the/great/lands'},
    _content: 'link_content'
};
export const EVENT_HANDLER = {load: () => {return 'load';}};


export const additionalAttrs = {
    'data-vdomignore': true
};

export const JSLINKS_PROPS = {
    name: 'script',
    attrs: {defer: 'defer', type: 'text/javascript'}
};
