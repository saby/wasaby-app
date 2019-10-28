/// <amd-module name="Application/_Interface/ICookie" />
import { IStore } from 'Application/_Interface/IStore';

/**
 * @typedef {Object} ICookieOptions
 * @property {String} domain
 * @property {number|Date} expires
 * @property {String} path
 * @property {String} secure
 */
export interface ICookieOptions {
    domain: string
    expires: number | Date
    path: string
    secure: string
}

/**
 * Интерфейс для работы с cookie
 * @interface Application/_Interface/ICookie
 * @public
 * @author Санников К.А.
 */
export interface ICookie extends IStore {
    /**
     * Получение значение из cookie
     * @param {String}
     */
    get(key: string): string

    /**
     * Устанавливаем cookie
     * @param {String} key
     * @param {String} value
     * @param {Partial<ICookieOptions>} options
     * @throws {Error} ошибка установки значения
     */
    set(key: string, value: string, options ?: Partial<ICookieOptions>): boolean

    /**
     * Удаляем cookie
     * @param {String} key
     * @throws {Error} ошибка очистки значения
     */
    remove(key: string): void;
}
