import { Head as HeadAPI, Body as BodyAPI } from 'Application/Page'
import { IHeadTagEventHandlers, IHeadTagId} from "Application/_Interface/IHead";
import AppEnv from "Application/Env";

interface IJSLinks{

}
export default class JSLinks extends HeadAPI implements IJSLinks{
    private _JSLink_items = {};

    createTag(
        name: 'script',
        attrs: {type: string},
        content: string): IHeadTagId;
    createTag(
        name: 'script',
        attrs: {type: string, src: string, key: string},
        content: string): IHeadTagId;
    createTag(
        name: 'script',
        attrs: {type: string, src: string, key: string},
        content: string,
        eventHandlers: IHeadTagEventHandlers): IHeadTagId {
        // const elementClass = typeof window === 'undefined' ? ElementPS : Element;
        // const uuid = this._generateGuid();
        // this._elements[uuid] = new elementClass(name, attrs, content, eventHandlers);
    }
    private static _creator(): JSLinks {
        return new JSLinks();
    }
    static _instance: JSLinks;

    static getInstance(nameSpace: string = 'root'): JSLinks | never {
        if (typeof window !== 'undefined') {
            JSLinks._instance = JSLinks._instance || JSLinks._creator();
            return JSLinks._instance;
        }
        return <JSLinks> AppEnv.getStore(`JSLinks${nameSpace}`, JSLinks._creator);
    }
}
