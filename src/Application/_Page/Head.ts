import * as AppEnv from 'Application/Env';
import { PageTagAPI } from 'Application/_Page/PageTagAPI';
import { HeadAspect } from 'Application/_Page/_head/Aspect';
import { create } from 'Application/_Page/_head/Factory';
import { SERVER_ID_FIELD } from './_pageTagAPI/Interface';

/**
 * API для работы с <head> страницы
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @class Application/_Page/Head
 * @public
 * @implements Application/_Page/_pageTagAPI/IPageTagAPI
 * @author Печеркин С.В.
 */
export class Head extends PageTagAPI {
    protected _aspect: HeadAspect = new HeadAspect();

    constructor() {
        super();
        this._collectTags();
    }

    /**
     * Важно собрать на клиенте всю информацию о тегах внутри head при инициализации Head API
     * @private
     */
    private _collectTags(): void {
        if (typeof document === 'undefined') {
            return;
        }

        Array.from(document.head.children).forEach((item: HTMLElement) => {
            /** Нет смысла собирать noscript тег. В живой странице ты его не применишь. */
            if (item.tagName === 'NOSCRIPT') {
                return;
            }
            const element = create(null, null, null, null, item);
            this._elements[
                element.getAttrs()[SERVER_ID_FIELD] ||
                    this._aspect.generateGuid()
            ] = element;
        });
    }

    static _instance: Head;

    protected static _creator(): Head {
        return new Head();
    }

    /**
     * Сложилась очень сложная ситуация.
     * Она разгребается в задаче https://online.sbis.ru/opendoc.html?guid=a3203b23-b620-4ebc-bc7a-0a59cfec006b
     */
    static getInstance(): Head | never {
        if (typeof window !== 'undefined') {
            Head._instance = Head._instance || Head._creator();
            return Head._instance;
        }
        return AppEnv.getStore('HeadAPI', Head._creator) as Head;
    }
}
