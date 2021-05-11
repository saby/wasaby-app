/// <amd-module name="Application/_Env/NodeJS/Env" />
import { Config } from 'Application/Config';
import {
    IEnv, IHttpRequest, IHttpResponse,
    IRequest, IRequestInternal
} from 'Application/Interface';
import Request from 'Application/Request';
import type { IConsole } from 'Application/_Env/IConsole';
import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
import Console from 'Application/_Env/NodeJS/Console';
import Cookie from 'Application/_Env/NodeJS/Cookie';
import Location from 'Application/_Env/NodeJS/Location';

/**
 * Окружение для запуска Application под NodeJS
 * @class Application/_Env/NodeJS/Env
 * @public
 * @implements {Application/_Interface/IEnv}
 */
export default class EnvNodeJS implements IEnv {
    /**
     * Флаг с обозначением того, что можно создавать Request
     * @cfg {Boolean} initRequest
     * @name Application/_Env/NodeJS/Env#initRequest
     */
    initRequest: boolean = false;
    console: IConsole;
    cookie: ICookie;
    location: ILocation;
    private cfg: Config;
    private getHttpRequest: () => IHttpRequest;

    constructor(data: Record<string, unknown>, console?: IConsole) {
        this.cfg = new Config(data);
        this.console = console || new Console();
        const logLevel = this.cfg.get('Application/Env.LogLevel');
        if (logLevel !== undefined) {
            const logLevelNum: number = typeof logLevel === 'number' ? logLevel : parseInt(logLevel.toString(), 10);
            this.console.setLogLevel(logLevelNum);
        }
    }

    getRequest(): IRequest {
        if (typeof this.getHttpRequest !== 'function') {
            throw new Error('Нельзя использовать Request вне пользовательского запроса!');
        }
        return this.getHttpRequest().appRequest;
    }

    createRequest(cfg: Config, requestGetter: () => IHttpRequest,
                  responseGetter: () => IHttpResponse): IRequestInternal {
        if (cfg) {
            cfg.setState({ ...this.cfg.getState(), ...cfg.getState() });
        }
        this.getHttpRequest = requestGetter;
        this.location = new Location(requestGetter);
        this.cookie = new Cookie(requestGetter, responseGetter);
        return requestGetter().appRequest =
            new Request({location: this.location, cookie: this.cookie}, cfg);
    }
}
