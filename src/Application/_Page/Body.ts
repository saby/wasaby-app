import * as AppEnv from 'Application/Env';
import { default as Element } from 'Application/_Page/_body/Element';
import { default as ElementPS } from 'Application/_Page/_body/ElementPS';
import type { IBody, IInternalBody } from 'Application/_Page/_body/IBody';

/**
 * API для работы с <body> страницы
 * Класс реализуется как синглтон
 * Получить инстанст синглтона можно через статичный метод getInstance()
 * @public
 * @author Печеркин С.В.
 */
export class Body implements IBody {
    private _element: ElementPS | Element =
        typeof window === 'undefined' ? new ElementPS() : new Element();

    addClass(...tokens: string[]): void {
        this._element.updateClasses([], tokens);
    }

    replaceClasses(removeList: string[], addList: string[]): void {
        this._element.updateClasses(removeList, addList);
    }

    removeClass(...tokens: string[]): void {
        this._element.updateClasses(tokens, []);
    }

    toggleClass(token: string, force?: boolean): boolean {
        return this._element.toggleClass(token, force);
    }

    containsClass(token: string): boolean {
        return this._element.containsClass(token);
    }

    getClassString(): string {
        return this._element.getClasses();
    }

    setDir(value: string): void {
        this._element.setDir(value);
    }

    getDir(): string {
        return this._element.getDir();
    }

    // #region IStore
    get<K extends keyof IInternalBody>(key: K): IInternalBody[K] {
        return this[key];
    }
    set<K extends keyof IInternalBody>(key: K, value: IInternalBody[K]): boolean {
        try {
            this[key] = value as (typeof this)[K];
            return true;
        } catch (_e) {
            return false;
        }
    }
    // eslint-disable-next-line no-empty, no-empty-function, @typescript-eslint/no-empty-function
    remove(): void {}
    getKeys(): (keyof IInternalBody)[] {
        return Object.keys(this) as (keyof IInternalBody)[];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toObject(): Record<keyof IInternalBody, any> {
        return { ...this };
    }
    // #endregion

    static _instance: Body;

    private static _creator(): Body {
        return new Body();
    }

    /**
     * Сложилась очень сложная ситуация.
     * Она разгребается в задаче https://online.sbis.ru/opendoc.html?guid=a3203b23-b620-4ebc-bc7a-0a59cfec006b
     */
    static getInstance(): Body | never {
        if (typeof window !== 'undefined') {
            Body._instance = Body._instance || Body._creator();
            return Body._instance;
        }
        return AppEnv.getStore<IInternalBody>('BodyAPI', Body._creator) as Body;
    }
}
