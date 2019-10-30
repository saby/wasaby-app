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
let getGlobal: () => { appRequest: IRequest|undefined } = () => {
    return globalEnv;
}

/**
 * @class Application/_Request/Request
 * @implements Application/Interface/IRequest
 * @public
 * @author Санников К.А.
 * @see Application/Interface/IStorage
 * @see Application/Interface/ILocation
 * @see Application/Interface/IConsole
 * @see Application/Interface/ISerializableState
 * @see Application/Interface/IStateReceiver
 * @todo добавить пример
 */
export default class AppRequest implements IRequest {
    private readonly __config: Config;

    /**
     * @cfg {Application/Interface:IConsole}
     * @name Application/_Request/Request#console
     */
    /**
     * @cfg {Application/Interface:ICookie}
     * @name Application/_Request/Request#cookie
     */
    /**
     * @cfg {Application/Interface:ILocation}
     * @name Application/_Request/Request#location
     */
    /**
     * @cfg {Application/Interface:IStateReceiver}
     * @name Application/_Request/Request#__stateReceiver
     * @private
     */
    console: IConsole;
    cookie: ICookie;
    location: ILocation;
    private __stateReceiver: IStateReceiver;
    private readonly __storages: IStoreMap;

    constructor(env: IEnv, config: Config) {
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
    getStore(key: string): IStore {
        if (!this.__storages[key]) {
            this.__storages[key] = new Store(new FakeWebStorage());
        }
        return this.__storages[key];
    }
    /**
     * Задать хранилище
     */
    setStore(key: string, storage: IStore) {
        // if (this.__storages[key]) {
        //     throw new Error(`attempt to overwrite used storage "${key}"`);
        // }
        this.__storages[key] = storage;
    }
    /**
     * Получить хранилище
     */
    setStateReceiver(stateReceiver: IStateReceiver) {
        this.__stateReceiver = stateReceiver;
    }
    /**
     * Получить хранилище
     */
    getStateReceiver() {
        return this.__stateReceiver;
    }
    /**
     * Получить хранилище
     */
    getConfig(): Config {
        return this.__config;
    }

    /**
     * @param {Application/Interface:IRequest} request
     * @static
     * @name Env/Request#setCurrent
     */
    static setCurrent(request: IRequest) {
        getGlobal().appRequest = request;
    }

    /**
     * @function
     * @name Application/_Request/Request#getCurrent
     * @return {Application/Interface:IRequest}
     * @static
     */
    static getCurrent(): IRequest | undefined {
        return getGlobal().appRequest;
    }
}
