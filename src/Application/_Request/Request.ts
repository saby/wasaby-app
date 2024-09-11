import { Config } from 'Application/Config';
import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
import type { IRequest } from 'Application/_Request/IRequest';
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
export default class Request implements IRequest {
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-denylist,id-match
    private readonly __config: Config;

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
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-denylist,id-match
    private __stateReceiver: IStateReceiver;

    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-denylist, id-match
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
    getStore<T = Record<string, string>, S = IStore<T>>(
        key: string,
        createDefaultStore?: () => S
    ): S {
        if (!this.__storages[key]) {
            const storage = createDefaultStore
                ? createDefaultStore()
                : new Store(new FakeWebStorage());
            this.__storages[key] = storage as unknown as IStore<T>;
        }
        return this.__storages[key] as unknown as S;
    }

    /**
     * Задать хранилище
     */
    setStore<T = Record<string, string>, S = IStore<T>>(key: string, storage: S): void {
        this.__storages[key] = storage as unknown as IStore<T>;
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
