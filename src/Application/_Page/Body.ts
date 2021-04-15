///// <amd-module name="Application/_Page/Body" />

import * as AppEnv from 'Application/Env';
import { IBody, IInternalBody } from 'Application/_Interface/IBody'

/**
 * API для работы с <head> страницы
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @author Печеркин С.В.
 */

export class Body implements IBody {
    private readonly _attrs = {
        'class':  ''
    }

    constructor() {
        if (typeof window !== 'undefined') {
            this._attrs.class = document.body.classList.toString();
        }
    }

    private _updateClasses(removeList: string[], addList: string[]): void {
        let list: string[] = Body._prepareTokens(this._attrs.class.split(' '));
        list = list.filter((item) => !removeList.includes(item));
        list = list.concat(addList.filter((item) => !list.includes(item)));

        this._attrs.class = list.join(' ');

        if (typeof window !== 'undefined') {
            document.body.setAttribute('class', this._attrs.class);
            this._notifyEventCrunch();
        }
    }

    /** Костылямбрий, который будет жить, пока не закончится переход на построение от шаблона #bootsrap */
    private _notifyEventCrunch(): void {
        if (typeof window !== 'undefined') {
            customEventPolyfill();
            window.document.body.dispatchEvent(
               new CustomEvent('_bodyClassesUpdateCrunch', {detail: this.getClassString()})
            );
        }
    }

    addClass(...tokens: string[]): void {
        this._updateClasses([], Body._prepareTokens(tokens))
    }

    replaceClasses(removeList: string[], addList: string[]): void {
        this._updateClasses(Body._prepareTokens(removeList), Body._prepareTokens(addList));
    }

    removeClass(...tokens: string[]): void {
        this._updateClasses(Body._prepareTokens(tokens), [])
    }

    toggleClass(token: string, force?: boolean): boolean {
        const needAdd: boolean = (force === undefined) ? !this.containsClass(token) : force;
        needAdd ? this.addClass(token) : this.removeClass(token);

        return this.containsClass(token);
    }

    containsClass(token: string): boolean {
        return this._attrs.class.includes(token);
    }

    getClassString(): string {
        return this._attrs.class;
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

    private static _prepareTokens(tokens: string[]): string[] {
        const result: string[] = [];

        tokens.forEach((token) => {
            if (!!token) {
                result.push(token.trim());
            }
        })

        return result;
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

/** Костылямбрий, который будет жить, пока не закончится переход на построение от шаблона #bootsrap */
function customEventPolyfill(): void {
    if ( typeof window.CustomEvent === "function" ) {
        return
    }

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        const evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    // @ts-ignore
    window.CustomEvent = CustomEvent;
}
