/// <amd-module name='Application/_Env/Browser/Env' />
import Cookie from 'Application/_Env/Browser/Cookie';
import Console, { LogLevel } from 'Application/_Env/Console';
import ObjectStore from 'Application/_Env/ObjectStore';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { IEnv } from 'Application/_Interface/IEnv';
import { ILocation } from 'Application/_Interface/ILocation';
import { IStore, IStoreMap } from 'Application/_Interface/IStore';
import { Config } from "Application/Config";
import { Store } from 'Application/Request';
import { parseQuery } from 'Application/_Env/QueryParams';

export default class EnvBrowser implements IEnv {
    console: IConsole
    cookie: ICookie
    location: ILocation = null;
    storages: IStoreMap
    global = { appRequest: undefined };

    constructor(cfg: Config) {
        this.location = new Proxy(window.location, {
            get(target: ILocation, prop: keyof ILocation) {
                if (prop === 'query') { return parseQuery(target.href); }
                return target[prop];
            },
            set(target: ILocation, prop: keyof ILocation, value: string) {
                if (!target[prop] || prop === 'query') { return false; }
                target[prop] = value;
                return true;
            }
        });
        this.console = new Console(window.console);
        if (cfg.get("Application/Env.LogLevel") !== undefined) {
            this.console.setLogLevel(<LogLevel>cfg.get("Application/Env.LogLevel"));
        }

        this.cookie = new Cookie();

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
        }
    }

    getGlobal() {
        return this.global;
    }

    static create(cfg: Config) {
        return new EnvBrowser(cfg);
    }
}
