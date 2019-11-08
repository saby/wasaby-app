/// <amd-module name="Application/Env" />
export { default as EnvBrowser } from 'Application/_Env/Browser/Env';
import { parseQueryHash, parseQueryGet, PARAMS } from 'Application/_Env/QueryParams';
export { default as StateReceiver } from 'Application/_Env/Browser/StateReceiver';
export { LogLevel } from 'Application/_Env/Console';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { ILocation } from 'Application/_Interface/ILocation';
import { IStateReceiver } from 'Application/_Interface/IStateReceiver';
import { IStore } from 'Application/_Interface/IStore';
import Request from 'Application/Request';

/**
 * Модуль-библиотека, с классами-реализациями интерфейсов из {@link Application/Interface}
 * Также содержит ряд полезных методов
 * @library Application/Env
 * @includes EnvBrowser Application/_Env/Browser/Env
 * @includes StateReceiver Application/_Env/Browser/StateReceiver
 * @includes LogLevel Application/_Env/Console
 * @includes cookie Application/Env/cookie
 * @includes location Application/Env/location
 * @includes logger Application/Env/logger
 * @author Санников К.А.
 * @see {@link query}
 */

/**
 * @module
 * @name Application/Env
 */

function isAppInit() {
    if (!Request.getCurrent()) {
        try {
            throw new Error("Application isn't initialized!")
        } catch (e) {
            throw new Error(e.stack)
        }
    }
}

/**
 * Возвращает все GET и HASH параметры
 * <pre>
 *  require(['Application/Env'], function (Env) {
 *      var getParams = Env.query.get    // { name: 'ferret', color: 'purple' }
 *      var hashParams = Env.query.hash  // { name: 'leha', age: '2' }
 *  });
 * </pre>
 * @typedef {Object} query
 * @property {Object} hash Извлеченные HASH параметры
 * @property {Object} get Извлеченные GET параметры
 * @author Ибрагимов А.А
 */
export const query: PARAMS = {
    get hash() {
        return parseQueryHash(location.href);
    },
    get get() {
        return parseQueryGet(location.href);
    }
};

/**
 * Реализация {@link Application/Interface:ILocation} - обобщенного window.location.
 * @class
 * @name Application/Env/location
 * @implements Application/Interface:ILocation
 * @see Application/Interface:ILocation
 */
export const location: ILocation = {
    get protocol() {
        return Request.getCurrent().location.protocol;
    },

    get host() {
        return Request.getCurrent().location.host;
    },

    get hostname() {
        return Request.getCurrent().location.hostname;
    },

    get port() {
        return Request.getCurrent().location.port;
    },

    get href() {
        return Request.getCurrent().location.href;
    },

    get pathname() {
        return Request.getCurrent().location.pathname;
    },

    get search() {
        return Request.getCurrent().location.search;
    },

    get hash() {
        return Request.getCurrent().location.hash;
    }
}

/**
 * Реализация {@link Application/Interface:ICookie} - интерфейса по работе с cookie
 * @class
 * @name Application/Env/cookie
 * @implements Application/Interface:ICookie
 * @see Application/Interface:ICookie
 */
export const cookie: ICookie = {
    get(key) {
        return Request.getCurrent().cookie.get(key);
    },

    set(key, value, options?) {
        return Request.getCurrent().cookie.set(key, value, options);
    },

    remove(key) {
        return Request.getCurrent().cookie.remove(key);
    },

    getKeys() {
        return Request.getCurrent().cookie.getKeys();
    },

    toObject() {
        return Request.getCurrent().cookie.toObject();
    }
}

/**
 * Реализация {@link Application/Interface:IConsole} - логгера
 * @class
 * @name Application/Env/logger
 * @implements Application/Interface:IConsole
 * @see Application/Interface:IConsole
 */
export const logger: IConsole = {
    setLogLevel(level: number) {
        return Request.getCurrent().console.setLogLevel(level);
    },

    getLogLevel() {
        return Request.getCurrent().console.getLogLevel();
    },

    log(...args) {
        const console = Request.getCurrent().console;
        return console.log.apply(console, args);
    },

    info(...args) {
        const console = Request.getCurrent().console;
        return console.info.apply(console, args);
    },

    warn(...args) {
        const console = Request.getCurrent().console;
        return console.warn.apply(console, args);
    },

    error(...args) {
        const console = Request.getCurrent().console;
        return console.error.apply(console, args);
    }
};

/**
 * Метод, возвращающий компонент для восстановления состояний компонентов
 * @function
 * @name Application/Env#getStateReceiver
 * @return {Application/Interface:IStateReceiver}
 */
export function getStateReceiver(): IStateReceiver {
    isAppInit();
    return Request.getCurrent().getStateReceiver();
}

/**
 * Метод, возвращающий текущее хранилище
 * @function
 * @name Application/Env#getStore
 * @param {String} type type
 * @return {Application/Interface:IStore}
 * @see Application/Interface:IStore
 */
export function getStore(type: string): IStore {
    isAppInit();
    return Request.getCurrent().getStore(type);
}

/**
 * Метод, задающий текущее хранилище
 * @function
 * @name Application/Env#setStore
 * @param {String} type type
 * @param {Application/Interface:IStore} store store
 */
export function setStore(type: string, store: IStore) {
    isAppInit();
    return Request.getCurrent().setStore(type, store);
}
