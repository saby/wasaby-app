/// <amd-module name="Application/Env" />
export { default as EnvBrowser } from 'Application/_Env/Browser/Env';
export { default as EnvNodeJS } from 'Application/_Env/NodeJS/Env';
export { LogLevel as LogLevelNodeJS, default as ConsoleNodeJS } from 'Application/_Env/NodeJS/Console';
import { PARAMS, parseQueryGet, parseQueryHash } from 'Application/_Env/QueryParams';
export { LogLevel } from 'Application/_Env/Console';
import App from 'Application/_Env/App';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie, ICookieOptions } from 'Application/_Interface/ICookie';
import { ILocation } from 'Application/_Interface/ILocation';
import { IStateReceiver } from 'Application/_Interface/IStateReceiver';
import { IStore } from 'Application/_Interface/IStore';
export { App };
import Memoize from 'Application/_utils/memoize';

/**
 * Модуль-библиотека для работы с окружением.
 * @remark
 * Содержит реализации интерфейсов из {@link Application/Interface}.
 * @library Application/Env
 * @includes EnvBrowser Application/_Env/Browser/Env
 * @includes cookie Application/Env/cookie
 * @includes location Application/Env/location
 * @includes logger Application/Env/logger
 * @includes LogLevel Application/Env/Console
 * @includes query Application/Env/query
 * @author Санников К.А.
 */

/**
 * @module
 * @name Application/Env
 */

/**
 * Возвращает все GET и HASH параметры.
 * @example
 * <pre class="brush: js">
 *  require(['Application/Env'], function (Env) {
 *      var getParams = Env.query.get    // { name: 'ferret', color: 'purple' }
 *      var hashParams = Env.query.hash  // { name: 'leha', age: '2' }
 *  });
 * </pre>
 * @class Application/Env/query
 * @author Санников К.А.
 * @public
 */
export const query: PARAMS = {
    /**
     * @cfg {Object} Извлеченные HASH параметры
     * @name Application/Env/query#hash
     */
    get hash(): Record<string, string> {
        return parseQueryHash(location.href);
    },
    /**
     * @cfg {Object} Извлеченные GET параметры
     * @name Application/Env/query#get
     */
    get get(): Record<string, string> {
        return parseQueryGet(location.href);
    }
};

/**
 * Реализация {@link Application/_Interface/ILocation} — обобщенного window.location.
 * @class Application/Env/location
 * @implements Application/_Interface/ILocation
 * @see Application/_Interface/ILocation
 * @author Санников К.А.
 * @public
 */
export const location: ILocation = {
    get protocol(): string {
        return App.getRequest().location.protocol;
    },

    get host(): string {
        return App.getRequest().location.host;
    },

    get hostname(): string {
        return App.getRequest().location.hostname;
    },

    get port(): string {
        return App.getRequest().location.port;
    },

    get href(): string {
        return App.getRequest().location.href;
    },

    get pathname(): string {
        return App.getRequest().location.pathname;
    },

    get search(): string {
        return App.getRequest().location.search;
    },

    get hash(): string {
        return App.getRequest().location.hash;
    }
};

/**
 * Класс для кэширования куки
 */
class CacheCookie {
    memoize;
    cacheFn: Function;
    constructor() {
        this.cacheFn = this.get;
        this.memoize = new Memoize();
        this.get = this.memoize.add(this.get);
    }

    get(nameCookie: string) {
        return App.getRequest().cookie.get(nameCookie);
    }

    refresh(key: string, value: string): void {
        this.memoize.refresh(this.cacheFn, key, value)
    }

    remove(key: string): void {
        this.memoize.remove(this.cacheFn, key);
    }
}

function createCache(): void {
    if (!cookie.cache) {
        cookie.cache = new CacheCookie();
    }
};

/**
 * Реализация {@link Application/_Interface/ICookie} — интерфейса по работе с cookie.
 * @class Application/Env/cookie
 * @implements Application/_Interface/ICookie
 * @see Application/_Interface/ICookie
 * @author Санников К.А.
 * @public
 */
export const cookie: ICookie = {
    get(key: string): string {
        createCache();
        return cookie.cache.get(key);
    },

    set(key: string, value: string, options?: ICookieOptions): boolean {
        createCache();
        cookie.cache.refresh(key, value);
        return App.getRequest().cookie.set(key, value);
    },

    remove(key: string): void {
        createCache();
        cookie.cache.remove(key);
        return App.getRequest().cookie.remove(key);
    },

    getKeys(): string[] {
        return App.getRequest().cookie.getKeys();
    },

    toObject(): Record<string, string> {
        return App.getRequest().cookie.toObject();
    }
};

/**
 * Реализация {@link Application/_Interface/IConsole} — логгера.
 * @class Application/Env/logger
 * @implements Application/_Interface/IConsole
 * @see Application/_Interface/IConsole
 * @author Санников К.А.
 * @public
 */
export const logger: IConsole = {
    setLogLevel(level: number) {
        return App.getEnv().console.setLogLevel(level);
    },

    getLogLevel() {
        return App.getEnv().console.getLogLevel();
    },

    log(...args) {
        const console = App.getEnv().console;
        return console.log.apply(console, args);
    },

    info(...args) {
        const console = App.getEnv().console;
        return console.info.apply(console, args);
    },

    warn(...args) {
        const console = App.getEnv().console;
        return console.warn.apply(console, args);
    },

    error(...args) {
        const console = App.getEnv().console;
        return console.error.apply(console, args);
    }
};

/**
 * Метод, возвращающий компонент для восстановления состояний компонентов.
 * @function
 * @name Application/Env#getStateReceiver
 * @return {Application/_Interface/IStateReceiver}
 * @see Application/_Interface/IStateReceiver
 */
export function getStateReceiver(): IStateReceiver {
    return App.getRequest().getStateReceiver();
}

/**
 * Метод, возвращающий текущее хранилище.
 * @function
 * @name Application/Env#getStore
 * @param {String} type type
 * @return {Application/_Interface/IStore}
 * @see Application/_Interface/IStore
 */
export function getStore<T = Record<string, string>>(type: string, createDefaultStore?: () => IStore<T>): IStore<T> {
    return App.getRequest().getStore<T>(type, createDefaultStore);
}

/**
 * Метод, задающий текущее хранилище.
 * @function
 * @name Application/Env#setStore
 * @param {String} type type
 * @param {Application/_Interface/IStore} store store
 */
export function setStore<T = Record<string, string>>(type: string, store: IStore<T>): void {
    return App.getRequest().setStore<T>(type, store);
}

/**
 * Получить текущий конфиг приложения
 * @param key
 */
export function getConfig(key: string): any {
    return App.getRequest().getConfig().get(key);
}
