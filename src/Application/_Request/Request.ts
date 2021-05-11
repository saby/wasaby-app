/// <amd-module name="Application/_Request/Request" />
import { Config } from 'Application/Config';
import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
import { IRequestInternal } from 'Application/_Interface/IRequest';
import { FakeWebStorage } from 'Application/_Request/FakeWebStorage';
import type { IStore, IStoreMap } from 'Application/_Request/IStore';
import Store from 'Application/_Request/Store';
import type { IStateReceiver } from 'Application/_State/Interfaces';

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
 * @see Application/_Request/IStore
 * @see Application/Env/ILocation
 * @see Application/_State/ISerializableState
 * @see Application/_State/IStateReceiver
 * @todo добавить пример
 */
export default class Request implements IRequestInternal {
    // tslint:disable-next-line: variable-name
    private readonly __config: Config;

    /**
     * @cfg {Application/Env/ICookie} cookie
     * @name Application/_Request/Request#cookie
     */
    cookie: ICookie;

    /**
     * @cfg {Application/Env/ILocation} location
     * @name Application/_Request/Request#location
     */
    location: ILocation;

    /**
     * @cfg {Application/_State/IStateReceiver} __stateReceiver
     * @name Application/_Request/Request#__stateReceiver
     * @private
     */
    // tslint:disable-next-line: variable-name
    private __stateReceiver: IStateReceiver;

    // tslint:disable-next-line: variable-name
    private readonly __storages: IStoreMap = {};

    constructor(env: ICookieLocation, config: Config) {
        this.cookie = env.cookie;
        this.location = env.location;
        this.__config = config;
    }

    /**
     * Получить хранилище
     * @param {string} key Ключ хранилища
     * @param {()=> IStore| undefined} createDefaultStore функция, возвращающая Store.
     * Вызывается для создания нового Store, если нет хранилища для переданного ключа
     */
    getStore<T>(key: string, createDefaultStore?: () => IStore<T>): IStore<T> {
        if (!this.__storages[key]) {
            this.__storages[key] = createDefaultStore ? createDefaultStore() : new Store(new FakeWebStorage());
        }
        return this.__storages[key];
    }

    /**
     * Задать хранилище
     */
    setStore<T>(key: string, storage: IStore<T>): void {
        this.__storages[key] = storage;
    }

    /**
     * Задать stateReceiver
     */
    setStateReceiver(stateReceiver: IStateReceiver): void {
        this.__stateReceiver = stateReceiver;
    }

    /**
     * Получить stateReceiver
     */
    getStateReceiver(): IStateReceiver {
        return this.__stateReceiver;
    }

    /**
     * Получить Config
     */
    getConfig(): Config {
        return this.__config;
    }
}
