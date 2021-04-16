///// <amd-module name="Application/_Page/Body" />

import * as AppEnv from 'Application/Env';
import { IBody, IInternalBody } from 'Application/_Interface/IBody'
import { default as Element } from 'Application/_Page/_body/Element';
import { default as ElementPS } from 'Application/_Page/_body/ElementPS';

/**
 * API для работы с <body> страницы
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @author Печеркин С.В.
 */

export class Body implements IBody {
    private _element: ElementPS | Element = (typeof window === 'undefined') ? new ElementPS() : new Element();

    addClass(...tokens: string[]): void {
        this._element.updateClasses([], tokens)
    }

    replaceClasses(removeList: string[], addList: string[]): void {
        this._element.updateClasses(removeList, addList);
    }

    removeClass(...tokens: string[]): void {
        this._element.updateClasses(tokens, [])
    }

    toggleClass(token: string, force?: boolean): boolean {
        return this._element.toggleClass(token, force);
    }

    containsClass(token: string): boolean {
        return this._element.containsClass(token)
    }

    getClassString(): string {
        return this._element.getClasses();
    }

    // #region IStore
    get<K extends keyof IInternalBody>(key: string): IInternalBody[K] {
        return this[key];
    }
    set<K extends keyof IInternalBody>(key: string, value: IInternalBody[K]): boolean {
        try {
            this[key] = value;
            return true;
        } catch (_e) {
            return false;
        }
    }
    // tslint:disable-next-line:no-empty
    remove(): void { }
    getKeys(): Array<keyof IInternalBody> {
        return Object.keys(this) as Array<keyof IInternalBody>;
    }
    // tslint:disable-next-line:no-any
    toObject(): Record<keyof IInternalBody, any> {
        return Object.assign({}, this);
    }
    // #endregion

    private static _creator(): Body {
        return new Body();
    }

    static _instance: Body;

    /**
     * Сложилась очень сложная ситуация.
     * Она разгребается в задаче https://online.sbis.ru/opendoc.html?guid=a3203b23-b620-4ebc-bc7a-0a59cfec006b
     */
    static getInstance(): Body | never {
        if (typeof window !== 'undefined') {
            Body._instance = Body._instance || Body._creator();
            return Body._instance;
        }
        return <Body> AppEnv.getStore('BodyAPI', Body._creator);
    }
}
