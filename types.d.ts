/// <amd-module name="Application/_Interface/IConsole" />
declare module "Application/_Interface/IConsole" {
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
/// <amd-module name="Application/_Interface/IStore" />
declare module "Application/_Interface/IStore" {
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
/// <amd-module name="Application/_Interface/ICookie" />
declare module "Application/_Interface/ICookie" {
    import { IStore } from "Application/_Interface/IStore";
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
        set(key: string, value: string, options?: Partial<ICookieOptions>): boolean;
        /**
         * Удаляем cookie
         * @param {String} key
         * @throws {Error} ошибка очистки значения
         */
        remove(key: string): void;
    }
}
/// <amd-module name="Application/Type" />
declare module "Application/Type" {
    export type Native = string | number | boolean;
    export type HashMap<T> = {
        [key: string]: T;
    };
}
/// <amd-module name="Application/_Interface/ISerializableState" />
declare module "Application/_Interface/ISerializableState" {
    import { HashMap, Native } from "Application/Type";
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
     *    protected _state: HashMap<Native>;
     *    constructor(...args) {
     *        stateReceiver.register(this.__uid, this);
     *        // ...
     *    }
     *    getState(): HashMap<Native> {
     *        return this._state || {}
     *    }
     *    setState(data: HashMap<Native>): void {
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
        getState(): HashMap<Native>;
        /**
         * Устанавливаем состояния после десериализации
         */
        setState(data: HashMap<Native>): void;
    }
}
/// <amd-module name="Application/_Config/Config" />
declare module "Application/_Config/Config" {
    import { ISerializableState } from "Application/_Interface/ISerializableState";
    import { HashMap, Native } from "Application/Type";
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
        constructor(data?: HashMap<Native>, __uid?: string);
        /**
         * Получить данные по ключу
         * @param {String} key
         * @return {Native}
         */
        get(key: string): Native;
        /**
         * Получить состояние
         * @return {HashMap<Native>}
         */
        getState(): HashMap<Native>;
        /**
         * Задать состояние
         * @param {HashMap<Native>} data
         */
        setState(data: HashMap<Native>): void;
        /**
         * Получить UID
         * @return {String}
         */
        getUID(): string;
    }
}
/// <amd-module name="Application/_Interface/ILocation" />
declare module "Application/_Interface/ILocation" {
    /**
     * Описание обобщенного window.location.
     * Выписаны те поля, которые есть на сервисе представления и в браузере
     * @interface Application/_Interface/ILocation
     * @public
     * @author Ибрагимов А.А.
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
    }
}
/// <amd-module name="Application/_Interface/IStateReceiver" />
declare module "Application/_Interface/IStateReceiver" {
    import { ISerializableState } from "Application/_Interface/ISerializableState";
    /**
     * Интерфейс компонента для восстановления состояний компонентов.
     * Необходим для получения данных состояний компонентов созданных на сервер.
     * @interface Application/_Interface/IStateReceiver
     * @public
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
    }
}
/// <amd-module name="Application/_Interface/IRequest" />
declare module "Application/_Interface/IRequest" {
    import Config from "Application/_Config/Config";
    import { IConsole } from "Application/_Interface/IConsole";
    import { ICookie } from "Application/_Interface/ICookie";
    import { ILocation } from "Application/_Interface/ILocation";
    import { IStateReceiver } from "Application/_Interface/IStateReceiver";
    import { IStore } from "Application/_Interface/IStore";
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
         * @name Application/_Interface/IRequest#console
         * @cfg {IConsole} console
         */
        console: IConsole;
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
        getStore<T = Record<string, string>>(key: string): IStore<T>;
        /**
         * Установка хранилища
         * @param {String} key Тип хранилища.
         * @param {Application/_Interface/IStore} storage Хранилище.
         */
        setStore<T = Record<string, string>>(key: string, storage: IStore<T>): void;
    }
}
/// <amd-module name="Application/_Interface/IEnv" />
declare module "Application/_Interface/IEnv" {
    import Config from "Application/_Config/Config";
    import { IConsole } from "Application/_Interface/IConsole";
    import { ICookie } from "Application/_Interface/ICookie";
    import { ILocation } from "Application/_Interface/ILocation";
    import { IRequest } from "Application/_Interface/IRequest";
    import { IStoreMap } from "Application/_Interface/IStore";
    /**
     * Интерфейс IEnv
     * @interface Application/_Interface/IEnv
     * @public
     * @author Санников К.А.
     * @see Application/Interface/IEnv/IEnvFactory
     */
    export interface IEnv {
        console: IConsole;
        cookie: ICookie;
        location: ILocation;
        storages: IStoreMap;
        getGlobal: () => {
            appRequest: IRequest | undefined;
        };
    }
    /**
     * @name Application/_Interface/IEnv#console
     * @cfg {Application/_Interface/IConsole} console
     */
    /**
     * @name Application/_Interface/IEnv#cookie
     * @cfg {Application/_Interface/ICookie} cookie
     */
    /**
     * @name Application/_Interface/IEnv#location
     * @cfg {Application/_Interface/ILocation} location
     */
    /**
     * @name Application/_Interface/IEnv#storages
     * @cfg {Application/_Interface/IStoreMap} storages
     */
    /**
     * getGlobal
     * @function
     * @name Application/_Interface/IEnv#getGlobal
     * @return {IRequest|undefined}
     */
    /**
     * Интерфейс IEnvFactory
     * @interface Application/Interface/IEnv/IEnvFactory
     * @author Санников К.А.
     */
    export interface IEnvFactory {
        create(config: Config): IEnv;
    }
}
/// <amd-module name="Application/_Request/FakeWebStorage" />
declare module "Application/_Request/FakeWebStorage" {
    /**
     * Эмуляция любого Storage браузера
     */
    export class FakeWebStorage implements Storage {
        private __data;
        get length(): number;
        getItem(key: string): any;
        setItem(key: string, value: string): boolean;
        removeItem(key: string): void;
        key(index: number): string;
        clear(): void;
    }
}
/// <amd-module name="Application/_Request/Store" />
declare module "Application/_Request/Store" {
    import { IStore } from "Application/_Interface/IStore";
    /**
     * Класс, реализующий интерфейс {@link Application/_Interface/IStore},
     * предназначенный для работы с localStorage и SessionStorage
     * @class Application/_Request/Store
     * @implements Application/_Interface/IStore
     * @author Санников К.А.
     */
    export default class Store<T = Record<string, string>> implements IStore<T> {
        private __storage;
        constructor(storageType: Storage);
        get<K extends keyof T & string>(key: K): T[K];
        set<K extends keyof T & string>(key: K, data: T[K]): boolean;
        remove<K extends keyof T & string>(key: K): void;
        getKeys(): (keyof T & string)[];
        toObject(): { [key in keyof T]: T[key]; };
    }
}
/// <amd-module name="Application/_Request/Request" />
declare module "Application/_Request/Request" {
    import { IConsole } from "Application/_Interface/IConsole";
    import { ICookie } from "Application/_Interface/ICookie";
    import { IEnv } from "Application/_Interface/IEnv";
    import { ILocation } from "Application/_Interface/ILocation";
    import { IRequest } from "Application/_Interface/IRequest";
    import { IStateReceiver } from "Application/_Interface/IStateReceiver";
    import { IStore } from "Application/_Interface/IStore";
    import { Config } from "Application/Config";
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
    export default class AppRequest implements IRequest {
        private readonly __config;
        /**
         * @cfg {Application/_Interface/IConsole} console
         * @name Application/_Request/Request#console
         */
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
        console: IConsole;
        cookie: ICookie;
        location: ILocation;
        private __stateReceiver;
        private readonly __storages;
        constructor(env: IEnv, config: Config);
        /**
         * Получить хранилище
         */
        getStore<T>(key: string): IStore<T>;
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
        /**
         * Задать текущий запрос
         * @function
         * @name Application/_Request/Request#setCurrent
         * @param {Application/_Interface/IRequest} request
         * @static
         */
        static setCurrent(request: IRequest): void;
        /**
         * Получить текущий запрос
         * @function
         * @name Application/_Request/Request#getCurrent
         * @return {Application/_Interface/IRequest}
         * @static
         */
        static getCurrent(): IRequest | undefined;
    }
}
/// <amd-module name="Application/Request" />
declare module "Application/Request" {
    import { default as Request } from "Application/_Request/Request";
    /**
     * Библиотека c классами для работы с запросами и хранилищем
     * @library Application/Request
     * @includes Request Application/_Request/Request
     * @includes Store Application/_Request/Store
     * @public
     * @author Санников К.А.
     */
    export default Request;
    export { default as Store } from "Application/_Request/Store";
}
/// <amd-module name="Application/Config" />
declare module "Application/Config" {
    /**
     * Библиотека Config
     * @library Application/Config
     * @includes Config Application/_Config/Config
     * @public
     * @author Санников К.А.
     */
    export { default as Config } from "Application/_Config/Config";
    export function get(key: string): import("Application/Type").Native;
}
/// <amd-module name="Application/_Env/Browser/Cookie" />
declare module "Application/_Env/Browser/Cookie" {
    import { ICookie, ICookieOptions } from "Application/_Interface/ICookie";
    import { IStore } from "Application/_Interface/IStore";
    /**
     * Класс предназначенный для работы с cookie в браузере,
     * @class
     * @name _Request/_Storage/Cookie
     * @implements Application/_Interface/ICookie
     * @implements Application/_Interface/IStore
     * @author Санников К.А.
     */
    export default class Cookie implements ICookie, IStore {
        cosntructor(): void;
        get(key: string): any;
        set(key: string, value: string, options?: Partial<ICookieOptions>): boolean;
        remove(key: string): void;
        getKeys(): string[];
        toObject(): {};
    }
}
/// <amd-module name="Application/_Env/Console" />
declare module "Application/_Env/Console" {
    import { IConsole } from "Application/_Interface/IConsole";
    /**
     * Содержит константы уровня логирования - {@link LogLevel}
     * @module
     * @name Application/Env/Console
     * @author Санников К.А.
     */
    /**
     * [typedef] Уровень логирования
     * @class
     * @name Application/Env/Console/LogLevel
     * @author Санников К.А.
     * @todo Описать как typedef, когда это будет поддерживать автодока
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
        error = 2
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
        constructor(console: any);
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
        warn(): any;
        error(): void;
    }
}
/// <amd-module name="Application/_Env/ObjectStore" />
declare module "Application/_Env/ObjectStore" {
    import { IStore } from "Application/_Interface/IStore";
    export default class ObjectStore<T = Record<string, string>> implements IStore<T> {
        private __data;
        get<K extends keyof T & string>(key: K): T[K];
        set<K extends keyof T & string>(key: K, value: T[K]): boolean;
        remove<K extends keyof T & string>(key: K): void;
        getKeys(): (keyof T & string)[];
        toObject(): T;
    }
}
/// <amd-module name="Application/_Env/Browser/Env" />
declare module "Application/_Env/Browser/Env" {
    import { IConsole } from "Application/_Interface/IConsole";
    import { ICookie } from "Application/_Interface/ICookie";
    import { IEnv } from "Application/_Interface/IEnv";
    import { ILocation } from "Application/_Interface/ILocation";
    import { IStoreMap } from "Application/_Interface/IStore";
    import { Config } from "Application/Config";
    /**
     * Класс EnvBrowser
     * @class Application/_Env/Browser/Env
     * @author Ибрагимов А.А.
     * @implements Application/_Interface/IEnv
     * @public
     */
    export default class EnvBrowser implements IEnv {
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
        global: {
            appRequest: any;
        };
        constructor(cfg: Config);
        /**
         * Получить глобальную сущность
         */
        getGlobal(): {
            appRequest: any;
        };
        /**
         * Создать новую сущность
         */
        static create(cfg: Config): EnvBrowser;
    }
}
/// <amd-module name="Application/_Env/QueryParams" />
declare module "Application/_Env/QueryParams" {
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
     * @property {String} param_name значение параметра
     */
    type PARAMS_SET = {
        [param_name: string]: string;
    };
}
/// <amd-module name="Application/_Interface/IConfig" />
declare module "Application/_Interface/IConfig" {
    import { Native } from "Application/Type";
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
         * @return {Native}
         */
        get(key: string): Native;
    }
}
/// <amd-module name="Application/Interface" />
declare module "Application/Interface" {
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
     * @public
     * @author Санников К.А.
     */
    export * from "Application/_Interface/IConsole";
    export * from "Application/_Interface/ICookie";
    export * from "Application/_Interface/IConfig";
    export * from "Application/_Interface/IEnv";
    export * from "Application/_Interface/ILocation";
    export * from "Application/_Interface/ISerializableState";
    export * from "Application/_Interface/IStore";
    export * from "Application/_Interface/IStateReceiver";
    export * from "Application/_Interface/IRequest";
}
/// <amd-module name="Application/_Env/Browser/StateReceiver" />
declare module "Application/_Env/Browser/StateReceiver" {
    import { HashMap, Native } from "Application/Type";
    import { IConsole, ISerializableState, IStateReceiver } from "Application/Interface";
    type StateMap = HashMap<HashMap<Native>>;
    /**
     * @typedef {Object} StateReceiverConfig
     * @property {StateMap} [states] states
     * @property {Application/_Interface/IConsole} [console] console
     */
    export type StateReceiverConfig = {
        states?: StateMap;
        console?: IConsole;
    };
    /**
     * Класс, реализующий интерфейс {@link Application/_Interface/IStateReceiver},
     * позволяющий сохранять состояние компонентов
     *
     * @class Application/_Env/Browser/StateReceiver
     * @implements Application/_Interface/IStateReceiver
     * @author Санников К.А.
     * @public
     */
    export default class StateReceiver implements IStateReceiver {
        private __states;
        private __components;
        private readonly __console;
        constructor(states?: any, console?: IConsole);
        serialize(): string;
        deserialize(data: string): void;
        register(uid: string, component: ISerializableState): void;
        unregister(uid: string): void;
        private __updateState;
        private __setComponentState;
    }
}
/// <amd-module name="Application/Env" />
declare module "Application/Env" {
    export { default as EnvBrowser } from "Application/_Env/Browser/Env";
    export { default as ObjectStore } from "Application/_Env/ObjectStore";
    import { PARAMS } from "Application/_Env/QueryParams";
    export { default as StateReceiver } from "Application/_Env/Browser/StateReceiver";
    export { LogLevel } from "Application/_Env/Console";
    import { IConsole } from "Application/_Interface/IConsole";
    import { ICookie } from "Application/_Interface/ICookie";
    import { ILocation } from "Application/_Interface/ILocation";
    import { IStateReceiver } from "Application/_Interface/IStateReceiver";
    import { IStore } from "Application/_Interface/IStore";
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
    export const query: PARAMS;
    /**
     * Реализация {@link Application/_Interface/ILocation} - обобщенного window.location.
     * @class
     * @name Application/Env/location
     * @implements Application/_Interface/ILocation
     * @see Application/_Interface/ILocation
     */
    export const location: ILocation;
    /**
     * Реализация {@link Application/_Interface/ICookie} - интерфейса по работе с cookie
     * @class
     * @name Application/Env/cookie
     * @implements Application/_Interface/ICookie
     * @see Application/_Interface/ICookie
     */
    export const cookie: ICookie;
    /**
     * Реализация {@link Application/_Interface/IConsole} - логгера
     * @class
     * @name Application/Env/logger
     * @implements Application/_Interface/IConsole
     * @see Application/_Interface/IConsole
     */
    export const logger: IConsole;
    /**
     * Метод, возвращающий компонент для восстановления состояний компонентов
     * @function
     * @name Application/Env#getStateReceiver
     * @return {Application/_Interface/IStateReceiver}
     * @see Application/_Interface/IStateReceiver
     */
    export function getStateReceiver(): IStateReceiver;
    /**
     * Метод, возвращающий текущее хранилище
     * @function
     * @name Application/Env#getStore
     * @param {String} type type
     * @return {Application/_Interface/IStore}
     * @see Application/_Interface/IStore
     */
    export function getStore<T = Record<string, string>>(type: string): IStore<T>;
    /**
     * Метод, задающий текущее хранилище
     * @function
     * @name Application/Env#setStore
     * @param {String} type type
     * @param {Application/_Interface/IStore} store store
     */
    export function setStore<T = Record<string, string>>(type: string, store: IStore<T>): void;
}
/// <amd-module name="Application/Initializer" />
declare module "Application/Initializer" {
    import { IEnvFactory } from "Application/_Interface/IEnv";
    import { ISerializableState } from "Application/_Interface/ISerializableState";
    import { IStateReceiver } from "Application/_Interface/IStateReceiver";
    import { HashMap } from "Application/Type";
    import Request from "Application/Request";
    export default function init(defaultConfigData?: HashMap<string>, envFactory?: IEnvFactory, stateReceiver?: IStateReceiver): Request;
    export function registerComponent(uid: string, component: ISerializableState): void;
    export function isInit(): boolean;
}
