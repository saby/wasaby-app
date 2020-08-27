/// <amd-module name="Application/_Env/NodeJS/Env" />
import { Config } from 'Application/Config';
import {
    IConsole, ICookie, IEnv, ILocation, IRequest,
    IRequestInternal, IStoreMap
} from 'Application/Interface';
import Request from 'Application/Request';
import Console from 'Application/_Env/NodeJS/Console';
import Cookie from 'Application/_Env/NodeJS/Cookie';
import Location from 'Application/_Env/NodeJS/Location';

let appRequest: IRequestInternal;
/**
 * Неполноценное окружение для запуска Application под NodeJS
 * Используется в тестах, билдере, везде, где нет request'a
 * @class Application/_Env/NodeJS/Env
 * @public
 * @implements {Application/_Interface/IEnv}
 */
export default class implements IEnv {
    initRequest: boolean = true;
    console: IConsole;
    cookie: ICookie;
    location: ILocation;
    storages: IStoreMap;
    private cfg: Config;

    constructor(data: Record<string, unknown>) {
        this.cfg = new Config(data);
        this.location = new Location();
        this.console = new Console();
        const logLevel = this.cfg.get('Application/Env.LogLevel');
        if (logLevel !== undefined) {
            const logLevelNum: number = typeof logLevel === 'number' ? logLevel : parseInt(logLevel.toString(), 10);
            this.console.setLogLevel(logLevelNum);
        }

        this.cookie = new Cookie();
        this.storages = {};
    }

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
