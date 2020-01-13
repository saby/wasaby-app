/// <amd-module name="Application/_Request/Request" />
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { IEnv } from 'Application/_Interface/IEnv';
import { ILocation } from 'Application/_Interface/ILocation';
import { IRequest } from 'Application/_Interface/IRequest';
import { IStateReceiver } from 'Application/_Interface/IStateReceiver';
import { IStoreMap } from 'Application/_Interface/IStore';
import { IStore } from 'Application/_Interface/IStore';
import { FakeWebStorage } from "Application/_Request/FakeWebStorage";
import Store from 'Application/_Request/Store';
import { Config } from "Application/Config";

let globalEnv = { appRequest: undefined };
let getGlobal: () => { appRequest: IRequest | undefined; } = () => {
    return globalEnv;
};

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
    private readonly __config: Config;

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
    private __stateReceiver: IStateReceiver;
    private readonly __storages: IStoreMap;

    constructor (env: IEnv, config: Config) {
        let {
            console,
            cookie,
            storages,
            location
        } = env;

        /**
         * !NB Получаем функцию хранения окружения из фабрики.
         * В браузере это просто глобальная замкнутая переменная.
         * На сервисе представления это process.domain.request
         * Так сделано потому что StateReciever написа не корректно.
         *  и хранит данные в глобальной переменной, а не в Store.
         */
        getGlobal = env.getGlobal.bind(env);

        this.console = console;
        this.cookie = cookie;
        this.location = location;
        this.__config = config;
        this.__storages = storages;
    }
    /**
     * Получить хранилище
     */
    getStore<T>(key: string): IStore<T> {
        if (!this.__storages[key]) {
            this.__storages[key] = new Store(new FakeWebStorage());
        }
        return this.__storages[key];
    }
    /**
     * Задать хранилище
     */
    setStore<T>(key: string, storage: IStore<T>) {
        // if (this.__storages[key]) {
        //     throw new Error(`attempt to overwrite used storage "${key}"`);
        // }
        this.__storages[key] = storage;
    }
    /**
     * Задать stateReceiver
     */
    setStateReceiver(stateReceiver: IStateReceiver) {
        this.__stateReceiver = stateReceiver;
    }
    /**
     * Получить stateReceiver
     */
    getStateReceiver() {
        return this.__stateReceiver;
    }
    /**
     * Получить Config
     */
    getConfig(): Config {
        return this.__config;
    }

    /**
     * Задать текущий запрос
     * @function
     * @name Application/_Request/Request#setCurrent
     * @param {Application/_Interface/IRequest} request
     * @static
     */
    static setCurrent(request: IRequest) {
        getGlobal().appRequest = request;
    }

    /**
     * Получить текущий запрос
     * @function
     * @name Application/_Request/Request#getCurrent
     * @return {Application/_Interface/IRequest}
     * @static
     */
    static getCurrent(): IRequest | undefined {
        return getGlobal().appRequest;
    }
}
