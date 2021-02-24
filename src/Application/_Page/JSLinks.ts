import AppEnv from 'Application/Env';
import { Head as HeadAPI } from 'Application/Page'
import {
    IHeadTag,
    IHeadTagAttrs,
    IHeadTagEventHandlers,
    IHeadTagId,
    // JML
} from 'Application/_Interface/IHead';
import { IStore } from "Application/_Interface/IStore";

type JSLinksTag = IHeadTag;
type JSLinksTagId = string;
type IJSLinksTagEventHandlers = IHeadTagEventHandlers;
interface IJSLinks extends IStore<IJSLinks> {
    createTag(name: string, attrs: IHeadTagAttrs, content?: string, eventHandlers?: IHeadTagEventHandlers): IHeadTagId;
    // deleteTag(id: IHeadTagId): void;
    // getTag(name?: string, attrs?: IHeadTagAttrs): IHeadTagId | IHeadTagId[] | null;
    // getData(id?: IHeadTagId): Array<JML> | JML;
}

export default class JSLinks extends HeadAPI implements IJSLinks{
    private _elementsJSLinks: {[propName: string]: JSLinksTag } = {};
    private _id = 0;
    createTag(
        name: 'script',
        attrs: {src: string}): JSLinksTagId;
    createTag(
        name: 'script',
        attrs: {},
        content: string): JSLinksTagId;
    createTag(
        name: 'script',
        attrs: {type: string, src: string}): JSLinksTagId;
    createTag(
        name: 'script',
        attrs: {type: string, src: string, defer: string}): JSLinksTagId;
    createTag(
        name: 'script',
        attrs: {type: string, src: string, defer: string},
        content?: string,
        eventHandlers?: IJSLinksTagEventHandlers): JSLinksTagId {
        const uuid = this._generateGuid();
        /**
         * при работе с rsSerialized, rtpackModuleNames пробрасывается только content, аттрибуты не требуются.
         * поэтому если контента нету, значит пробрасываем аттрибуты и дополняем необходимые, если они не пришли
         */
        if (!content) {
            attrs = {
                ...attrs,
                type: attrs.type ? attrs.type : 'text/javascript' ,
                defer:  attrs.defer ? attrs.defer : 'defer'
            }
        }
        this._elementsJSLinks[uuid] = {name, attrs, content, eventHandlers};
        return uuid;
    }

    private _generateGuid(): IHeadTagId {
        return `scripts-${this._id++}`;
    };
    private static _creator(): JSLinks {
        return new this();
    }
    static _instance: JSLinks;

    static getInstance(nameSpace: string = 'root'): IJSLinks {
        return <IJSLinks> AppEnv.getStore(`JSLinksAPI_${nameSpace}`, JSLinks._creator);
    }
}
