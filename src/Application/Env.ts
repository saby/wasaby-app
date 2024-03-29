export { default as EnvBrowser } from 'Application/_Env/Browser/Env';
export { default as EnvNodeJS } from 'Application/_Env/NodeJS/Env';
export {
    LogLevel as LogLevelNodeJS,
    default as ConsoleNodeJS,
} from 'Application/_Env/NodeJS/Console';
import {
    PARAMS,
    parseQueryGet,
    parseQueryHash,
} from 'Application/_Env/QueryParams';
export { LogLevel, default as BrowserConsole } from 'Application/_Env/Console';
import App from 'Application/_Env/App';
import type { IConsole } from 'Application/_Env/IConsole';
import type {
    ICookie,
    ICookieOptions,
    ILocation,
} from 'Application/_Env/Interfaces';
import type { IStore } from 'Application/_Request/IStore';
import type { IStateReceiver } from 'Application/_State/Interfaces';
export { IEnv } from 'Application/_Env/IEnv';
export { IHttpRequest } from 'Application/_Env/IHttpRequest';
export { IHttpResponse } from 'Application/_Env/IHttpResponse';
export { IConsole, ICookieOptions, ICookie, ILocation };
export { App };
/**
 * Модуль-библиотека для работы с окружением.
 * @remark
 * Содержит реализации интерфейсов из {@link Application/Interface}.
 * @library Application/Env
 * @public
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
 * @private
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
    },
};

/**
 * Реализация {@link Application/Env/ILocation} — обобщенного window.location.
 * @class Application/Env/location
 * @implements Application/Env/ILocation
 * @see Application/Env/ILocation
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

    set href(href: string) {
        App.getRequest().location.href = href;
    },

    get pathname(): string {
        return App.getRequest().location.pathname;
    },

    get search(): string {
        return App.getRequest().location.search;
    },

    get hash(): string {
        return App.getRequest().location.hash;
    },

    replace: (url: string): void => {
        App.getRequest().location.replace(url);
    },
};

/**
 * Реализация {@link Application/Env/ICookie} — интерфейса по работе с cookie.
 * @class Application/Env/cookie
 * @implements Application/Env/ICookie
 * @see Application/Env/ICookie
 * @author Санников К.А.
 * @public
 */
export const cookie: ICookie = {
    get(key: string): string {
        return App.getRequest().cookie.get(key);
    },

    set(key: string, value: string, options?: ICookieOptions): boolean {
        return App.getRequest().cookie.set(key, value, options);
    },

    remove(key: string): void {
        return App.getRequest().cookie.remove(key);
    },

    getKeys(): string[] {
        return App.getRequest().cookie.getKeys();
    },

    toObject(): Record<string, string> {
        return App.getRequest().cookie.toObject();
    },
};

/**
 * Основной механизм логгирования wasaby. В зависимости от окружения, подключается соответсвующая реализация.
 * Например, в браузере будет использован прямой проброс вызовов в console.log/info/warn/error.
 *  На сервере в основной механизм логгированя серверной платформы.
 * @class Application/Env/logger
 * @implements Application/_Env/IConsole
 * @see Application/_Env/IConsole
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
    },
};

/**
 * Метод, возвращающий компонент для восстановления состояний компонентов.
 * @function
 * @name Application/Env#getStateReceiver
 * @return {Application/_State/IStateReceiver}
 * @see Application/_State/IStateReceiver
 */
export function getStateReceiver(): IStateReceiver {
    return App.getRequest().getStateReceiver();
}

/**
 * Метод, возвращающий текущее хранилище.
 * @function
 * @name Application/Env#getStore
 * @param {String} type type
 * @return {Application/_Request/IStore}
 * @see Application/_Request/IStore
 */
export function getStore<T = Record<string, string>>(
    type: string,
    createDefaultStore?: () => IStore<T>
): IStore<T> {
    return App.getRequest().getStore<T>(type, createDefaultStore);
}

/**
 * Метод, задающий текущее хранилище.
 * @function
 * @name Application/Env#setStore
 * @param {String} type type
 * @param {Application/_Request/IStore} store store
 */
export function setStore<T = Record<string, string>>(
    type: string,
    store: IStore<T>
): void {
    return App.getRequest().setStore<T>(type, store);
}

/**
 * Получить текущий конфиг приложения
 * @param key
 */
export function getConfig(key: string): any {
    return App.getRequest().getConfig().get(key);
}

/**
 * Добавить значение в Config текущего запроса Request
 * @param key
 * @param value
 * @private
 */
export function setConfig(key: string, value: any): any {
    return App.getRequest().getConfig().set(key, value);
}
