/// <amd-module name="Application/_Env/NodeJS/Env" />
import Cookie from 'Application/_Env/NodeJS/Cookie';
import Console from 'Application/_Env/NodeJS/Console';
import Location from 'Application/_Env/NodeJS/Location';
import {
    IConsole, ICookie, IEnv, ILocation, IStoreMap,
    IRequest, IRequestInternal
} from 'Application/Interface';
import { Config } from 'Application/Config';
import Request from 'Application/Request';

let appRequest: IRequestInternal;
/**
 * Неполноценное окружение для запуска Application под NodeJS
 * Используется в тестах, билдере, везде где нет request'a
 */
export default class implements IEnv {
    initRequest: boolean = true;
    console: IConsole;
    cookie: ICookie;
    location: ILocation;
    storages: IStoreMap;

    constructor (private cfg: Config = new Config()) {
        this.location = new Location();
        this.console = new Console();
        let logLevel = cfg.get('Application/Env.LogLevel');
        if (logLevel !== undefined) {
            logLevel = typeof logLevel === 'number' ? logLevel : parseInt(logLevel.toString(), 10);
            this.console.setLogLevel(logLevel);
        }

        this.cookie = new Cookie();
        this.storages = {};
    }

    //#region 
    // !REMOVE
    /**
     * Получить глобальную сущность
     */
    getGlobal() {
        let appRequest = this.getRequest();
        return { appRequest };
    }
    //#endregion
    
    getRequest(): IRequest {
        return appRequest;
    }

    createRequest(cfg: Config): IRequestInternal {
        if (cfg) {
            cfg.setState({ ...this.cfg.getState(), ...cfg.getState() });
        }
        return appRequest = new Request(this, cfg);
    }
}
