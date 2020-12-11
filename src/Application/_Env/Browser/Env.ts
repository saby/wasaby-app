/// <amd-module name='Application/_Env/Browser/Env' />
import { Config } from "Application/Config";
import Request, { Store } from 'Application/Request';
import Cookie from 'Application/_Env/Browser/Cookie';
import Console, { LogLevel } from 'Application/_Env/Console';
import ObjectStore from 'Application/_Env/ObjectStore';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { IEnv } from 'Application/_Interface/IEnv';
import { ILocation } from 'Application/_Interface/ILocation';
import { IRequest, IRequestInternal } from 'Application/_Interface/IRequest';
import { IStore, IStoreMap } from 'Application/_Interface/IStore';

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
    initRequest: boolean = true;
    private _request: IRequest;
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

    private cfg: Config;

    constructor(data: Record<string, any>) {
        this.cfg = new Config(data);
        this.location = window.location;
        this.console = new Console(window.console);
        if (this.cfg.get("Application/Env.LogLevel") !== undefined) {
            this.console.setLogLevel(<LogLevel> this.cfg.get("Application/Env.LogLevel"));
        }
        try {
            this.cookie = new Cookie();
        } catch (e) {
            this.cookie = new ObjectStore();
            this.console.warn("Can't use Cookie", e);
        }

        let localStorage: IStore;
        try {
            localStorage = new Store(window.localStorage);
        } catch (e) {
            localStorage = new ObjectStore();
            this.console.warn("Can't use localStorage", e);
        }
        let sessionStorage: IStore;
        try {
            sessionStorage = new Store(window.sessionStorage);
        } catch (e) {
            sessionStorage = new ObjectStore();
            this.console.warn("Can't use sessionStorage", e);
        }

        this.storages = {
            "localStorage": localStorage,
            "sessionStorage": sessionStorage
        };
    }
    getRequest(): IRequest {
        return this._request;
    }

    createRequest(): IRequestInternal {
        return this._request = new Request(this, this.cfg);
    }
}
