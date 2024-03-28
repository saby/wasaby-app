/* eslint-disable max-classes-per-file */

import { IConfig } from 'Application/_Interface/IConfig';

declare module 'Application/Config' {
    /**
     * Библиотека Config
     * @library Application/Config
     * @includes Config Application/_Config/Config
     * @public
     * @author Санников К.А.
     */
    export { default as Config } from 'Application/_Config/Config';
}

declare module 'Application/Env' {
    export { default as EnvBrowser } from 'Application/_Env/Browser/Env';
    export { default as EnvNodeJS } from 'Application/_Env/NodeJS/Env';
    export {
        LogLevel as LogLevelNodeJS,
        Console as ConsoleNodeJS,
    } from 'Application/_Env/NodeJS/Console';
    import { PARAMS } from 'Application/_Env/QueryParams';
    export { LogLevel } from 'Application/_Env/Console';
    import App from 'Application/_Env/App';
    import { IConsole } from 'Application/_Interface/IConsole';
    import { ICookie } from 'Application/_Interface/ICookie';
    import { ILocation } from 'Application/_Interface/ILocation';
    import { IStateReceiver } from 'Application/_Interface/IStateReceiver';
    import { IStore } from 'Application/_Interface/IStore';
    export { App };
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
    export const query: PARAMS;
    /**
     * Реализация {@link Application/_Interface/ILocation} — обобщенного window.location.
     * @class Application/Env/location
     * @implements Application/_Interface/ILocation
     * @see Application/_Interface/ILocation
     * @author Санников К.А.
     * @public
     */
    export const location: ILocation;
    /**
     * Реализация {@link Application/_Interface/ICookie} — интерфейса по работе с cookie.
     * @class Application/Env/cookie
     * @implements Application/_Interface/ICookie
     * @see Application/_Interface/ICookie
     * @author Санников К.А.
     * @public
     */
    export const cookie: ICookie;
    /**
     * Реализация {@link Application/_Interface/IConsole} — логгера.
     * @class Application/Env/logger
     * @implements Application/_Interface/IConsole
     * @see Application/_Interface/IConsole
     * @author Санников К.А.
     * @public
     */
    export const logger: IConsole;
    /**
     * Метод, возвращающий компонент для восстановления состояний компонентов.
     * @function
     * @name Application/Env#getStateReceiver
     * @return {Application/_Interface/IStateReceiver}
     * @see Application/_Interface/IStateReceiver
     */
    export function getStateReceiver(): IStateReceiver;
    /**
     * Метод, возвращающий текущее хранилище.
     * @function
     * @name Application/Env#getStore
     * @param {String} type type
     * @return {Application/_Interface/IStore}
     * @see Application/_Interface/IStore
     */
    export function getStore<T = Record<string, string>>(
        type: string,
        createDefaultStore?: () => IStore<T>
    ): IStore<T>;
    /**
     * Метод, задающий текущее хранилище.
     * @function
     * @name Application/Env#setStore
     * @param {String} type type
     * @param {Application/_Interface/IStore} store store
     */
    export function setStore<T = Record<string, string>>(
        type: string,
        store: IStore<T>
    ): any;
}

declare module 'Application/Initializer' {
    import { IEnv } from 'Application/_Interface/IEnv';
    import { ISerializableState } from 'Application/_Interface/ISerializableState';
    import { IStateReceiver } from 'Application/_Interface/IStateReceiver';
    export const startRequest: any;
    export const isInit: any;
    export default function (
        cfg?: Record<string, unknown>,
        env?: IEnv,
        sr?: IStateReceiver
    ): void;
    export function registerComponent(
        uid: string,
        component: ISerializableState
    ): void;
    /**
     * Обещание сообщить об инициализации приложения
     * @param callback Function
     * @private
     */
    export function then<T = unknown>(callback: () => T): Promise<T>;
}

declare module 'Application/Interface' {
    /**
     * Библиотека интерфейсов
     * @library Application/Interface
     * @includes IConsole Application/_Interface/IConsole
     * @includes ICookie Application/_Interface/ICookie
     * @includes IConfig Application/_Interface/IConfig
     * @includes IEnv Application/_Interface/IEnv
     * @includes ILocation Application/_Interface/ILocation
     * @includes ISerializableState Application/_Interface/ISerializableState
     * @includes IStore Application/_Interface/IStore
     * @includes IStateReceiver Application/_Interface/IStateReceiver
     * @includes IRequest Application/_Interface/IRequest
     * @includes IHead Application/_Interface/IHead
     * @includes IHttpRequest Application/_Interface/IHttpRequest
     * @includes IHttpResponse Application/_Interface/IHttpResponse
     * @public
     * @author Санников К.А.
     */
    export * from 'Application/_Interface/IConsole';
    export * from 'Application/_Interface/ICookie';
    export * from 'Application/_Interface/IConfig';
    export * from 'Application/_Interface/IEnv';
    export * from 'Application/_Interface/ILocation';
    export * from 'Application/_Interface/ISerializableState';
    export * from 'Application/_Interface/IStore';
    export * from 'Application/_Interface/IStateReceiver';
    export * from 'Application/_Interface/IRequest';
    export * from 'Application/_Interface/IHead';
    export * from 'Application/_Interface/IHttpRequest';
    export * from 'Application/_Interface/IHttpResponse';
}

declare module 'Application/Page' {
    /**
     * Библиотека управления страницей. Например, ее заголовок, список загруженных ресурсов или og описание
     *
     * @library Application/Page
     * @public
     * @includes Head Application/_Page/Head
     * @author Печеркин С.В.
     */
    export { Head } from 'Application/_Page/Head';
}

declare module 'Application/Request' {
    import { default as Request } from 'Application/_Request/Request';
    /**
     * Библиотека c классами для работы с запросами и хранилищем
     * @library Application/Request
     * @includes Request Application/_Request/Request
     * @includes Store Application/_Request/Store
     * @public
     * @author Санников К.А.
     */
    export default Request;
    export { default as Store } from 'Application/_Request/Store';
}
declare module 'State' {
    /**
     * Библиотека для работы с сериализованным состоянием.
     * @library Application/State
     * @includes StateReceiver Application/_State/StateReceiver
     * @author Санников К.А.
     */
    export { StateReceiver } from 'Application/_State/StateReceiver';
}

declare module 'Application/_Config/Config' {
    import { ISerializableState } from 'Application/_Interface/ISerializableState';
    type IData = Record<string, any>;
    /**
     * Класс Config
     * @class Application/_Config/Config
     * @public
     * @implements Application/_Interface/ISerializableState
     * @author Санников К.А.
     */
    export default class Config implements ISerializableState {
        private data;
        private __uid;
        constructor(data?: IData, __uid?: string);
        /**
         * Получить данные по ключу
         * @param {String} key
         * @return {Native}
         */
        get(key: keyof IData): IData[keyof IData];
        /**
         * Добавить/установить значение по ключу
         * @param {String} key
         * @param {String} value
         * @return {Native}
         */
        set(key: keyof IData, value: any): void;
        /**
         * Получить состояние
         * @return {IData}
         */
        getState(): IData;
        /**
         * Задать состояние
         * @param {IData} data
         */
        setState(data: IData): void;
        /**
         * Получить UID
         * @return {String}
         */
        getUID(): string;
    }
}

declare module 'Application/_Env/App' {
    import { IEnv } from 'Application/_Interface/IEnv';
    import { IRequest } from 'Application/_Interface/IRequest';
    import { ISerializableState } from 'Application/_Interface/ISerializableState';
    import { IStateReceiver } from 'Application/_Interface/IStateReceiver';
    import { IHttpRequest } from 'Application/_Interface/IHttpRequest';
    import { IHttpResponse } from 'Application/_Interface/IHttpResponse';
    type TConfig = Record<string, any>;
    export default class App {
        private env: IEnv;
        constructor(cfg?: TConfig, env?: IEnv, stateReceiver?: IStateReceiver);
        private static instance: App;
        private static singletonCrossEnv: Map<string, ISerializableState>;
        static getRequest(): IRequest;
        static startRequest(
            cfg?: TConfig,
            stateReceiver?: IStateReceiver,
            req?: IHttpRequest,
            res?: IHttpResponse
        ): void;
        /**
         * Метод, для регистрации одиночки, который должен восстанавливать своё состояние на клиенте.
         * @param uid {String} Уникальный идентификатор одиночки.
         * @param component {Application/Interface.ISerializableState} Экземпляр одиночки.
         */
        static registerSingleton(
            uid: string,
            component: ISerializableState
        ): void;
        static isInit(): boolean;
        static getInstance(): App | never;
    }
}

declare module 'Application/_Env/Console' {
    import { IConsole } from 'Application/_Interface/IConsole';
    /**
     * Содержит константы уровня логирования - {@link LogLevel}
     * @class Application/Env/Console
     * @author Санников К.А.
     * @public
     */
    /**
     * [typedef] Уровень логирования
     * @class
     * @name Application/Env/Console/LogLevel
     * @author Санников К.А.
     * @todo Описать как typedef, когда это будет поддерживать автодока
     *
     */
    export enum LogLevel {
        /**
         * @cfg info
         * @name Application/Env/Console/LogLevel#info
         */
        info = 0,
        /**
         * @cfg warning
         * @name Application/Env/Console/LogLevel#warning
         */
        warning = 1,
        /**
         * @cfg error
         * @name Application/Env/Console/LogLevel#error
         */
        error = 2,
    }
    /**
     * Класс Console
     * @class
     * @implements Application/_Interface/IConsole
     * @author Санников К.А.
     * @private
     * @see {@link LogLevel}
     */
    export default class Console implements IConsole {
        private __logLevel;
        private __console;
        private isShow;
        constructor(console: any);
        /**
         * Задать уровень логирования
         * @param {LogLevel} mode
         */
        setLogLevel(mode: LogLevel): void;
        /**
         * Получить уровень логирования
         * @return {LogLevel} loglevel
         */
        getLogLevel(): LogLevel;
        info(): void;
        log(): void;
        warn(): any;
        error(): void;
    }
}

declare module 'Application/_Env/ObjectStore' {
    import { IStore } from 'Application/_Interface/IStore';
    export default class ObjectStore implements IStore {
        private __data;
        get(key: string): any;
        set(key: string, value: string): boolean;
        remove(key: string): void;
        getKeys(): string[];
        toObject(): {};
    }
}

declare module 'Application/_Env/QueryParams' {
    /**
     * @cfg {String} query URL-Like строка, содержащая GET- и/или HASH- параметры
     * @name Application/_Env/QueryParams#query
     */
    /**
     * Функция parseQueryHash получает URL-Like строку и возвращает все ивзлеченные HASH-параметры
     * @param {String} query URL-Like строка, содержащая HASH-параметры
     * @return {PARAMS_SET} Извлеченные параметры
     * @example
     * <pre>
     *  require(['Application/_Env/QueryParams'], function (QueryParams) {
     *      var getParams = QueryParams.parseQueryHash(window.location) // { name: 'ferret', color: 'purple' }
     *  });
     * </pre>
     */
    export const parseQueryHash: (query: string) => Record<string, string>;
    /**
     * Функция parseQueryHash получает URL-Like строку и возвращает все ивзлеченные GET-параметры
     * @param {String} query URL-Like строка, содержащая GET-параметры
     * @return {PARAMS_SET} Извлеченные параметры
     * @example
     * <pre>
     *  require(['Application/_Env/QueryParams'], function (QueryParams) {
     *      var hashParams = QueryParams.parseQueryGet(window.location) // { name: 'leha', age: '2' }
     *  });
     * </pre>
     */
    export const parseQueryGet: (query: string) => Record<string, string>;
    /**
     * Извлекает параметры всех типов
     * @param {String} query Строка с get и hash параметрами
     * @returns {Object}
     */
    export function extractQuery(query: string, param: string): PARAMS_SET;
    /**
     * Извлекает параметры из строки
     * @param {String} str Строка get/hash параметров, разделенных &
     * @returns {PARAMS_SET} Словарь параметров
     */
    export function extractParams(str: string): PARAMS_SET;
    /**
     * @typedef {Object} PARAMS
     * @property {PARAMS_SET} get Словарь GET параметров
     * @property {PARAMS_SET} hash Словарь HASH параметров
     */
    export type PARAMS = {
        [param_type in PARAM_TYPE]: PARAMS_SET;
    };
    /**
     * @typedef {String} PARAM_TYPE
     * @variant hash HASH параметры строки
     * @variant get GET параметры строки
     */
    type PARAM_TYPE = 'hash' | 'get';
    /**
     * Словарь параметров, ключом является имя параметра, значением - значение параметра
     * @typedef {Object} PARAMS_SET
     */
    type PARAMS_SET = Record<string, string>;
}

declare module 'Application/_Env/Browser/Cookie' {
    import { ICookie, ICookieOptions } from 'Application/_Interface/ICookie';
    /**
     * Класс предназначенный для работы с cookie в браузере,
     * @class
     * @name _Request/_Storage/Cookie
     * @implements Application/_Interface/ICookie
     * @implements Application/_Interface/IStore
     * @author Санников К.А.
     */
    export default class Cookie implements ICookie {
        private readonly isCoookieAvailable;
        cosntructor(): void;
        get(key: string): any;
        set(
            key: string,
            value: string,
            options?: Partial<ICookieOptions>
        ): boolean;
        remove(key: string): void;
        getKeys(): string[];
        toObject(): {};
    }
}

declare module 'Application/_Env/Browser/Env' {
    import { IConsole } from 'Application/_Interface/IConsole';
    import { ICookie } from 'Application/_Interface/ICookie';
    import { IEnv } from 'Application/_Interface/IEnv';
    import { ILocation } from 'Application/_Interface/ILocation';
    import {
        IRequest,
        IRequestInternal,
    } from 'Application/_Interface/IRequest';
    import { IStoreMap } from 'Application/_Interface/IStore';
    /**
     * Браузерное окружение
     * Класс EnvBrowser
     * @class Application/_Env/Browser/Env
     * @author Санников К.А.
     * @implements {Application/_Interface/IEnv}
     * @public
     */
    export default class EnvBrowser implements IEnv {
        /**
         * Флаг с обозначением того, что можно создавать Request
         * @cfg {Boolean} initRequest
         * @name Application/_Env/Browser/Env#initRequest
         */
        initRequest: boolean;
        private _request;
        /**
         * @cfg {Application/_Interface/IConsole} console
         * @name Application/_Env/Browser/Env#console
         */
        console: IConsole;
        /**
         * @cfg {Application/_Interface/ICookie} cookie
         * @name Application/_Env/Browser/Env#cookie
         */
        cookie: ICookie;
        /**
         * @cfg {Application/_Interface/ILocation} location
         * @name Application/_Env/Browser/Env#location
         */
        location: ILocation;
        /**
         * @cfg {Application/Interface/IStore/IStoreMap} storages
         * @name Application/_Env/Browser/Env#storages
         */
        storages: IStoreMap;
        private envConfig;
        constructor(data: Record<string, any>);
        getRequest(): IRequest;
        createRequest(requestConfig: IConfig): IRequestInternal;
    }
}

declare module 'Application/_Env/NodeJS/Console' {
    import { IConsole } from 'Application/Interface';
    export default class Console implements IConsole {
        private __logLevel;
        constructor();
        setLogLevel(mode: number): void;
        getLogLevel(): number;
        info(...args: string[]): void;
        log(...args: string[]): void;
        warn(...args: string[]): void;
        error(...args: string[]): void;
    }
}

declare module 'Application/_Env/NodeJS/Cookie' {
    import { ICookie, ICookieOptions } from 'Application/Interface';
    import { IHttpRequest } from 'Application/_Interface/IHttpRequest';
    import { IHttpResponse } from 'Application/_Interface/IHttpResponse';
    /**
     * Класс, реализующий интерфейс {@link Core/Request/IStorage},
     * предназначенный для работы с cookie в браузере
     * @class Application/_Env/NodeJS/Cookie
     * @private
     * @implements Core/Request/IStorage
     * @author Заляев А.В.
     */
    export default class Cookie implements ICookie {
        constructor(
            getRequest: () => Partial<IHttpRequest>,
            getResponse: () => Partial<IHttpResponse>
        );
        private getRequest(): Partial<IHttpRequest>;
        private getResponse(): Partial<IHttpResponse>;
        get(): string | null;
        set(
            _key: string,
            _value: string,
            _options?: Partial<ICookieOptions>
        ): boolean;
        remove(key: string): void;
        getKeys(): string[];
        toObject(): Record<string, string>;
    }
}

declare module 'Application/_Env/NodeJS/Env' {
    import { Config } from 'Application/Config';
    import {
        IConsole,
        ICookie,
        IEnv,
        ILocation,
        IRequest,
        IRequestInternal,
        IStoreMap,
    } from 'Application/Interface';
    import { IHttpResponse } from 'Application/_Interface/IHttpResponse';
    import { IHttpRequest } from 'Application/_Interface/IHttpRequest';
    /**
     * Неполноценное окружение для запуска Application под NodeJS
     * Используется в тестах, билдере, везде, где нет request'a
     * @class Application/_Env/NodeJS/Env
     * @public
     * @implements {Application/_Interface/IEnv}
     */
    export default class EnvNodeJS implements IEnv {
        /**
         * Флаг с обозначением того, что можно создавать Request
         * @cfg {Boolean} initRequest
         * @name Application/_Env/NodeJS/Env#initRequest
         */
        initRequest: boolean;
        console: IConsole;
        cookie: ICookie;
        location: ILocation;
        storages: IStoreMap;
        private envConfig: Config;
        constructor(data: Record<string, unknown>);
        getRequest(): IRequest;
        createRequest(
            requestConfig: IConfig,
            requestGetter: () => IHttpRequest,
            responseGetter: () => IHttpResponse
        ): IRequestInternal;
    }
}

declare module 'Application/_Env/NodeJS/Location' {
    import { ILocation } from 'Application/Interface';
    import { IHttpRequest } from 'Application/_Interface/IHttpRequest';
    export default class Location implements ILocation {
        private hostMask: RegExp;
        private searchMask: RegExp;
        constructor(requestGetter: Function);
        private requestGetter(): Partial<IHttpRequest>;
        private getReqProp<K extends keyof IHttpRequest>(
            prop: K
        ): Partial<IHttpRequest>[K] | '';
        get pathname(): string;
        get protocol(): string;
        get port(): string;
        get host(): string;
        get hostname(): string;
        get href(): string;
        get search(): string;
        get hash(): string;
        replace(path: string): void;
    }
}

declare module 'Application/_Interface/IConfig' {
    type IData = Record<string, any>;
    /**
     * Интерфейс IConfig
     * @interface Application/_Interface/IConfig
     * @public
     * @author Санников К.А.
     */
    export interface IConfig {
        /**
         * get
         * @function
         * @name Application/Interface/IConfig#get
         * @param {String} key
         */
        get(key: keyof IData): IData[keyof IData];
    }
}

declare module 'Application/_Interface/IConsole' {
    /**
     * Интерфейс для логгера. Для того что бы избавиться от IoC('ILogger').
     * IoC вызывает у нас много непонятных проблем с цикличной зависимостью.
     * @interface Application/_Interface/IConsole
     * @public
     * @author Санников К.А.
     */
    export interface IConsole {
        /**
         * Задать уровень логирования
         * @param {Number} loglevel
         */
        setLogLevel(logLevel: number): void;
        /**
         * Получить уровень логирования
         * @return {Number} loglevel
         */
        getLogLevel(): number;
        /**
         * Вывести в консоль информацию
         * @param {*} args
         */
        info(...args: any): void;
        /**
         * Вывести в консоль данные
         * @param {*} args
         */
        log(...args: any): void;
        /**
         * Вывести в консоль предупреждение
         * @param {*} args
         */
        warn(...args: any): void;
        /**
         * Вывести в консоль ошибку
         * @param {*} args
         */
        error(...args: any): void;
    }
}

declare module 'Application/_Interface/ICookie' {
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
    export interface ICookie extends IStore {
        /**
         * Получение значение из cookie
         * @param {String}
         */
        get(key: string): string;
        /**
         * Устанавливаем cookie
         * @param {String} key
         * @param {String} value
         * @param {Partial<ICookieOptions>} options
         * @throws {Error} ошибка установки значения
         */
        set(
            key: string,
            value: string,
            options?: Partial<ICookieOptions>
        ): boolean;
        /**
         * Удаляем cookie
         * @param {String} key
         * @throws {Error} ошибка очистки значения
         */
        remove(key: string): void;
    }
}

declare module 'Application/_Interface/IEnv' {
    import { IConfig } from 'Application/_Interface/IConfig';
    import { IConsole } from 'Application/_Interface/IConsole';
    import { ICookie } from 'Application/_Interface/ICookie';
    import { ILocation } from 'Application/_Interface/ILocation';
    import {
        IRequest,
        IRequestInternal,
    } from 'Application/_Interface/IRequest';
    import { IHttpRequest } from 'Application/_Interface/IHttpRequest';
    import { IHttpResponse } from 'Application/_Interface/IHttpResponse';
    /**
     * Интерфейс IEnv
     * @interface Application/_Interface/IEnv
     * @public
     * @author Санников К.А.
     */
    export interface IEnv {
        /** Инициализировать request при старте приложения */
        readonly initRequest: boolean;
        console: IConsole;
        cookie: ICookie;
        location: ILocation;
        getRequest(): IRequest;
        createRequest(
            requestConfig: IConfig,
            requestGetter: () => IHttpRequest,
            responseGetter: () => IHttpResponse
        ): IRequestInternal;
    }
}

declare module 'Application/_Interface/IHead' {
    import { IStore } from 'Application/_Interface/IStore';
    /**
     * Интерфейс объекта, описывающего аттрибуты тега для API Head
     * @interface Application/_Interface/IHeadTagAttrs
     * @public
     * @author Печеркин С.В.
     */
    export interface IHeadTagAttrs {
        charset?: string;
        class?: string;
        content?: string;
        'css-entity-name'?: string;
        'css-entity-theme'?: string;
        defer?: string;
        href?: string;
        'http-equiv'?: string;
        key?: string;
        name?: string;
        property?: string;
        rel?: string;
        src?: string;
        'theme-type'?: string;
        type?: string;
        URL?: string;
    }
    /**
     * Интерфейс объекта, описывающего обработчики событий тега для API Head
     * @interface Application/_Interface/IHeadTagEventHandlers
     * @public
     * @author Печеркин С.В.
     */
    export interface IHeadTagEventHandlers {
        load?: Function;
        error?: Function;
    }
    /**
     * Интерфейс одного тега для API Head
     * @interface Application/_Interface/IHeadTag
     * @property {string} name - имя тега (title, meta, script)
     * @property {IHeadTagAttrs} attrs - дополнительные аттрибуты для тега
     * @property {string} content - содержимое тега. Актульано, например, для тега script
     * @author Печеркин С.В.
     */
    export interface IHeadTag {
        name: string;
        attrs: IHeadTagAttrs;
        content?: string;
        eventHandlers?: IHeadTagEventHandlers;
    }
    /** Технический интерфейс для разрешения циклических определений в типе JML */
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface JsonML extends JML {}
    /** Структура, которая однозначно описывает 1 тег первого уровня внутри head страницы */
    export type IHeadTagId = string;
    /**
     * Тип для описания верстки, прнятый как стандарт в СБИС
     * https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
     */
    export type JML = [string, (object | JsonML | string)?, (JsonML | string)?];
    /**
     * API для работы с <head> страницы
     * @interface Application/_Interface/IHead
     * @property {Function} createComment - добавит строку с комментарием внутрь тега <head>
     * @property {Function} createNoScript - добавит конструкцию noscript с указанным URL
     * @property {Function} createTag - добавит тег внутрь <head>. Если такой тег уже есть - перерисует его
     * @property {Function} getTag - вернет описание тега(ов), если он есть по входным данным: имя тега и какие-то аттрибуты
     * @property {Function} deleteTag - удалит тег из <head>, если он есть
     * @property {Function} getData - вернет текущее состояние тегов с учетом их добавления/удаления в формате JsonML
     * @property {Function} getComments - вернет все зарегистрированные комментарии в виде строк без <!-- --> (wrap)
     * @property {Function} clear - очистит внутреннее состояние. Имеет смысл вызывать только на ПП
     * @see https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
     * @public
     * @author Печеркин С.В.
     */
    export interface IInternalHead {
        createComment(text: string): void;
        createNoScript(URL: any): void;
        createTag(
            name: string,
            attrs: IHeadTagAttrs,
            content?: string,
            eventHandlers?: IHeadTagEventHandlers
        ): IHeadTagId;
        deleteTag(id: IHeadTagId): void;
        getTag(
            name?: string,
            attrs?: IHeadTagAttrs
        ): IHeadTagId | IHeadTagId[] | null;
        getData(id?: IHeadTagId): JML[] | JML;
        getComments(wrap?: boolean): string[];
        clear(): any;
    }
    export interface IHead extends IStore<IInternalHead>, IInternalHead {}
}

declare module 'Application/_Interface/ILocation' {
    /**
     * Описание обобщенного window.location.
     * Выписаны те поля, которые есть на сервисе представления и в браузере
     * @interface Application/_Interface/ILocation
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
}

declare module 'Application/_Interface/IRequest' {
    import Config from 'Application/_Config/Config';
    import { IConsole } from 'Application/_Interface/IConsole';
    import { ICookie } from 'Application/_Interface/ICookie';
    import { ILocation } from 'Application/_Interface/ILocation';
    import { IStateReceiver } from 'Application/_Interface/IStateReceiver';
    import { IStore } from 'Application/_Interface/IStore';
    /**
     * Компонент, которые предоставляет в платформе доступ к синглтонам в рамках запроса пользователя.
     * @interface Application/_Interface/IRequest
     * @public
     * @author Санников К.А.
     */
    export interface IRequest {
        /**
         * @name Application/_Interface/IRequest#cookie
         * @cfg {ICookie} cookie
         */
        cookie: ICookie;
        /**
         * @name Application/_Interface/IRequest#location
         * @cfg {ILocation} location
         */
        location: ILocation;
        /**
         * Получить Config
         * @return {Application/_Config/Config}
         */
        getConfig(): Config;
        /**
         * Доступ к объекту сохранения состояния на сервиспе представлений,
         * для его получения на клиенте. Не привязан к VDOM механизмам,
         * поэтому можно будет его использовать в не визуальных компонентах.
         * @return {Application/_Interface/IStateReceiver}
         */
        getStateReceiver(): IStateReceiver;
        /**
         * Получение хранилища для сохранений данных в рамках запроса.
         * @param {String} key Тип хранилища.
         * @return {Application/_Interface/IStore} Хранилище
         */
        getStore<T = Record<string, string>>(
            key: string,
            createDefaultStore?: () => IStore<T>
        ): IStore<T>;
        /**
         * Установка хранилища
         * @param {String} key Тип хранилища.
         * @param {Application/_Interface/IStore} storage Хранилище.
         */
        setStore<T = Record<string, string>>(
            key: string,
            storage: IStore<T>
        ): void;
    }
    export interface IRequestInternal extends IRequest {
        setStateReceiver(stateReceiver: IStateReceiver): void;
    }
}

declare module 'Application/_Interface/IHttpRequest' {
    import { IRequest } from 'Application/_Interface/IRequest';
    /**
     * Интерфейс, описывающий базовый API объекта запроса (request)
     * @interface Application/_Interface/IHttpRequest
     * @public
     * @author Мустафин Л.И.
     */
    export interface IHttpRequest {
        appRequest: IRequest;
        compatible: boolean;
        baseUrl: string;
        path: string;
        protocol: string;
        hostname: string;
        url: string;
        query?: object;
        headers: Record<string, string>;
        cookies: Record<string, string>;
        get(header: string): string;
        header(header: string): string;
    }
}

declare module 'Application/_Interface/IHttpResponse' {
    import { ICookieOptions } from 'Application/_Interface/ICookie';
    /**
     * Интерфейс, описывающий базовый API объекта ответа (response)
     * @interface Application/_Interface/IHttpResponse
     * @public
     * @author Мустафин Л.И.
     */
    export interface IHttpResponse {
        clearCookie(
            key: string,
            options?: Partial<ICookieOptions>
        ): IHttpResponse;
        cookie(
            key: string,
            value: string,
            options?: Partial<ICookieOptions>
        ): IHttpResponse;
        header(name: string, value: unknown): IHttpResponse;
        set(name: string, value: unknown): IHttpResponse;
        redirect(path: string): IHttpResponse;
        send(body: string): IHttpResponse;
        status(code: number): IHttpResponse;
    }
}

declare module 'Application/_Interface/ISerializableState' {
    /**
     * Интерфейс, который нужно поддержать компонентам, что бы их можно было сериализовать
     * и восстановливать их состояние в любой момент
     * @interface Application/_Interface/ISerializableState
     * @public
     * @author Санников К.А.
     * @example
     * <pre>
     * const DEFAULT_STATE = {
     *     // ...
     * }
     * class Control implements ISerializableState {
     *    private __uid: string;
     *    protected _state: Record<string, any>;
     *    constructor(...args) {
     *        stateReceiver.register(this.__uid, this);
     *        // ...
     *    }
     *    getState(): Record<string, any> {
     *        return this._state || {}
     *    }
     *    setState(data: Record<string, any>): void {
     *        this._state = {
     *            ...DEFAULT_STATE,
     *            ...data
     *        }
     *        this._redraw();
     *    }
     *    destroy() {
     *        stateReceiver.unregister(this.__uid);
     *        // ...
     *    }
     * }
     * </pre>
     */
    export interface ISerializableState {
        /**
         * Получаем состояние для сериализации
         */
        getState(): Record<string, any>;
        /**
         * Устанавливаем состояния после десериализации
         */
        setState(data: Record<string, any>): void;
    }
}

declare module 'Application/_Interface/IStateReceiver' {
    import { IConsole } from 'Application/_Interface/IConsole';
    import { ISerializableState } from 'Application/_Interface/ISerializableState';
    /**
     * Интерфейс компонента для восстановления состояний компонентов.
     * Необходим для получения данных состояний компонентов созданных на сервер.
     * @interface Application/_Interface/IStateReceiver
     * @private
     * @author Санников К.А.
     */
    export interface IStateReceiver {
        /**
         * Получить сериализованное состояние всех зарегестрированных компонентов.
         * Используется для сохранения состояния страницы при построении на сервере.
         * @remark
         * TODO сделал возвращаемый тип any, потому что UI/_base/StateReceiver возвращает ISerializedType.
         * Нужно будет переделывать.
         * @return {any}
         */
        serialize(): any;
        /**
         * Установить состояние всем зарегестрированным компонентам.
         * Используется при оживлении страницы после серверной вёрстки.
         * @param {String} data Данные
         */
        deserialize(data: string): void;
        /**
         * Зарегистрировать компоненты, состояние которых необходимо сохранить.
         * @param {String} uid Идентификатор инстанса, для идентификации сохраненного для него состояния.
         * @param {Application/_Interface/ISerializableState} component Сериализируемый компонент.
         */
        register(uid: string, component: ISerializableState): void;
        /**
         * Отменить регистрацию по идентификатору инстанса.
         * @param {String} uid Идентификатор инстанса.
         */
        unregister(uid: string): void;
        /**
         * установить логгер
         * @param  {Application/_Interface/IConsole} логгер.
         */
        setLogger(Logger: IConsole): void;
        /**
         * вернуть логгер
         * @return {Application/_Interface/IConsole} логгер.
         */
        _getLogger(): IConsole;
    }
}

declare module 'Application/_Interface/IStore' {
    /**
     * Описание интерфейса компонента, для работы неким Storage.
     * Необходим для того что бы создавать хранилище на клиенте и на сервисе представления.
     * @interface Application/_Interface/IStore
     * @public
     * @author Санников К.А.
     * @see Application/Interface/IStore/IStoreMap
     */
    export interface IStore<T = Record<string, string>> {
        get: <K extends keyof T & string>(key: K) => T[K] | never;
        set: <K extends keyof T & string>(key: K, value: T[K]) => boolean;
        remove(key: keyof T): void;
        getKeys(): (keyof T & string)[];
        toObject(): {
            [key in keyof T]: T[key];
        };
    }
    /**
     * Получить значение поля по ключу
     * @function
     * @name  Application/_Interface/IStore#get
     * @param {String} key Ключ
     * @return {<[T=string]>|null}
     */
    /**
     * Задать значение полю по ключу
     * @function
     * @name  Application/_Interface/IStore#set
     * @param {String} key Ключ
     * @return {Boolean} Успех операции
     */
    /**
     * Удалить поле по ключу
     * @function
     * @name  Application/_Interface/IStore#remove
     * @param {String} key Ключ
     */
    /**
     * Получить все ключи
     * @function
     * @name  Application/_Interface/IStore#getKeys
     * @return {String[]}
     */
    /**
     * Преобразовать в объект
     * @function
     * @name  Application/_Interface/IStore#toObject
     * @return {[key: string]: string}
     */
    /**
     * Функциональный интерфейс IStoreMap
     * @remark
     * Описывает функцию, возвращающую хранилище по имени:
     * <pre>
     * [propName: string]: IStore;
     * </pre>
     * @interface
     * @name Application/Interface/IStore/IStoreMap
     */
    export interface IStoreMap {
        [propName: string]: IStore<any>;
    }
}
declare module '_Page/Head' {
    import {
        IHead,
        IHeadTagAttrs,
        IHeadTagEventHandlers,
        IHeadTagId,
        IInternalHead,
        JML,
    } from 'Application/_Interface/IHead';
    /**
     * API для работы с <head> страницы
     * Класс реализуется как синглтон
     * Получить инстанст синглтона можно через статичный метод getInstance()
     * @author Печеркин С.В.
     */
    export class Head implements IHead {
        private _elements;
        private _comments;
        private _noScriptUrl;
        private _id;
        /**
         * Генератор noscript тега с содержимым, если был задан _noScriptUrl
         * @private
         */
        private _generateNoScript;
        /** Генератор уникального идентификатора для каждого тега */
        private _generateGuid;
        createComment(text: string): void;
        createNoScript(url: string): void;
        createTag(
            name: 'title',
            attrs:
                | {}
                | {
                      class: string;
                  },
            content: string
        ): IHeadTagId;
        createTag(
            name: 'script',
            attrs:
                | {
                      type: string;
                  }
                | {
                      type: string;
                      src: string;
                      key: string;
                  },
            content: string
        ): IHeadTagId;
        createTag(
            name: 'script',
            attrs: {
                type: string;
                src: string;
                key: string;
            },
            content: string,
            eventHandlers: IHeadTagEventHandlers
        ): IHeadTagId;
        createTag(
            name: 'meta',
            attrs:
                | {
                      'http-equiv': string;
                      content: string;
                  }
                | {
                      content: string;
                      'http-equiv': string;
                      name: string;
                      URL: string;
                  }
                | {
                      property: string;
                      content: string;
                      class: string;
                  }
        ): IHeadTagId;
        createTag(
            name: 'link',
            attrs:
                | {
                      src: '';
                  }
                | {
                      href: string;
                      as: string;
                      rel: string;
                  }
        ): IHeadTagId;
        createTag(
            name: 'link',
            attrs: IHeadTagAttrs,
            content: null,
            eventHandlers: IHeadTagEventHandlers
        ): IHeadTagId;
        getTag(
            name?: string,
            attrs?: IHeadTagAttrs
        ): IHeadTagId | IHeadTagId[] | null;
        deleteTag(id: IHeadTagId): void;
        clear(): void;
        getData(id?: IHeadTagId): JML[] | JML;
        getComments(wrap?: boolean): string[];
        get<K extends keyof IInternalHead>(key: string): IInternalHead[K];
        set<K extends keyof IInternalHead>(
            key: string,
            value: IInternalHead[K]
        ): boolean;
        remove(): void;
        getKeys(): (keyof IInternalHead)[];
        toObject(): Record<keyof IInternalHead, any>;
        private static _creator;
        static _instance: Head;
        /**
         * Сложилась очень сложная ситуация.
         * Она разгребается в задаче https://online.sbis.ru/opendoc.html?guid=a3203b23-b620-4ebc-bc7a-0a59cfec006b
         */
        static getInstance(): Head | never;
    }
}
declare module '_Page/_head/Element' {
    import {
        IHeadTagAttrs,
        IHeadTagEventHandlers,
    } from 'Application/_Interface/IHead';
    import ElementPS from 'Application/_Page/_head/ElementPS';
    /**
     * Класс HTML элемента для вставки в head
     * Основной функционал реализован в родительском классе ElementPS.
     * В текущем, дочернем классе реализован метод для рендера элемента в DOM дереве.
     * @author Хамбелов М.И.
     */
    export default class Element extends ElementPS {
        /** Переопределенный метод для проверки тэга на идентичность.
         * в текущем переопределенном методе отдельно сравнивается title напрямую в DOM,
         * в отличии от родительского, в котором сравниваются по метаданным.
         * title проверяется только по контенту.
         */
        isEqual(
            name: string,
            attrs: IHeadTagAttrs,
            content?: string,
            eventHandlers?: IHeadTagEventHandlers
        ): boolean;
        /** Метод отрисовки элемента в head в DOM-дереве.
         * Переопределенный метод от родительского класса.
         */
        protected _render(): void;
        /** Метод удаления элемента из head в DOM-дереве.
         *  Переопределенный метод от родительского класса.
         *  Нельзя оставлять страницу с пустым title - это приводит к морганию заголовка
         */
        protected _removeElement(): void;
    }
}
declare module '_Page/_head/ElementPS' {
    import {
        IHeadTag,
        IHeadTagAttrs,
        IHeadTagEventHandlers,
        JML,
    } from 'Application/_Interface/IHead';
    export default class ElementPS {
        protected _name: string;
        protected _attrs: IHeadTagAttrs;
        protected _content: string;
        protected _eventHandlers: IHeadTagEventHandlers;
        protected _element: HTMLElement;
        constructor(
            name: string,
            attrs: IHeadTagAttrs,
            content?: string,
            eventHandlers?: IHeadTagEventHandlers
        );
        /** Возвращаем элемент в формате JML, предварительно сгенерировав его */
        getData(): JML;
        /** удаляет информацию из свойств класса */
        clear(): void;
        /** удаляет элемент из DOM дерева. Нет реализации в ElementPS */
        protected _removeElement(): void;
        /** Определяем одинаковый ли элемент или нет. Сравниваем по свойствам класса */
        isEqual(
            name: string,
            attrs: IHeadTagAttrs,
            content?: string,
            eventHandlers?: IHeadTagEventHandlers
        ): boolean;
        /** Определяет подходит ли элемент под описание: сходится ли тег и атрибуты */
        isFit(name?: string, attrs?: IHeadTagAttrs): boolean;
        _isTitle(): boolean;
        /** Отрисовка элемента в head. */
        protected _render(): void;
        /** генерируется тэг в формате JML */
        static generateTag(data: IHeadTag): JML;
    }
}

declare module 'Application/_Request/FakeWebStorage' {
    /**
     * Эмуляция любого Storage браузера
     */
    export class FakeWebStorage implements Storage {
        private __data;
        get length(): number;
        getItem(key: string): any;
        setItem(key: string, value: string): boolean;
        removeItem(key: string): void;
        getKeys(): string[];
        key(index: number): string;
        clear(): void;
    }
}

declare module 'Application/_Request/Request' {
    import { Config } from 'Application/Config';
    import { IConsole } from 'Application/_Interface/IConsole';
    import { ICookie } from 'Application/_Interface/ICookie';
    import { ILocation } from 'Application/_Interface/ILocation';
    import { IRequestInternal } from 'Application/_Interface/IRequest';
    import { IStateReceiver } from 'Application/_Interface/IStateReceiver';
    import { IStore } from 'Application/_Interface/IStore';
    interface ICookieLocation {
        cookie: ICookie;
        location: ILocation;
    }
    /**
     * Класс Request
     * @class Application/_Request/Request
     * @implements Application/_Interface/IRequest
     * @public
     * @author Санников К.А.
     * @see Application/_Interface/IRequest
     * @see Application/_Interface/IStore
     * @see Application/_Interface/ILocation
     * @see Application/_Interface/IConsole
     * @see Application/_Interface/ISerializableState
     * @see Application/_Interface/IStateReceiver
     * @todo добавить пример
     */
    export default class Request implements IRequestInternal {
        private readonly __config;
        /**
         * @cfg {Application/_Interface/ICookie} cookie
         * @name Application/_Request/Request#cookie
         */
        /**
         * @cfg {Application/_Interface/ILocation} location
         * @name Application/_Request/Request#location
         */
        /**
         * @cfg {Application/_Interface/IStateReceiver} __stateReceiver
         * @name Application/_Request/Request#__stateReceiver
         * @private
         */
        cookie: ICookie;
        location: ILocation;
        private __stateReceiver;
        private readonly __storages;
        constructor(env: ICookieLocation, config: Config);
        /**
         * Получить хранилище
         * @param {string} key Ключ хранилища
         * @param {()=> IStore| undefined} createDefaultStore функция, возвращающая Store.
         * Вызывается для создания нового Store, если нет хранилища для переданного ключа
         */
        getStore<T>(
            key: string,
            createDefaultStore?: () => IStore<T>
        ): IStore<T>;
        /**
         * Задать хранилище
         */
        setStore<T>(key: string, storage: IStore<T>): void;
        /**
         * Задать stateReceiver
         */
        setStateReceiver(stateReceiver: IStateReceiver): void;
        /**
         * Получить stateReceiver
         */
        getStateReceiver(): any;
        /**
         * Получить Config
         */
        getConfig(): Config;
    }
}

declare module 'Application/_Request/Store' {
    import { IStore } from 'Application/_Interface/IStore';
    /**
     * Класс, реализующий интерфейс {@link Application/_Interface/IStore},
     * предназначенный для работы с localStorage и SessionStorage
     * @class Application/_Request/Store
     * @implements Application/_Interface/IStore
     * @public
     * @author Санников К.А.
     */
    export default class Store implements IStore {
        private __storage;
        constructor(storageType: Storage);
        get(key: string): string;
        set(key: string, data: string): boolean;
        remove(key: string): void;
        getKeys(): string[];
        toObject(): {};
    }
}

declare module 'Application/_State/StateReceiver' {
    import { IStateReceiver } from 'Application/Interface';
    import { IConsole } from 'Application/_Interface/IConsole';
    /**
     * @author Санников К.
     */
    interface ISerializedType {
        serialized: string;
        additionalDeps: {
            [depPath: string]: boolean;
        };
    }
    /** класс заглушка в случае,
     * если не был передан конструктор UI/_state/Serializer,
     * при создании текущего класса StateReceiver.
     */
    class Serializer {
        _linksStorage: {};
        _depsStorage: {};
        deserialize: any;
        serializeStrict: any;
        static componentOptsReArray: any[];
        static parseDeclaration(module: any): {
            name: string;
        };
    }
    export class StateReceiver implements IStateReceiver {
        private _constructorSerializer;
        private receivedStateObjectsArray;
        private deserialized;
        private __serializer;
        private _logger;
        private _getLogger;
        private __getSerializer;
        constructor(_constructorSerializer?: typeof Serializer);
        setLogger(Logger: IConsole): void;
        serialize(): ISerializedType;
        deserialize(str: string | undefined): void;
        register(key: string, inst: any): void;
        unregister(key: string): void;
    }
}
