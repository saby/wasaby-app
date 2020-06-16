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
export default class EnvNodeJS implements IEnv {
    initRequest: boolean = true;
    console: IConsole;
    cookie: ICookie;
    location: ILocation;
    storages: IStoreMap;
    global = { appRequest: undefined };

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

    getRequest(): IRequest {
        return appRequest;
    }
    //#region удалить https://online.sbis.ru/opendoc.html?guid=59f87611-f87f-404e-bb27-06350248d6b2
    /**
     * Получить глобальную сущность
     */
    getGlobal() {
        return this.global;
    }
    /**
     * Создать новую сущность
     */
    static create(cfg: Config) {
        return new EnvNodeJS(cfg);
    }
    //#endregion
    createRequest(cfg: Config): IRequestInternal {
        if (cfg) {
            cfg.setState({ ...this.cfg.getState(), ...cfg.getState() });
        }
        return appRequest = new Request(this, cfg);
    }
}
