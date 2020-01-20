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
 * Модуль-библиотека для работы с окружением.
 * @remark
 * Содержит реализации интерфейсов из {@link Application/Interface}.
 * @library Application/Env
 * @includes EnvBrowser Application/_Env/Browser/Env
 * @includes StateReceiver Application/_Env/Browser/StateReceiver
 * @includes cookie Application/Env/cookie
 * @includes location Application/Env/location
 * @includes logger Application/Env/logger
 * @includes LogLevel Application/Env/Console/LogLevel
 * @includes query Application/Env/query
 * @author Санников К.А.
 */

/**
 * @module
 * @name Application/Env
 */

function isAppInit() {
    if (!Request.getCurrent()) {
        try {
            throw new Error("Application isn't initialized!");
        } catch (e) {
            throw new Error(e.stack);
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
 * @class
 * @name Application/Env/query
 * @author Ибрагимов А.А
 */
export const query: PARAMS = {
    /**
     * @cfg {Object} Извлеченные HASH параметры
     * @name Application/Env/query#hash
     */
    get hash() {
        return parseQueryHash(location.href);
    },
    /**
     * @cfg {Object} Извлеченные GET параметры
     * @name Application/Env/query#get
     */
    get get() {
        return parseQueryGet(location.href);
    }
};

/**
 * Реализация {@link Application/_Interface/ILocation} - обобщенного window.location.
 * @class
 * @name Application/Env/location
 * @implements Application/_Interface/ILocation
 * @see Application/_Interface/ILocation
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
};

/**
 * Реализация {@link Application/_Interface/ICookie} - интерфейса по работе с cookie
 * @class
 * @name Application/Env/cookie
 * @implements Application/_Interface/ICookie
 * @see Application/_Interface/ICookie
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
};

/**
 * Реализация {@link Application/_Interface/IConsole} - логгера
 * @class
 * @name Application/Env/logger
 * @implements Application/_Interface/IConsole
 * @see Application/_Interface/IConsole
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
 * @return {Application/_Interface/IStateReceiver}
 * @see Application/_Interface/IStateReceiver
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
 * @return {Application/_Interface/IStore}
 * @see Application/_Interface/IStore
 */
export function getStore<T = Record<string, string>>(type: string, createDefaultStore?: () => IStore<T>): IStore<T> {
    isAppInit();
    return Request.getCurrent().getStore<T>(type, createDefaultStore);
}

/**
 * Метод, задающий текущее хранилище
 * @function
 * @name Application/Env#setStore
 * @param {String} type type
 * @param {Application/_Interface/IStore} store store
 */
export function setStore<T = Record<string, string>>(type: string, store: IStore<T>) {
    isAppInit();
    return Request.getCurrent().setStore<T>(type, store);
}
