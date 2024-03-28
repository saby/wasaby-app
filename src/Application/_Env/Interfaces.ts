import type { IStore } from 'Application/_Request/IStore';

/**
 * Описание обобщенного window.location.
 * Выписаны те поля, которые есть на сервисе представления и в браузере
 * @interface Application/Env/ILocation
 * @public
 * @author Санников К.А..
 */
export interface ILocation {
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    href: string;
    pathname: string;
    search: string;
    hash: string;
    replace(path: string): void;
}
/**
 * @name Application/Env/ILocation#protocol
 * @cfg {String} Используемый протокол (http/https)
 */
/**
 * @name Application/Env/ILocation#host
 * @cfg {String} Хост
 */
/**
 * @name Application/Env/ILocation#hostname
 * @cfg {String} hostname Доменное имя хоста
 */
/**
 * @name Application/Env/ILocation#port
 * @cfg {String} Порт URL
 */
/**
 * @name Application/Env/ILocation#href
 * @cfg {String} Ссылка данной страницы (весь URL)
 */
/**
 * @name Application/Env/ILocation#pathname
 * @cfg {String} Путь (файл) данной страницы
 */
/**
 * @name Application/Env/ILocation#search
 * @cfg {String} Возвращает строка запроса с URL (querystring)
 */
/**
 * @name Application/Env/ILocation#hash
 * @cfg {String} Возвращает #-часть URL
 */

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
 * @interface Application/Env/ICookie
 * @extends Application/_Request/IStore
 * @public
 * @author Санников К.А.
 */
export interface ICookie extends IStore {
    /**
     * Получение значение из cookie
     * @param {String}
     */
    get(key: string): string | null;
    /**
     * Устанавливаем cookie
     * @param {String} key
     * @param {String} value
     * @param {Partial<ICookieOptions>} options
     * @throws {Error} ошибка установки значения
     */
    set(key: string, value: string, options?: Partial<ICookieOptions>): boolean;
    /**
     * Удаляем cookie
     * @param {String} key
     * @throws {Error} ошибка очистки значения
     */
    remove(key: string): void;
    /**
     * Очистка всех закэшированных значений cookie
     */
    clearCache?(): void;
}
