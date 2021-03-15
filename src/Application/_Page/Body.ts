///// <amd-module name="Application/_Page/Body" />

import * as AppEnv from 'Application/Env';
import { IBody, IInternalBody } from 'Application/_Interface/IBody'
import { ElementPS } from "Application/_Page/_body/ElementPS";

/**
 * API для работы с <head> страницы
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @author Печеркин С.В.
 */

export class Body implements IBody {
    private readonly _bodyElement: ElementPS | DOMTokenList;

    constructor() {
        this._bodyElement = typeof window === 'undefined' ? new ElementPS() : document.body.classList;
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

    addClass(...initialTokens: string[]): void {
        try {
            const tokens = Body._prepareTokens(initialTokens);
            if (!tokens.length) {
                return
            }

            this._bodyElement.add.apply(this._bodyElement, tokens);
        } catch (e) {
            this._logError(e);
        }
        this._notifyEventCrunch();
    }

    removeClass(...initialTokens: string[]): void {
        try {
            const tokens = Body._prepareTokens(initialTokens);
            if (!tokens.length) {
                return
            }

            this._bodyElement.remove.apply(this._bodyElement, tokens);
        } catch (e) {
            this._logError(e);
        }
        this._notifyEventCrunch();
    }

    toggleClass(token: string, force?: boolean): boolean {
        try {
            return this._bodyElement.toggle(token, force);
        } catch (e) {
            this._logError(e)
        }
        this._notifyEventCrunch();
    }

    containsClass(token: string): boolean {
        try {
            return this._bodyElement.contains(token);
        } catch (e) {
            this._logError(e);
        }
    }

    getClassString(): string {
        return this._bodyElement.toString();
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

    private _logError(e: Error): void {
        const message = `'Application/_Page/Body'. ${e.message}`;
        typeof window === 'undefined' ? AppEnv.logger.error(message) : console.error(message);
    }

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
