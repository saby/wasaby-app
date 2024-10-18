/**
 * Модуль-библиотека для работы с окружением.
 * @remark
 * Содержит реализации интерфейсов из {@link Application/Interface}.
 * @library
 * @public
 * @module
 * @author Санников К.А.
 */

export { default as EnvBrowser } from 'Application/_Env/Browser/Env';
export { default as EnvNodeJS } from 'Application/_Env/NodeJS/Env';
export {
    LogLevel as LogLevelNodeJS,
    default as ConsoleNodeJS,
} from 'Application/_Env/NodeJS/Console';
export { query, hash } from 'Application/_Env/_query/Query';
export {PARAM_TYPE, PARAMS, PARAMS_SET} from './_Env/_query/QueryParams';
export { LogLevel, default as BrowserConsole } from 'Application/_Env/Console';
import App from 'Application/_Env/App';
import type { IConsole } from 'Application/_Env/IConsole';
import type { ICookie, ICookieOptions, ILocation } from 'Application/_Env/Interfaces';
import type { IStore } from 'Application/_Request/IStore';

export { location } from 'Application/_Env/Location';
export { getStateReceiver, getStateReceiverData } from 'Application/_Env/StateReceiver';
export { IEnv } from 'Application/_Env/IEnv';
export { IHttpRequest } from 'Application/_Env/IHttpRequest';
export { IHttpResponse } from 'Application/_Env/IHttpResponse';
export { IConsole, ICookieOptions, ICookie, ILocation };
export type { TConfig } from 'Application/_Env/App';
export { App };

/**
 * Реализация {@link Application/Env/ICookie} — интерфейса по работе с cookie.
 * @author Санников К.А.
 * @public
 */
export const cookie: ICookie = {
    get(key: string): string | null {
        return App.getRequest().cookie.get(key);
    },

    set(key: string, value: string, options?: ICookieOptions): boolean {
        return App.getRequest().cookie.set(key, value, options);
    },

    remove(key: string): void {
        return App.getRequest().cookie.remove(key);
    },

    clearCache(): void {
        App.getRequest().cookie.clearCache?.();
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
 * На сервере в основной механизм логгированя серверной платформы.
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
 * Метод, возвращающий текущее хранилище.
 */
export function getStore<T = Record<string, string>, S = IStore<T>>(
    type: string,
    createDefaultStore?: () => S
): S {
    return App.getRequest().getStore<T, S>(type, createDefaultStore);
}

/**
 * Метод, задающий текущее хранилище.
 */
export function setStore<T = Record<string, string>, S = IStore<T>>(type: string, store: S): void {
    return App.getRequest().setStore<T, S>(type, store);
}

/**
 * Получить текущий конфиг приложения
 */
export function getConfig(key: string): any {
    return App.getRequest().getConfig().get(key);
}

/**
 * Добавить значение в Config текущего запроса Request
 * @private
 */
export function setConfig(key: string, value: any): any {
    return App.getRequest().getConfig().set(key, value);
}
