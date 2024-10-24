import * as AppEnv from 'Application/Env';
import { PageTagAPI } from 'Application/_Page/PageTagAPI';
import { JSLinksAspect } from 'Application/_Page/_jsLinks/Aspect';
import { IPageTagAPIInternal } from './_pageTagAPI/Interface';

/**
 * API для работы jsLinks
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @public
 * @author Печеркин С.В.
 */
export class JSLinks extends PageTagAPI {
    protected _aspect: JSLinksAspect = new JSLinksAspect();

    static _instance: JSLinks;
    static _creator(): JSLinks {
        return new JSLinks();
    }
    static getInstance(nameSpace: string = 'root'): JSLinks | never {
        if (typeof window !== 'undefined') {
            JSLinks._instance = JSLinks._instance || JSLinks._creator();
            return JSLinks._instance;
        }
        return AppEnv.getStore<IPageTagAPIInternal>(
            `JSLinksAPI_${nameSpace}`,
            JSLinks._creator
        ) as JSLinks;
    }
}
