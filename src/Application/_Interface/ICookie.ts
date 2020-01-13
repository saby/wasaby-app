/// <amd-module name="Application/_Interface/ICookie" />
import { IStore } from 'Application/_Interface/IStore';

/**
 * Набор опций для cookie
 * @typedef {Object} ICookieOptions
 * @property {String} domain domain
 * @property {Number|Date} expires expires
 * @property {String} path path
 * @property {String} secure secure
 */
export interface ICookieOptions {
    domain: string;
    expires: number | Date;
    path: string;
    secure: string;
}

/**
 * Интерфейс для работы с cookie
 * @interface Application/_Interface/ICookie
 * @extends Application/_Interface/IStore
 * @public
 * @author Санников К.А.
 */
export interface ICookie<T extends Record<string, string> = Record<string, string>> extends IStore {
    /**
     * Получение значение из cookie
     * @param {String}
     */
    get<K extends keyof T & string>(key: K): T[K];
    /**
     * Устанавливаем cookie
     * @param {String} key
     * @param {String} value
     * @param {Partial<ICookieOptions>} options
     * @throws {Error} ошибка установки значения
     */
    set<K extends keyof T & string>(key: K, value: T[K], options?: Partial<ICookieOptions>): boolean;
    /**
     * Удаляем cookie
     * @param {String} key
     * @throws {Error} ошибка очистки значения
     */
    remove<K extends keyof T & string>(key: K):void;
}
