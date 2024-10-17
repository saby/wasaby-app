/* eslint-disable max-classes-per-file */
declare module 'Config' {
    /**
     * Библиотека Config
     * @library Application/Config
     * @public
     * @author Санников К.А.
     */
    export { default as Config } from 'Application/_Config/Config';
    export { IConfig } from 'Application/_Config/IConfig';
}
declare module 'Env' {
    export { default as EnvBrowser } from 'Application/_Env/Browser/Env';
    export { default as EnvNodeJS } from 'Application/_Env/NodeJS/Env';
    export {
        LogLevel as LogLevelNodeJS,
        default as ConsoleNodeJS,
    } from 'Application/_Env/NodeJS/Console';
    export { query, hash } from 'Application/_Env/_query/Query';
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
     * Реализация {@link Application/Env/ICookie} — интерфейса по работе с cookie.
     * @class Application/Env/cookie
     * @implements Application/Env/ICookie
     * @see Application/Env/ICookie
     * @author Санников К.А.
     * @public
     */
    export const cookie: ICookie;
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
    export const logger: IConsole;
    /**
     * Метод, возвращающий текущее хранилище.
     * @param {String} type type
     * @return {Application/_Request/IStore}
     * @see Application/_Request/IStore
     */
    export function getStore<T = Record<string, string>>(
        type: string,
        createDefaultStore?: () => IStore<T>
    ): IStore<T>;
    /**
     * Метод, задающий текущее хранилище.
     * @param {String} type type
     * @param {Application/_Request/IStore} store store
     */
    export function setStore<T = Record<string, string>>(type: string, store: IStore<T>): void;
    /**
     * Получить текущий конфиг приложения
     * @param key
     */
    export function getConfig(key: string): any;
    /**
     * Добавить значение в Config текущего запроса Request
     * @param key
     * @param value
     * @private
     */
    export function setConfig(key: string, value: any): any;
}
declare module 'Initializer' {
    import type { IEnv } from 'Application/Env';
    import type { ISerializableState, IStateReceiver } from 'Application/State';
    export const startRequest: any;
    export const isInit: any;
    export default function (cfg?: Record<string, unknown>, env?: IEnv, sr?: IStateReceiver): void;
    export function registerComponent(uid: string, component: ISerializableState): void;
    /**
     * Обещание сообщить об инициализации приложения
     * @param callback Function
     * @private
     */
    export function then<T = unknown>(callback: () => T): Promise<T>;
}
declare module 'Interface' {
    /**
     * Библиотека интерфейсов
     * @deprecated
     * @library Application/Interface
     * @public
     * @author Санников К.А.
     */
    export { ILocation } from 'Application/Env';
    export { ISerializableState, IStateReceiver } from 'Application/State';
    export { IStore, IStoreMap } from 'Application/Request';
}
declare module 'Page' {
    /**
     * Библиотека управления страницей. Например, ее заголовок, список загруженных ресурсов или og описание
     *
     * @library Application/Page
     * @public
     * @author Печеркин С.В.
     */
    export { Head } from 'Application/_Page/Head';
    export { Body } from 'Application/_Page/Body';
    export { JSLinks } from 'Application/_Page/JSLinks';
    export * from 'Application/_Page/_pageTagAPI/Interface';
    export * from 'Application/_Page/_body/IBody';
    export { IPageTagAPI } from 'Application/_Page/_pageTagAPI/Interface';
    export { IBody } from 'Application/_Page/_body/IBody';
    export * as creators from 'Application/_Page/creators';
}
declare module 'Request' {
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
    export { IStore, IStoreMap } from 'Application/_Request/IStore';
    export { IRequest, IRequestInternal } from 'Application/_Request/IRequest';
    export { default as Store } from 'Application/_Request/Store';
}
declare module 'State' {
    /**
     * Библиотека для работы с сериализованным состоянием.
     * @library Application/State
     * @public
     * @includes StateReceiver Application/_State/StateReceiver
     * @includes DisposeControl Application/_State/DisposeControl
     * @includes toMixDisposable Application/_State/DisposeControl#toMixDisposable
     * @author Санников К.А.
     */
    export { StateReceiver, componentOptsReArray } from 'Application/_State/StateReceiver';
    export { default as DisposeControl, toMixDisposable } from 'Application/_State/DisposeControl';
    export {
        IResourceDisposable,
        ISerializableState,
        IStateReceiverMeta,
        IStateReceiver,
    } from 'Application/_State/Interfaces';
}
declare module '_Config/Config' {
    import type { ISerializableState } from 'Application/_State/Interfaces';
    type IData = Record<string, any>;
    /**
     * Класс Config
     * @public
     * @implements Application/_State/ISerializableState
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
declare module '_Config/IConfig' {
    type IData = Record<string, any>;
    /**
     * Интерфейс IConfig
     * @public
     * @author Санников К.А.
     */
    export interface IConfig {
        /**
         * get
         * @param {String} key
         */
        get(key: keyof IData): IData[keyof IData];
    }
}
declare module '_Env/App' {
    import type { IEnv } from 'Application/_Env/IEnv';
    import type { IHttpRequest } from 'Application/_Env/IHttpRequest';
    import type { IHttpResponse } from 'Application/_Env/IHttpResponse';
    import type { IRequest } from 'Application/_Request/IRequest';
    import type { ISerializableState, IStateReceiver } from 'Application/_State/Interfaces';
    type TConfig = Record<string, unknown>;
    export default class App {
        private env;
        constructor(cfg: TConfig, env?: IEnv, stateReceiver?: IStateReceiver);
        private static instance;
        private static singletonCrossEnv;
        static getRequest(): IRequest;
        static startRequest(
            cfg: TConfig,
            stateReceiver?: IStateReceiver,
            requestGetter?: () => IHttpRequest,
            responseGetter?: () => IHttpResponse
        ): void;
        /**
         * Метод, для регистрации одиночки, который должен восстанавливать своё состояние на клиенте.
         * @param uid {String} Уникальный идентификатор одиночки.
         * @param component {Application/_State.ISerializableState} Экземпляр одиночки.
         */
        static registerSingleton(uid: string, component: ISerializableState): void;
        /**
         * Получить инстанс текущего инициализированного окружения
         */
        static getEnv(): IEnv;
        static isInit(): boolean;
        static getInstance(): App | never;
    }
}
declare module '_Env/Console' {
    import type { IConsole } from 'Application/_Env/IConsole';
    /**
     * Содержит константы уровня логирования - {@link LogLevel}
     * @class Application/Env/Console
     * @author Санников К.А.
     * @public
     */
    /**
     * [typedef] Уровень логирования
     * @class
     * @private
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
     * @implements Application/_Env/IConsole
     * @author Санников К.А.
     * @private
     * @see {@link LogLevel}
     */
    export default class Console implements IConsole {
        private __logLevel;
        private __console;
        constructor(console: Console);
        private isShow;
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
        warn(): void;
        error(): void;
    }
}
declare module '_Env/IConsole' {
    /**
     * Интерфейс для логгера. Для того что бы избавиться от IoC('ILogger').
     * IoC вызывает у нас много непонятных проблем с цикличной зависимостью.
     * @public
     * @author Санников К.А.
     */
    export interface IConsole {
        /**
         * Задать уровень логирования
         * @param {Number} logLevel
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
declare module '_Env/IEnv' {
    import type { IConfig } from 'Application/_Config/IConfig';
    import type { IConsole } from 'Application/_Env/IConsole';
    import type { IHttpRequest } from 'Application/_Env/IHttpRequest';
    import type { IHttpResponse } from 'Application/_Env/IHttpResponse';
    import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
    import type { IRequest, IRequestInternal } from 'Application/_Request/IRequest';
    /**
     * Интерфейс IEnv
     * @interface Application/Env/IEnv
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
            requestGetter?: () => IHttpRequest,
            responseGetter?: () => IHttpResponse
        ): IRequestInternal;
    }
}
declare module '_Env/IHttpRequest' {
    import type { IRequest } from 'Application/Request';
    /**
     * Интерфейс, описывающий базовый API объекта запроса (request)
     * @interface Application/Env/IHttpRequest
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
declare module '_Env/IHttpResponse' {
    import type { ICookieOptions } from 'Application/_Env/Interfaces';
    /**
     * Интерфейс, описывающий базовый API объекта ответа (response)
     * @interface Application/Env/IHttpResponse
     * @public
     * @author Мустафин Л.И.
     */
    export interface IHttpResponse {
        clearCookie(key: string, options?: Partial<ICookieOptions>): IHttpResponse;
        cookie(key: string, value: string, options?: Partial<ICookieOptions>): IHttpResponse;
        header(name: string, value: unknown): IHttpResponse;
        set(name: string, value: unknown): IHttpResponse;
        redirect(path: string): IHttpResponse;
        send(body: string): IHttpResponse;
        status(code: number): IHttpResponse;
    }
}
declare module '_Env/Interfaces' {
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
}
declare module '_Env/Location' {
    import type { ILocation } from '_Env/Interfaces';
    /**
     * Реализация {@link Application/Env/ILocation} — обобщенного window.location.
     * @class Application/Env/location
     * @implements Application/Env/ILocation
     * @see Application/Env/ILocation
     * @author Санников К.А.
     * @public
     */
    export const location: ILocation;
}
declare module '_Env/ObjectStore' {
    import type { IStore } from 'Application/_Request/IStore';
    export default class ObjectStore implements IStore {
        private __data;
        get(key: string): any;
        set(key: string, value: string): boolean;
        remove(key: string): void;
        getKeys(): string[];
        toObject(): any;
    }
}
declare module '_Env/StateReceiver' {
    import { IStateReceiver } from 'Application/State';
    /**
     * Метод, возвращающий компонент для восстановления состояний компонентов.
     * @name Application/Env#getStateReceiver
     * @return {Application/_State/IStateReceiver}
     * @see Application/_State/IStateReceiver
     */
    export function getStateReceiver(): IStateReceiver;
    /**
     * Метод-хелпер для работы со StateReceiver в окружении без Wasaby-контрола
     * @param data                  данные, которые на СП необходимо положить в StateReceiver и получить на клиенте
     * @param stateReceiverName     уникальный идентификатор данных в StateReceiver,
     *                              он должен быть уникальным в рамках всей страницы
     */
    export function getStateReceiverData<T extends Record<string, any>>(
        data: T,
        stateReceiverName: string
    ): T;
}
declare module '_Env/Browser/Cookie' {
    import type { ICookie, ICookieOptions } from 'Application/_Env/Interfaces';
    /**
     * Класс предназначенный для работы с cookie в браузере,
     * @private
     * @name _Request/_Storage/Cookie
     * @implements Application/Env/ICookie
     * @implements Application/_Request/IStore
     * @author Санников К.А.
     */
    export default class Cookie implements ICookie {
        private cacheCookie;
        private readonly isCoookieAvailable;
        constructor(cacheCookie?: Map<string, string>);
        get(key: string): string | null;
        set(key: string, value: string, options?: Partial<ICookieOptions>): boolean;
        remove(key: string): void;
        clearCache(): void;
        getKeys(): string[];
        toObject(): Record<string, string>;
    }
}
declare module '_Env/Browser/Env' {
    import { Config } from 'Application/Config';
    import type { IConsole } from 'Application/_Env/IConsole';
    import type { IEnv } from 'Application/_Env/IEnv';
    import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
    import type { IRequest, IRequestInternal } from 'Application/_Request/IRequest';
    /**
     * Браузерное окружение
     * Класс EnvBrowser
     * @class Application/_Env/Browser/Env
     * @author Санников К.А.
     * @implements {Application/Env/IEnv}
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
         * @cfg {Application/_Env/IConsole} console
         * @name Application/_Env/Browser/Env#console
         */
        console: IConsole;
        /**
         * @cfg {Application/Env/ICookie} cookie
         * @name Application/_Env/Browser/Env#cookie
         */
        cookie: ICookie;
        /**
         * @cfg {Application/Env/ILocation} location
         * @name Application/_Env/Browser/Env#location
         */
        location: ILocation;
        private envConfig;
        constructor(data: Record<string, unknown>);
        getRequest(): IRequest;
        createRequest(requestConfig: Config): IRequestInternal;
    }
}
declare module '_Env/NodeJS/Console' {
    import type { IConsole } from 'Application/_Env/IConsole';
    /**
     * Уровень логирования.
     * https://wi.sbis.ru/docs/py/sbis/LogLevel/
     */
    export enum LogLevel {
        llDISABLED = 0,
        llMINIMAL = 1,
        llSTANDARD = 2,
        llEXTENDED = 3,
        llDEBUG = 4,
    }
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
declare module '_Env/NodeJS/Cookie' {
    import type { IHttpRequest } from 'Application/_Env/IHttpRequest';
    import type { IHttpResponse } from 'Application/_Env/IHttpResponse';
    import type { ICookie, ICookieOptions } from 'Application/_Env/Interfaces';
    /**
     * Класс, реализующий интерфейс {@link Core/Request/IStorage},
     * предназначенный для работы с cookie в браузере
     * @private
     * @implements Core/Request/IStorage
     * @author Заляев А.В.
     */
    export default class Cookie implements ICookie {
        private getRequest;
        private getResponse;
        constructor(
            getRequest: () => Partial<IHttpRequest>,
            getResponse: () => Partial<IHttpResponse>
        );
        get(key: string): string | null;
        set(key: string, value: string, options?: Partial<ICookieOptions>): boolean;
        remove(key: string): void;
        clearCache(): void;
        getKeys(): string[];
        toObject(): Record<string, string>;
        private static getExpires;
    }
}
declare module '_Env/NodeJS/Env' {
    import { Config } from 'Application/Config';
    import type { IRequest, IRequestInternal } from 'Application/Request';
    import type { IConsole } from 'Application/_Env/IConsole';
    import type { IEnv } from 'Application/_Env/IEnv';
    import type { IHttpRequest } from 'Application/_Env/IHttpRequest';
    import type { IHttpResponse } from 'Application/_Env/IHttpResponse';
    import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
    /**
     * Окружение для запуска Application под NodeJS
     * @class Application/_Env/NodeJS/Env
     * @public
     * @implements {Application/Env/IEnv}
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
        private envConfig;
        private getHttpRequest;
        constructor(data: Record<string, unknown>, console?: IConsole);
        getRequest(): IRequest;
        createRequest(
            requestConfig: Config,
            requestGetter: () => IHttpRequest,
            responseGetter: () => IHttpResponse
        ): IRequestInternal;
    }
}
declare module '_Env/NodeJS/Location' {
    import type { IHttpRequest } from 'Application/_Env/IHttpRequest';
    import type { ILocation } from 'Application/_Env/Interfaces';
    import { IHttpResponse } from '_Env/IHttpResponse';
    export default class Location implements ILocation {
        private requestGetter;
        private responseGetter;
        private hostMask;
        private searchMask;
        constructor(
            requestGetter: () => Partial<IHttpRequest>,
            responseGetter: () => Partial<IHttpResponse>
        );
        private getReqProp;
        get pathname(): string;
        get protocol(): string;
        get port(): string;
        get host(): string;
        get hostname(): string;
        get href(): string;
        set href(href: string);
        get search(): string;
        get hash(): string;
        set hash(value: string);
        replace(path: string): void;
    }
}
declare module '_Env/_query/QueryParams' {
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
    export const parseQueryHash: (query: string) => PARAMS_SET;
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
    export const parseQueryGet: (query: string) => PARAMS_SET;
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
declare module '_Env/_query/Query' {
    import { PARAMS } from '_Env/_query/QueryParams';
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
     * Объект для работы с hash строкой вида #hash1=value1&hash2=value2
     * @class Application/Env/hash
     * @author Мустафин Л.И.
     * @public
     */
    export const hash: {
        /**
         * Получить все значения hash в виде объекта или значение одного ключа
         * @name Application/Env/hash#get
         * @param key если указан ключ, то вернет значение этого ключа
         */
        get(key?: string): Record<string, string> | string;
        /**
         * Добавить/изменить значение для указанного ключа
         * @name Application/Env/hash#set
         */
        set(key: string, value: string): void;
        /**
         * Удалить значение по указанному ключу или несколько значений по списку ключей
         * @name Application/Env/hash#remove
         * @param keys если ключ строка, то удалит одно значение
         *             если ключ массив строк, то удалит все указанные значения
         */
        remove(keys: string | string[]): void;
    };
}
declare module '_Page/Body' {
    import type { IBody, IInternalBody } from 'Application/_Page/_body/IBody';
    /**
     * API для работы с <body> страницы
     * Класс реализуется как синглтон
     * Получить инстанст синглтона можно через статичный метод getInstance()
     * @public
     * @implements Application/_Page/_body/IBody
     * @author Печеркин С.В.
     */
    export class Body implements IBody {
        private _element;
        addClass(...tokens: string[]): void;
        replaceClasses(removeList: string[], addList: string[]): void;
        removeClass(...tokens: string[]): void;
        toggleClass(token: string, force?: boolean): boolean;
        containsClass(token: string): boolean;
        getClassString(): string;
        setDir(value: string): void;
        getDir(): string;
        get<K extends keyof IInternalBody>(key: K): IInternalBody[K];
        set<K extends keyof IInternalBody>(key: K, value: IInternalBody[K]): boolean;
        remove(): void;
        getKeys(): (keyof IInternalBody)[];
        toObject(): Record<keyof IInternalBody, any>;
        private static _creator;
        static _instance: Body;
        /**
         * Сложилась очень сложная ситуация.
         * Она разгребается в задаче https://online.sbis.ru/opendoc.html?guid=a3203b23-b620-4ebc-bc7a-0a59cfec006b
         */
        static getInstance(): Body | never;
    }
}
declare module '_Page/_pageTagAPI/Interface' {
    import { IStore } from 'Application/_Request/IStore';
    export const SERVER_ID_FIELD = 'sid';
    /**
     * Интерфейс объекта, описывающего аттрибуты тега для API Head
     * @interface Application/_Page/_head/IPageTagAttrs
     * @public
     * @author Печеркин С.В.
     */
    export interface IPageTagAttrs {
        charset?: string;
        class?: string;
        content?: string;
        'css-theme'?: string;
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
        disabled?: string;
        title?: string;
        media?: string;
        onerror?: string;
        onload?: string;
        [SERVER_ID_FIELD]?: IPageTagId;
        sizes?: string;
        as?: string;
        important?: string;
        crossorigin?: string;
    }
    /** Аттрибуты тега meta */
    export type TMetaAttrs = Pick<
        IPageTagAttrs,
        'name' | 'URL' | 'content' | 'charset' | 'class' | 'property' | 'http-equiv'
    >;
    /** Аттрибуты HttpEquiv - являются аттрибутами мета, кроме name, который не должен оказаться в HttpEquiv */
    export type THttpEquivAttrs = Omit<TMetaAttrs, 'name'>;
    /** Аттрибуты тега script */
    export type TScriptAttrs = Pick<IPageTagAttrs, 'src' | 'type' | 'key' | 'defer'>;
    /** Аттрибуты favicon */
    export type TFaviconAttrs = Pick<IPageTagAttrs, 'href' | 'rel' | 'type' | 'sizes'>;
    /** Аттрибуты шрифтов */
    export type TFontAttrs = Pick<IPageTagAttrs, 'href' | 'rel' | 'type' | 'as'>;
    /**
     * Интерфейс объекта, описывающего обработчики событий тега для API Head
     * @interface Application/_Page/_head/IPageTagEventHandlers
     * @public
     * @author Печеркин С.В.
     */
    export interface IPageTagEventHandlers {
        load?: Function;
        error?: Function;
    }
    /**
     * Интерфейс одного тега для API Head
     * @interface Application/_Page/_head/IPageTag
     * @property {string} name - имя тега (title, meta, script)
     * @property {IPageTagAttrs} attrs - дополнительные аттрибуты для тега
     * @property {string} content - содержимое тега. Актульано, например, для тега script
     * @public
     * @author Печеркин С.В.
     */
    export interface IPageTag {
        name: string;
        attrs: IPageTagAttrs;
        content?: string;
        eventHandlers?: IPageTagEventHandlers;
    }
    /** Технический интерфейс для разрешения циклических определений в типе JML * @private
     */
    interface JsonML extends JML {}
    /**
     * Интерфейс для аргумента tagPrior в функции "проверки идентичности аттрибутов" (isEqualAttributes) в head/ElementPS
     * @interface Application/_Page/_head/ITagPrior
     * @public
     */
    export interface ITagPrior {
        name: string;
        attrsPrior: string[];
    }
    /**
     * Структура, которая однозначно описывает 1 тег первого уровня внутри head страницы
     * @interface Application/_Page/_head/IPageTagId
     * @public
     */
    export type IPageTagId = string;
    /**
     * Тип для описания верстки, прнятый как стандарт в СБИС
     * https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
     */
    export type JML = [string, (object | JsonML | string)?, (JsonML | string)?];
    /**
     * @private
     * @property {Function} getData - возвращаем элемент в формате JML, предварительно сгенерировав его
     * @property {Function} getUniqueKey - возвращаем вид уникальности. Если не вернул ничего - не уникален.
     * @property {Function} toPageTag - преобразует текущий Element к формату IPageTag
     * @property {Function} clear - удаляет информацию из свойств класса
     * @property {Function} isEqual - определяем одинаковый ли элемент или нет. Сравниваем по свойствам класса
     * @property {Function} isFit - определяет подходит ли элемент под описание: сходится ли тег и атрибуты
     * @property {Function} isImportant - определяет является ли тег приоритетным и нужно ли его указывать как можно раньше
     * @property {Function} getAttrs - возвращаем аттрибуты элемента
     * @property {Function} setAttrs - устанавливаем атрибуты элемента
     * @property {Function} changeTag - меняет атрибуты элемента
     */
    export interface IPageTagElement {
        getData(): JML;
        getUniqueKey(): boolean | string;
        toPageTag(): IPageTag;
        clear(): void;
        isEqual(
            name: string,
            attrs: IPageTagAttrs,
            content?: string,
            eventHandlers?: IPageTagEventHandlers
        ): boolean;
        isFit(name?: string, attrs?: IPageTagAttrs): boolean;
        isImportant(): boolean;
        getAttrs(): IPageTagAttrs;
        setAttrs(attrs: IPageTagAttrs): void;
        changeTag(attrsChange: IPageTagAttrs): void;
    }
    /**
     * @private
     * В объектах, имплементирующих этот интерфейс будет описано то, что отделяет Head API от JSLinks API, например
     * Функционально пересекается с интерфейсом IPageTagAPI. Различающиеся методы описаны отдельно.
     * @see Interface
     */
    export interface IPageTagAPIAspect {
        createComment(text: string): void;
        createNoScript(URL: string): void;
        createTag(
            name: string,
            attrs: IPageTagAttrs,
            content: string,
            eventHandlers: IPageTagEventHandlers,
            elements: {
                [propName: string]: IPageTagElement;
            }
        ): IPageTagElement | void;
        createMergeTag(name: string, attrs: IPageTagAttrs, content: string): void;
        getComments(wrap?: boolean): string[];
        getData(elements: { [propName: string]: IPageTagElement }): JML[];
        clear(): void;
        /**
         * Генератор уникального идентификатора для каждого тега
         */
        generateGuid(): IPageTagId;
    }
    /**
     * Внутренний интерфейс IPageTagAPI, содержит весь основной функционал
     * @see https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
     * @private
     * @author Печеркин С.В.
     */
    export interface IPageTagAPIInternal {
        /**
         * добавит строку с комментарием внутрь тега <head>
         */
        createComment(text: string): void;
        /**
         * добавит конструкцию noscript с указанным URL
         */
        createNoScript(URL: string): void;
        /**
         * добавит тег внутрь <head>. Если такой тег уже есть - перерисует его
         */
        createTag(
            name: string,
            attrs: IPageTagAttrs,
            content?: string,
            eventHandlers?: IPageTagEventHandlers
        ): IPageTagId;
        /**
         * удалит тег из <head>, если он есть
         */
        deleteTag(id: IPageTagId): void;
        /**
         * Добавит в спец. очередь данные о теге script.
         * При вставке такого тега в <head>, объединит все данные из очереди в один общий тег.
         * Актуально только на СП.
         */
        createMergeTag(name: string, attrs: IPageTagAttrs, content: string): void;
        /**
         * вернет текущее состояние тегов с учетом их добавления/удаления в формате JsonML
         */
        getData(id?: IPageTagId): JML[] | JML;
        /**
         * вернет все зарегистрированные комментарии в виде строк без <!-- --> (wrap)
         */
        getComments(wrap?: boolean): string[];
        /**
         * очистит внутреннее состояние. Имеет смысл вызывать только на ПП
         */
        clear(): void;
        /**
         * вернет аттрибуты тега
         */
        getAttrs(tagId: IPageTagId): IPageTagAttrs | null;
        /**
         * сменит параметры тега
         */
        changeTag(tagId: IPageTagId, attrs: IPageTagAttrs): void;
    }
    export type KeyInternalPageTagAPI = keyof IPageTagAPIInternal;
    /**
     * @interface Application/_Page/_pageTagAPI/Interface
     * @see https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
     * @public
     * @remark
     * Данный интерфейс является наследником от внутреннего интерфейса.
     * Необходимость во внутреннем интерфейсе обусловенно тем, что
     * IPageTagAPI наследуется от IStore, в Generic которого пробрасывается IPageTagAPIInternal.
     * Typescript не позволяет наследоваться от интерфейса с дженериком собственной сущности.
     * @author Печеркин С.В.
     */
    export interface IPageTagAPI extends IStore<IPageTagAPIInternal>, IPageTagAPIInternal {}
}
declare module '_Page/Head' {
    import { PageTagAPI } from 'Application/_Page/PageTagAPI';
    import { HeadAspect } from 'Application/_Page/_head/Aspect';
    /**
     * API для работы с <head> страницы
     * Класс реализуется как синглтон
     * Получить инстанст синглтона можно через статичный метод getInstance()
     * @public
     * @implements Application/_Page/_pageTagAPI/IPageTagAPI
     * @author Печеркин С.В.
     */
    export class Head extends PageTagAPI {
        protected _aspect: HeadAspect;
        constructor();
        /**
         * Важно собрать на клиенте всю информацию о тегах внутри head при инициализации Head API
         * @private
         */
        private _collectTags;
        static _instance: Head;
        protected static _creator(): Head;
        /**
         * Сложилась очень сложная ситуация.
         * Она разгребается в задаче https://online.sbis.ru/opendoc.html?guid=a3203b23-b620-4ebc-bc7a-0a59cfec006b
         */
        static getInstance(): Head | never;
    }
}
declare module '_Page/JSLinks' {
    import { PageTagAPI } from 'Application/_Page/PageTagAPI';
    /**
     * API для работы jsLinks
     * Класс реализуется как синглтон
     * Получить инстанст синглтона можно через статичный метод getInstance()
     * @public
     * @implements Application/_Page/_pageTagAPI/IPageTagAPI
     * @author Печеркин С.В.
     */
    export class JSLinks extends PageTagAPI {
        protected _aspect: any;
        static _instance: JSLinks;
        static _creator(): JSLinks;
        static getInstance(nameSpace?: string): JSLinks | never;
    }
}
declare module '_Page/PageTagAPI' {
    import {
        IPageTagAPI,
        IPageTagAPIAspect,
        IPageTagAPIInternal,
        IPageTagAttrs,
        IPageTagElement,
        IPageTagEventHandlers,
        IPageTagId,
        JML,
        KeyInternalPageTagAPI,
    } from 'Application/_Page/_pageTagAPI/Interface';
    /**
     * API для работы с тегами страницы
     * Класс реализуется как синглтон
     * Получить инстанст синглтона можно через статичный метод getInstance()
     * @public
     * @implements Application/_Page/_pageTagAPI/IPageTagAPI
     * @author Печеркин С.В.
     */
    export class PageTagAPI implements IPageTagAPI {
        protected _elements: {
            [propName: string]: IPageTagElement;
        };
        protected _aspect: IPageTagAPIAspect;
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
        ): IPageTagId;
        createTag(
            name: 'script',
            attrs:
                | {}
                | {
                      src: string;
                  }
                | {
                      type: string;
                  }
                | {
                      type: string;
                      src: string;
                      key: string;
                  }
                | {
                      type: string;
                      src: string;
                      key: string;
                      defer: 'defer';
                  }
                | {
                      type: string;
                      src: string;
                      key: string;
                      defer: 'defer';
                      onerror: string;
                  }
        ): IPageTagId;
        createTag(
            name: 'script',
            attrs:
                | {}
                | {
                      src: string;
                  }
                | {
                      type: string;
                  }
                | {
                      type: string;
                      src: string;
                      key: string;
                  }
                | {
                      type: string;
                      src: string;
                      key: string;
                      defer: 'defer';
                  },
            content: string,
            eventHandlers?: IPageTagEventHandlers
        ): IPageTagId;
        createTag(
            name: 'meta',
            attrs:
                | {}
                | {
                      'http-equiv': string;
                      content: string;
                  }
                | {
                      content: string;
                      name: string;
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
        ): IPageTagId;
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
                | {
                      href: string;
                      type: string;
                      rel: string;
                  }
                | {
                      href: string;
                      as: string;
                      rel: string;
                      sizes: string;
                  }
                | {
                      href: string;
                      type: string;
                      rel: string;
                      sizes: string;
                  }
        ): IPageTagId;
        createTag(
            name: 'link',
            attrs: IPageTagAttrs,
            content: null,
            eventHandlers: IPageTagEventHandlers
        ): IPageTagId;
        createTag(
            name: 'style',
            attrs:
                | {}
                | ({
                      scoped: 'scoped';
                  } & IPageTagAttrs)
                | IPageTagAttrs,
            content: string,
            eventHandlers?: IPageTagEventHandlers
        ): IPageTagId;
        /**
         * Добавит в спец. очередь данные о теге script.
         * При вставке такого тега в <head>, объединит все данные из очереди в один общий тег.
         * Актуально только на СП.
         * @hidden
         */
        createMergeTag(name: 'script', attrs: IPageTagAttrs, content: string): void;
        getAttrs(tagId: IPageTagId): IPageTagAttrs | null;
        changeTag(tagId: IPageTagId, attrs: IPageTagAttrs): void;
        deleteTag(id: IPageTagId): void;
        clear(): void;
        getData(id: IPageTagId): JML;
        getData(): JML[];
        getComments(wrap?: boolean): string[];
        get<K extends keyof IPageTagAPIInternal>(key: K): IPageTagAPIInternal[K];
        set<K extends keyof IPageTagAPIInternal>(key: K, value: IPageTagAPIInternal[K]): boolean;
        remove(): void;
        getKeys(): KeyInternalPageTagAPI[];
        toObject(): Record<keyof IPageTagAPIInternal, any>;
    }
}
declare module '_Page/creators' {
    import type {
        IPageTagId,
        TFaviconAttrs,
        THttpEquivAttrs,
        TScriptAttrs,
    } from 'Application/_Page/_pageTagAPI/Interface';
    /**
     * Обёртки над Head API, которые облегчают работу с Head API.
     * Как правило, в функции-обёртке,
     * вначале пробрасываются важные атрибуты в виде строки в отдельных аргументах.
     * Другие специфические аттрибуты пробрасываются опционально в аргументе attrs единым объектом.
     * @author Хамбелов М.И.
     */
    /**
     * Создание title
     * @param title
     */
    export function createTitle(title: string): IPageTagId;
    /**
     * Создание микроразметки
     * @param microdata данные в виде строки, что содержатся внутри тега
     */
    export function createMicroData(microdata: string): IPageTagId;
    /**
     * Создание мета-тега viewport
     * @param content аттрибут тега viewport
     */
    export function createViewPort(content: string): IPageTagId;
    /**
     * Создание стилей
     * @param href путь в виде строки
     */
    export function createCSS(href: string): IPageTagId;
    /**
     * Создание шрифтов
     * @param href путь в виде строки
     * @remark
     * Аттрибут type определится автоматически из аргумента href.
     * Для этого в href должен содержаться в конце строки формат.
     */
    export function createFont(href: string): IPageTagId;
    /**
     * Создание тега script
     * @param src путь в виде строки
     * @param attrs{TScriptAttrs} дополнительные аттрибуты в виде объекта
     */
    export function createScript(src: string, attrs?: TScriptAttrs): IPageTagId;
    /**
     * Создание favicon
     * @param href путь в виде строки
     * @param attrs{TFaviconAttrs} дополнительные аттрибуты в виде объекта
     */
    export function createFavicon(href: string, attrs?: TFaviconAttrs): IPageTagId;
    /**
     * Создание мета-тега httpEquiv
     * @param httpEquiv
     * @param content
     * @param attrs{THttpEquivAttrs} дополнительные аттрибуты в виде объекта
     * @remark
     * Браузеры преобразовывают значение атрибута http-equiv, заданное с помощью content,
     * в формат заголовка ответа HTTP и обрабатывают их, как будто они прибыли непосредственно от сервера.
     * Мета-тег не может содержать аттрибуты http-equiv и name одновременно.
     */
    export function createHttpEquiv(
        httpEquiv: string,
        content: string,
        attrs?: THttpEquivAttrs
    ): IPageTagId;
}
declare module '_Page/_body/Element' {
    import { default as ElementPS } from 'Application/_Page/_body/ElementPS';
    /**
     * Класс, которые непосредственно управляет тегом <body> на клинете
     * @author Печеркин С.В.
     * @private
     */
    export default class Element extends ElementPS {
        /**
         * Аналог метода contains для DOMTokenList у <body>
         * Фактически, он его и вызывает, потому что на сервере у нас нет body, а на клиенте незачем что-то выдумывать
         * @see DOMTokenList
         * @param token
         */
        containsClass(token: string): boolean;
        /**
         * Аналог метода toString для DOMTokenList у <body>
         * Фактически, он его и вызывает, потому что на сервере у нас нет body, а на клиенте незачем что-то выдумывать
         * @see DOMTokenList
         */
        getClasses(): string;
        /**
         * Аналог метода toggle для DOMTokenList у <body>
         * Фактически, он его и вызывает, потому что на сервере у нас нет body, а на клиенте незачем что-то выдумывать
         * @see DOMTokenList
         * @param token
         * @param force
         */
        toggleClass(token: string, force?: boolean): boolean;
        /**
         * Аналог метода replace для DOMTokenList у <body>
         * Можно бы было использовать нативные метод, но он работает только с одним удаляемым и добавляемым классом
         * @see DOMTokenList
         * @param initialRemoveList
         * @param initialAddList
         */
        updateClasses(initialRemoveList: string[], initialAddList: string[]): void;
        /**
         * установка аттрибута dir на document.body
         */
        setDir(value: string): void;
        /**
         * получение выставленного значения аттрибута dir из document.body
         */
        getDir(): string;
        /** Костылямбрий, который будет жить, пока не закончится переход на построение от шаблона #bootsrap */
        private _notifyEventCrunch;
    }
}
declare module '_Page/_body/ElementPS' {
    /**
     * Класс, которые непосредственно управляет тегом <body> на сервере
     * @author Печеркин С.В.
     * @private
     */
    export default class ElementPS {
        protected readonly _attrs: {
            class: string;
            dir: string;
        };
        /**
         * Аналог метода contains для DOMTokenList у <body>
         * @see DOMTokenList
         * @param token
         */
        containsClass(token: string): boolean;
        /**
         * Аналог метода toString для DOMTokenList у <body>
         * @see DOMTokenList
         */
        getClasses(): string;
        /**
         * Аналог метода toggle для DOMTokenList у <body>
         * @see DOMTokenList
         * @param token
         * @param force
         */
        toggleClass(token: string, force?: boolean): boolean;
        /**
         * Аналог метода replace для DOMTokenList у <body>
         * @see DOMTokenList
         * @param initialRemoveList
         * @param initialAddList
         */
        updateClasses(initialRemoveList: string[], initialAddList: string[]): void;
        /**
         * установка аттрибута dir на document.body на СП
         */
        setDir(value: string): void;
        /**
         * получение выставленного значения аттрибута dir из document.body
         */
        getDir(): string;
        /**
         * Токены классов нужно достаточно сильно фильтровать, иначе упадут нативные методы браузеров
         * Нельзя пропускать дальше пустые строки и строки с пробелами
         * @param tokens
         * @protected
         */
        protected static prepareTokens(tokens: string[]): string[];
        protected static escapeHtml(unsafe: string): string;
    }
}
declare module '_Page/_body/IBody' {
    import type { IStore } from 'Application/_Request/IStore';
    /**
     * Внутренний интерфейс IInternalBody, содержит весь основной функционал
     * @private
     */
    export interface IInternalBody {
        /**
         * аналогичен методу add для свойства classList на элементе <body>
         */
        addClass(...tokens: string[]): void;
        /**
         * аналогичен методу remove для свойства classList на элементе <body>
         */
        removeClass(...tokens: string[]): void;
        /**
         * заменит классы на <body> из массива removeList на классы из массива addList
         */
        replaceClasses(removeList: string[], addList: string[]): void;
        /**
         * аналогичен методу toggle для свойства classList на элементе <body>
         */
        toggleClass(token: string, force?: boolean): boolean;
        /**
         * аналогичен методу contains для свойства classList на элементе <body>
         */
        containsClass(token: string): boolean;
        /**
         * аналогичен методу toString для свойства classList на элементе <body>
         */
        getClassString(): string;
        /**
         * изоморфная установка аттрибута dir на document.body
         */
        setDir(value: string): void;
        /**
         * получение выставленного значения аттрибута dir из document.body
         */
        getDir(): string;
    }
    export type KeyInternalBody = keyof IInternalBody;
    /**
     * API для работы с <body> страницы
     * @public
     * @author Печеркин С.В.
     * @see https://developer.mozilla.org/ru/docs/Web/API/Element/classList
     */
    export interface IBody extends IStore<IInternalBody>, IInternalBody {}
}
declare module '_Page/_head/Aspect' {
    import {
        IPageTagAPIAspect,
        IPageTagAttrs,
        IPageTagElement,
        IPageTagEventHandlers,
        IPageTagId,
        JML,
    } from 'Application/_Page/_pageTagAPI/Interface';
    /**
     * Интерфейс единицы данных спец. очереди тегов script, которые будут объединены в один тег script.
     * @private
     */
    interface IMergeScript {
        name: 'script';
        attrs: IPageTagAttrs;
        content: string;
    }
    /**
     * Аспект для работы с <head> страницы.
     * @author Печеркин С.В.
     * @private
     */
    export class HeadAspect implements IPageTagAPIAspect {
        private _comments;
        private _noScriptUrl?;
        protected _id: number;
        protected _mergeScripts: IMergeScript[];
        createComment(text: string): void;
        createNoScript(url: string): void;
        createTag(
            name: string,
            attrs: IPageTagAttrs,
            content: string,
            eventHandlers: IPageTagEventHandlers | undefined,
            elements: {
                [propName: string]: IPageTagElement;
            }
        ): IPageTagElement;
        createMergeTag(name: 'script', attrs: IPageTagAttrs, content: string): void;
        getComments(wrap?: boolean): string[];
        getData(elements: { [propName: string]: IPageTagElement }): JML[];
        /**
         * Объединит все теги script из спец. очереди в один тег script, создаст один итоговый тег script
         * и добавит его в списко тегов для вставки в <head>
         */
        private _addMergedScript;
        clear(): void;
        /** Генератор уникального идентификатора для каждого тега */
        generateGuid(): IPageTagId;
        /**
         * Генератор noscript тега с содержимым, если был задан _noScriptUrl
         * @private
         */
        private _generateNoScript;
        private static _getHttpEquivId;
        /**
         * Перед добавлением нового элемента в набор необходимо обеспечить его уникальность в полном наборе
         * Сейчас уникальными должны быть следующие теги:
         * title (проверяется методом isTitle)
         * meta с параметрами для viewport (проверяется методом isViewPort)
         * @param element вновь созданный, но еще не добавленный элемент
         * @param elements весь набор элементов
         * @private
         */
        private static _ensureUniq;
    }
}
declare module '_Page/_head/Element' {
    import BaseElement, { IPageTagElementAspect } from 'Application/_Page/_pageTagAPI/BaseElement';
    import type {
        IPageTagAttrs,
        IPageTagEventHandlers,
    } from 'Application/_Page/_pageTagAPI/Interface';
    export interface IElementRestoredData {
        name: string;
        attrs: IPageTagAttrs | null;
        content: string;
        element?: HTMLElement;
    }
    /**
     * Класс HTML элемента для вставки в head
     * Основной функционал реализован в родительском классе ElementPS.
     * В текущем, дочернем классе реализован метод для рендера элемента в DOM дереве.
     * @author Печеркин С.В.
     * @private
     */
    export default class Element extends BaseElement {
        constructor(
            name: string,
            attrs: IPageTagAttrs,
            content?: string,
            eventHandlers?: IPageTagEventHandlers,
            aspect?: IPageTagElementAspect,
            hydrateElement?: HTMLElement
        );
        changeTag(attrsChange: IPageTagAttrs): void;
        isImportant(): boolean;
        /** Метод отрисовки элемента в head в DOM-дереве.
         * Переопределенный метод от родительского класса.
         */
        protected _render(): void;
        /**
         * Применение атрибутов на DOM элемент
         * @param element
         * @protected
         */
        protected _applyAttrs(element: HTMLElement): void;
        protected _startEvents(): void;
        protected _removeElement(): void;
        /**
         * Есть 2 путя создать инстанс класса Element:
         * Из мета информации или из реального DOM элемента.
         * Еси из реального элемента, надо восстановить мета информацию.
         * Когда это используется? При оживлении страницы, чтобы Head API собрал информацию, вставленную на серваке.
         * @private
         */
        protected static _restoreElement(element?: HTMLElement): IElementRestoredData;
        /**
         * Вернет все атрибуты у тега
         * @param element
         */
        static getElementAttrs(element?: HTMLElement): IPageTagAttrs;
    }
}
declare module '_Page/_head/ElementPS' {
    import BaseElement from 'Application/_Page/_pageTagAPI/BaseElement';
    import type { IPageTagAttrs } from 'Application/_Page/_pageTagAPI/Interface';
    /**
     * Класс HTML элемента для вставки в head.
     * На сервисе представления(СП) необходим в качестве хранения данных.
     * Будет рендериться только на клиенте, используя дочерний класс Element
     * @author Печеркин С.В.
     * @private
     */
    export default class ElementPS extends BaseElement {
        changeTag(attrsChange: IPageTagAttrs): void;
        isImportant(): boolean;
        protected _render(): void;
        protected _removeElement(): void;
    }
}
declare module '_Page/_head/Factory' {
    import type {
        IPageTagAttrs,
        IPageTagElement,
        IPageTagEventHandlers,
    } from 'Application/_Page/_pageTagAPI/Interface';
    export function create(
        name: string,
        attrs: IPageTagAttrs,
        content?: string,
        eventHandlers?: IPageTagEventHandlers,
        hydratedElement?: HTMLElement
    ): IPageTagElement;
}
declare module '_Page/_head/Favicon' {
    import { IPageTagElementAspect } from 'Application/_Page/_pageTagAPI/BaseElement';
    import type { IPageTag, JML } from 'Application/_Page/_pageTagAPI/Interface';
    /**
     * Аспект для уникального элемента типа Favicon
     * @author Печеркин С.В.
     * @remark
     * 1) Уникальность favicon:
     * На странице может быть только один уникальный favicon, уникальность определяется аттрибутом sizes.
     * т.е. на странице может быть несколько фавиконок, но каждая с уникальным значением sizes.
     * Фавиконка с отстутствующим sizes считается как отдельная уникальная фавиконка.
     * 2) Удаление, изменение favicon:
     * В случае разных иконок (разные значения href), но одинаковым размером (sizes),
     * в таком случае иконка со старым href не удаляется, а ее аттрибуты перезаписываются на новые.
     * Эти действия совершаются в другом месте (на момент написания коммента - в Application/_Page/_head/Element _render)
     * @private
     */
    export default class FaviconAspect implements IPageTagElementAspect {
        private readonly _sizes;
        constructor(_sizes?: string);
        private _existingDOMElement; /** ссылка на DOM-элемент */
        getUniqueKey(): boolean | string;
        isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean;
        getData({ name, attrs, content, eventHandlers }: IPageTag): JML;
        getDOMElement({ name }: IPageTag): HTMLElement;
        appendDomElement(element: HTMLElement): void;
        removeDOMElement(element: HTMLElement): void;
    }
}
declare module '_Page/_head/Title' {
    import { IPageTagElementAspect } from 'Application/_Page/_pageTagAPI/BaseElement';
    import type { IPageTag, JML } from 'Application/_Page/_pageTagAPI/Interface';
    /**
     * Аспект для уникального элемента типа title
     * @author Печеркин С.В.
     * @private
     */
    export default class TitleAspect implements IPageTagElementAspect {
        getUniqueKey(): boolean | string;
        isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean;
        getDOMElement({ name, content }: IPageTag): HTMLElement;
        appendDomElement(element: HTMLElement): void;
        removeDOMElement(element: HTMLElement): void;
        getData({ name, attrs, content, eventHandlers }: IPageTag): JML;
    }
}
declare module '_Page/_head/ViewPort' {
    import { IPageTagElementAspect } from 'Application/_Page/_pageTagAPI/BaseElement';
    import type { IPageTag, JML } from 'Application/_Page/_pageTagAPI/Interface';
    /**
     * Аспект для уникального элемента типа meta с параметрами для viewport
     * @author Печеркин С.В.
     * @private
     */
    export default class ViewPortAspect implements IPageTagElementAspect {
        getUniqueKey(): boolean | string;
        isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean;
        getData({ name, attrs, content, eventHandlers }: IPageTag): JML;
        getDOMElement({ name }: IPageTag): HTMLElement;
        appendDomElement(element: HTMLElement): void;
        removeDOMElement(element: HTMLElement): void;
    }
}
declare module '_Page/_jsLinks/Aspect' {
    import {
        IPageTagAPIAspect,
        IPageTagAttrs,
        IPageTagElement,
        IPageTagEventHandlers,
        IPageTagId,
        JML,
    } from 'Application/_Page/_pageTagAPI/Interface';
    /**
     * Аспект для работы с тегами типа script страницы.
     * @author Печеркин С.В.
     * @private
     */
    export class JSLinksAspect implements IPageTagAPIAspect {
        protected _id: number;
        isCrossOrigin(src: string): boolean;
        createComment(text: string): void;
        createNoScript(url: string): void;
        createTag(
            name: string,
            initialAttrs: IPageTagAttrs,
            content: string,
            eventHandlers: IPageTagEventHandlers,
            elements: {
                [propName: string]: IPageTagElement;
            }
        ): IPageTagElement | void;
        createMergeTag(name: string, attrs: IPageTagAttrs, content: string): void;
        getComments(wrap?: boolean): string[];
        getData(elements: { [propName: string]: IPageTagElement }): JML[];
        clear(): void;
        /** Генератор уникального идентификатора для каждого тега */
        generateGuid(): IPageTagId;
    }
}
declare module '_Page/_jsLinks/JSLinksElement' {
    import BaseElement from 'Application/_Page/_pageTagAPI/BaseElement';
    import type {
        IPageTagAttrs,
        IPageTagEventHandlers,
    } from 'Application/_Page/_pageTagAPI/Interface';
    /**
     * Класс HTML элемента для вставки тегов ти па script в верстку страницы на сервере.
     * На сервисе представления(СП) необходим в качестве хранения данных.
     * @author Печеркин С.В.
     * @private
     */
    export default class JSLinksElement extends BaseElement {
        changeTag(attrsChange: IPageTagAttrs): void;
        isEqual(
            name: string,
            attrs: IPageTagAttrs,
            content?: string,
            eventHandlers?: IPageTagEventHandlers
        ): boolean;
        isFit(name?: string, attrs?: IPageTagAttrs): boolean;
        protected _render(): void;
        protected _removeElement(): void;
    }
}
declare module '_Page/_pageTagAPI/BaseElement' {
    import {
        IPageTag,
        IPageTagAttrs,
        IPageTagElement,
        IPageTagEventHandlers,
        JML,
    } from 'Application/_Page/_pageTagAPI/Interface';
    /**
     * @private
     * Например, с какой точки зрения он уникален или как его воткнуть в DOM
     * @property {Function} getUniqueKey - возвращаем вид уникальности. Если не вернул ничего - не уникален.
     * @property {Function} isEqual - определяем одинаковый ли элемент или нет. Сравниваем по свойствам класса
     * @property {Function} getDOMElement - генератор DOM элемента для клиента
     * @property {Function} appendDomElement - метод непосредственного внедрения DOM элемента в DOM дерево
     * @property {Function} removeDOMElement - метод непосредственного удаления DOM элемента из DOM дерева
     * @property {Function} getData - метод генерации JML данных из одного элемента
     */
    export interface IPageTagElementAspect {
        getUniqueKey(): boolean | string;
        isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean;
        getDOMElement({ name }: IPageTag): HTMLElement;
        appendDomElement(element: HTMLElement): void;
        removeDOMElement(element: HTMLElement): void;
        getData({ name, attrs, content, eventHandlers }: IPageTag): JML;
    }
    export class DefaultAspect implements IPageTagElementAspect {
        getUniqueKey(): boolean | string;
        isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean;
        getDOMElement({ name }: IPageTag): HTMLElement;
        appendDomElement(element: HTMLElement): void;
        removeDOMElement(element: HTMLElement): void;
        getData({ name, attrs, content, eventHandlers }: IPageTag): JML;
    }
    export default abstract class BaseElement implements IPageTagElement {
        protected _name: string;
        protected _attrs: IPageTagAttrs;
        protected _content?: string;
        protected _eventHandlers?: IPageTagEventHandlers;
        protected _element: HTMLElement;
        protected _hydratedElement?: HTMLElement;
        protected _aspect: IPageTagElementAspect;
        constructor(
            name: string,
            attrs: IPageTagAttrs,
            content?: string,
            eventHandlers?: IPageTagEventHandlers,
            aspect?: IPageTagElementAspect,
            hydratedElement?: HTMLElement
        );
        getUniqueKey(): boolean | string;
        getData(): JML;
        toPageTag(): IPageTag;
        clear(): void;
        /** удаляет элемент из DOM дерева. */
        protected abstract _removeElement(): void;
        isEqual(name: string, attrs: IPageTagAttrs, content?: string): boolean;
        isFit(name?: string, attrs?: IPageTagAttrs): boolean;
        isImportant(): boolean;
        getAttrs(): IPageTagAttrs;
        /**
         * @param attrs {IPageTagAttrs} Объект атрибутов элемента
         */
        setAttrs(attrs: IPageTagAttrs): void;
        /**
         * @param attrsChange {IPageTagAttrs} Атрибуты для замены
         */
        abstract changeTag(attrsChange: IPageTagAttrs): void;
        /** Отрисовка элемента в head. */
        protected abstract _render(): void;
        /** генерируется тэг в формате JML */
        static generateTag(data: IPageTag): JML;
        static isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean;
        static isServer: boolean;
    }
}
declare module '_Request/FakeWebStorage' {
    /**
     * Эмуляция любого Storage браузера
     * @private
     */
    export class FakeWebStorage implements Storage {
        private __data;
        get length(): number;
        getItem(key: string): string;
        setItem(key: string, value: string): boolean;
        removeItem(key: string): void;
        getKeys(): string[];
        key(index: number): string;
        clear(): void;
    }
}
declare module '_Request/IRequest' {
    import Config from 'Application/_Config/Config';
    import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
    import type { IStore } from 'Application/_Request/IStore';
    import type { IStateReceiver } from 'Application/_State/Interfaces';
    /**
     * Компонент, которые предоставляет в платформе доступ к синглтонам в рамках запроса пользователя.
     * @public
     * @author Санников К.А.
     */
    export interface IRequest {
        /**
         * @cfg {ICookie} cookie
         */
        cookie: ICookie;
        /**
         * @cfg {ILocation} location
         */
        location: ILocation;
        /**
         * Получить Config
         * @return {Application/_Config/Config}
         */
        getConfig(): Config;
        /**
         * Доступ к объекту сохранения состояния на сервисе представлений,
         * для его получения на клиенте. Не привязан к VDOM механизмам,
         * поэтому можно будет его использовать в не визуальных компонентах.
         * @return {Application/_State/IStateReceiver}
         */
        getStateReceiver(): IStateReceiver;
        /**
         * Получение хранилища для сохранений данных в рамках запроса.
         * @param {String} key Тип хранилища.
         * @return {Application/_Request/IStore} Хранилище
         */
        getStore<T = Record<string, string>>(
            key: string,
            createDefaultStore?: () => IStore<T>
        ): IStore<T>;
        /**
         * Установка хранилища
         * @param {String} key Тип хранилища.
         * @param {Application/_Request/IStore} storage Хранилище.
         */
        setStore<T = Record<string, string>>(key: string, storage: IStore<T>): void;
    }
    export interface IRequestInternal extends IRequest {
        setStateReceiver(stateReceiver: IStateReceiver): void;
    }
}
declare module '_Request/IStore' {
    /**
     * Описание интерфейса компонента, для работы неким Storage.
     * Необходим для того что бы создавать хранилище на клиенте и на сервисе представления.
     * @public
     * @author Санников К.А.
     * @see Application/_Request/IStore/IStoreMap
     */
    export interface IStore<T = Record<string, string>> {
        get: <K extends keyof T & string>(key: K) => T[K] | null;
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
     * @name  Application/_Request/IStore#get
     * @param {String} key Ключ
     * @return {<[T=string]>|null}
     */
    /**
     * Задать значение полю по ключу
     * @function
     * @name  Application/_Request/IStore#set
     * @param {String} key Ключ
     * @return {Boolean} Успех операции
     */
    /**
     * Удалить поле по ключу
     * @function
     * @name  Application/_Request/IStore#remove
     * @param {String} key Ключ
     */
    /**
     * Получить все ключи
     * @function
     * @name  Application/_Request/IStore#getKeys
     * @return {String[]}
     */
    /**
     * Преобразовать в объект
     * @function
     * @name  Application/_Request/IStore#toObject
     * @return {[key: string]: string}
     */
    /**
     * Функциональный интерфейс IStoreMap
     * @remark
     * Описывает функцию, возвращающую хранилище по имени:
     * <pre>
     * [propName: string]: IStore;
     * </pre>
     * @private
     * @name Application/_Request/IStore/IStoreMap
     */
    export interface IStoreMap {
        [propName: string]: IStore<any>;
    }
}
declare module '_Request/Request' {
    import { Config } from 'Application/Config';
    import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
    import type { IRequestInternal } from 'Application/_Request/IRequest';
    import type { IStore } from 'Application/_Request/IStore';
    import type { IStateReceiver } from 'Application/_State/Interfaces';
    interface ICookieLocation {
        cookie: ICookie;
        location: ILocation;
    }
    /**
     * Класс Request
     * @implements Application/_Request/IRequest
     * @public
     * @author Санников К.А.
     * @see Application/_Request/IRequest
     * @see Application/_Request/IStore
     * @see Application/Env/ILocation
     * @see Application/_State/ISerializableState
     * @see Application/_State/IStateReceiver
     * @todo добавить пример
     */
    export default class Request implements IRequestInternal {
        private readonly __config;
        /**
         * @cfg {Application/Env/ICookie} cookie
         */
        cookie: ICookie;
        /**
         * @cfg {Application/Env/ILocation} location
         */
        location: ILocation;
        /**
         * @private
         */
        private __stateReceiver;
        private readonly __storages;
        constructor(env: ICookieLocation, config: Config);
        /**
         * Получить хранилище
         * @param {string} key Ключ хранилища
         * @param {()=> IStore| undefined} createDefaultStore функция, возвращающая Store.
         * Вызывается для создания нового Store, если нет хранилища для переданного ключа
         */
        getStore<T>(key: string, createDefaultStore?: () => IStore<T>): IStore<T>;
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
        getStateReceiver(): IStateReceiver;
        /**
         * Получить Config
         */
        getConfig(): Config;
    }
}
declare module '_Request/Store' {
    import type { IStore } from 'Application/_Request/IStore';
    /**
     * Класс, реализующий интерфейс {@link Application/_Request/IStore},
     * предназначенный для работы с localStorage и SessionStorage
     * @implements Application/_Request/IStore
     * @public
     * @author Санников К.А.
     */
    export default class Store implements IStore {
        private __storage;
        constructor(storageType: Storage);
        get(key: string): string | null | undefined;
        set(key: string, data: string): boolean;
        remove(key: string): void;
        getKeys(): any;
        toObject(): {};
    }
}
declare module '_State/DisposeControl' {
    import { IResourceDisposable } from 'Application/_State/Interfaces';
    /**
     * Класс, который отвечает за сохранение и открытие ресурсов и их освобождение
     * Данный класс необходим для того, чтобы следить за всеми ресурсами.
     * Под ресурсами может подразумеваться подписки, метаданные и т.д.
     * Например, в случае если разработчик при удалении какого-либо контрола забудет удалить все подписки,
     * в таком случае данный класс может помочь ему решить данную проблему - т.к.
     * он имеет все информацию на все ресурсы и при удалении контрола он освободит все ресурсы.
     * @example
     * <pre>
     *      // создадим условный класс ресурса, который реализует интерфейс IResourceDisposable
     *      class CustomResource implements IResourceDisposable {
     *           // параметр owner подразумевает из себя какой-либо контрол
     *           enter(owner: CustomClass): void {
     *               owner.setValue();
     *           }
     *           dispose(owner: CustomClass): void {
     *               owner.clearValue();
     *           }
     *           getValue(owner: CustomClass): boolean {
     *               return owner.getValue();
     *           }
     *      }
     *      // создаем DisposeControl и условный ресурс
     *      const resources = new DisposeControl(class1);
     *      // сохраним и откроем два ресурса
     *      resources.track(new CustomResource());
     *      // после этого вызовем метод dispose, который освободит все ресурсы
     *      resources.dispose();
     * </pre>
     * @author Хамбелов М.И.
     * @public
     */
    export default class DisposeControl {
        private _owner;
        /**
         * @cfg {IResourceDisposable[]} хранит в себе ресурсы
         * @remark
         * Ресурсы в дальнейшем могут быть открыты или освобождены.
         * Примерами ресурсов могут быть:
         * Подписки(ResourceSubscription), метаданные(ResourceMeta), диалоговые окна
         * @see IResourceDisposable
         * @see ResourceSubscription
         * @see ResourceMeta
         */
        private _totalResources;
        constructor(_owner: unknown);
        /**
         * Сохраняет и открывает ресурс.
         * @param {IResourceDisposable} resource Ресурс.
         */
        track(resource: IResourceDisposable): void;
        /** Освобождение всех ресурсов */
        dispose(): void;
    }
    /**
     * Тип класса, который может быть создан через new (создан через конструктор).
     * Необходим для миксин-функции toMixDisposable.
     */
    type Constructor = new (...args: any[]) => {};
    /**
     * функция, которая возвращает класс с примесью для прикрепления и освобождения ресурсов
     * @example
     * <pre>
     *     import { Component } from 'react';
     *     const ReactControl = toMixDisposable<Component>(Component);
     *     const DisposableControl = new ReactControl({}, {readOnly: false, theme: 'default'});
     * </pre>
     * @param Base класс, к которому будут примешиваться методы
     * @return {Application/_State/DisposeControl/ControlDisposable}
     * класс, возвращаемый из миксина, в который примешиваются методы для очистки ресурсов.
     * @public
     */
    export function toMixDisposable<TBase extends Constructor>(Base: TBase): TBase;
}
declare module '_State/Interfaces' {
    import type { IConsole } from 'Application/_Env/IConsole';
    /**
     * Интерфейс ресурса
     * @public
     * @author Хамбелов М.И.
     */
    export interface IResourceDisposable {
        /**
         * открывает ресурс
         * @param {unknown} owner контрол, которому принадлежит ресурс
         */
        enter(owner: unknown): void;
        /**
         * закрывает ресурс
         * @param {unknown} owner контрол, которому принадлежит ресурс
         */
        dispose(owner: unknown): void;
    }
    /**
     * Интерфейс, который нужно поддержать компонентам, что бы их можно было сериализовать
     * и восстановливать их состояние в любой момент
     * @public
     * @author Санников К.А.
     * @example
     * Использование отдельного объекта для сохранения состояния.
     * <pre>
     * import { getStateReceiver } from 'Application/Env';
     * import { ISerializableState } from 'Application/State';
     * const DEFAULT_STATE = {
     *     // ...
     * }
     * class MyControl implements ISerializableState {
     *    private __uid: string = '<какой-то-строковый-идентификатор>';
     *    protected _state: Record<string, any>;
     *    constructor(...args) {
     *        getStateReceiver().register(this.__uid, this);
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
     *        getStateReceiver().unregister(this.__uid);
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
    export type IStateReceiverMeta = {
        ulid: string;
    } & Record<string, string>;
    /**
     * Интерфейс компонента для восстановления состояний компонентов.
     * Необходим для получения данных состояний компонентов созданных на сервер.
     * @private
     * @author Санников К.А.
     */
    export interface IStateReceiver {
        /**
         * В новой архитектуре на основе React нельзя использовать на сервере асинхронное построение и мы это лечим.
         * Но есть достаточно распространенные компоненты типа Controls.listDataOld:DataContainer,
         * которые силами платформы долго переводить на синхронное построение. Поэтому мы решили регистрировать все
         * результаты _beforeMount типа Promise и ждать их тут 5 секунд.
         */
        waitBeforeMounts(): Promise<unknown>;
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
         * @param {string | IStateReceiverMeta} uid Идентификатор инстанса,
         * для идентификации сохраненного для него состояния.
         * @param meta
         * @param {Application/_State/ISerializableState} component Сериализируемый компонент.
         * @param {boolean} guess
         */
        register(
            meta: string | IStateReceiverMeta,
            component: ISerializableState | Promise<ISerializableState>,
            guess?: boolean
        ): void;
        /**
         * Отменить регистрацию по идентификатору инстанса.
         * @param {String} uid Идентификатор инстанса.
         */
        unregister(uid: string): void;
        /**
         * установить логгер
         * @param  {Application/_Env/IConsole} логгер.
         */
        setLogger(Logger: IConsole): void;
    }
}
declare module '_State/StateReceiver' {
    import type { IConsole } from 'Application/_Env/IConsole';
    import type {
        ISerializableState,
        IStateReceiver,
        IStateReceiverMeta,
    } from 'Application/_State/Interfaces';
    /**
     * @author Санников К.
     * @private
     */
    interface ISerializedType {
        serialized: string;
        additionalDeps: {
            [depPath: string]: boolean;
        };
    }
    /**
     * Пакет правил для замены при сериализации
     */
    export const componentOptsReArray: {
        toFind: RegExp;
        toReplace: string;
    }[];
    /** класс заглушка в случае,
     * если не был передан конструктор UI/_state/Serializer,
     * при создании текущего класса StateReceiver.
     * @private
     */
    class Serializer {
        _linksStorage: {};
        _depsStorage: {};
        deserialize: undefined;
        serializeStrict: undefined;
        static parseDeclaration(module: any): {
            name: string;
        };
    }
    export class StateReceiver implements IStateReceiver {
        private _constructorSerializer;
        private _receivedStateObjectsArray;
        private _receivedStatePromisesArray;
        private _deserialized;
        private _serialized;
        private __serializer;
        private _logger;
        constructor(_constructorSerializer?: typeof Serializer);
        setLogger(Logger: IConsole): void;
        private _getLogger;
        private __getSerializer;
        waitBeforeMounts(): Promise<unknown>;
        serialize(): ISerializedType;
        deserialize(str: string | undefined): void;
        register(
            meta: string | IStateReceiverMeta,
            data: ISerializableState | Promise<ISerializableState>,
            guess?: boolean
        ): void;
        _registerPromise(
            meta: string | IStateReceiverMeta,
            data: Promise<ISerializableState>
        ): void;
        private ReactComponentRe;
        private deserializedKeys;
        private preparedKeys;
        private replaceReactComponentInKey;
        private removeDeserializedKey;
        private _guessResult;
        _registerInst(
            meta: string | IStateReceiverMeta,
            inst: ISerializableState,
            guess?: boolean
        ): void;
        unregister(key: string): void;
    }
}
