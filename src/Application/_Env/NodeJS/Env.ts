import { Config } from 'Application/Config';
import Request from 'Application/Request';
import type { IRequest } from 'Application/Request';
import type { IConsole } from 'Application/_Env/IConsole';
import type { IEnv } from 'Application/_Env/IEnv';
import type { IHttpRequest } from 'Application/_Env/IHttpRequest';
import type { IHttpResponse } from 'Application/_Env/IHttpResponse';
import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
import Console from 'Application/_Env/NodeJS/Console';
import Cookie from 'Application/_Env/NodeJS/Cookie';
import Location from 'Application/_Env/NodeJS/Location';

/**
 * Окружение для запуска Application под NodeJS
 * @public
 */
export default class EnvNodeJS implements IEnv {
    initRequest: boolean = false;
    console: IConsole;
    cookie: ICookie;
    location: ILocation;
    private envConfig: Config;
    private getHttpRequest: () => IHttpRequest;

    constructor(data: Record<string, unknown>, console?: IConsole) {
        this.envConfig = new Config(data);
        this.console = console || new Console();
        const logLevel = this.envConfig.get('Application/Env.LogLevel');
        if (logLevel !== undefined) {
            const logLevelNum: number =
                typeof logLevel === 'number' ? logLevel : parseInt(logLevel.toString(), 10);
            this.console.setLogLevel(logLevelNum);
        }
    }

    getRequest(): IRequest {
        if (typeof this.getHttpRequest !== 'function') {
            throw new Error('Нельзя использовать Request вне пользовательского запроса!');
        }
        return this.getHttpRequest().appRequest;
    }

    createRequest(
        requestConfig: Config,
        requestGetter: () => IHttpRequest,
        responseGetter: () => IHttpResponse
    ): IRequest {
        if (requestConfig) {
            requestConfig.setState({
                ...this.envConfig.getState(),
                ...requestConfig.getState(),
            });
        }
        this.getHttpRequest = requestGetter;
        this.location = new Location(requestGetter, responseGetter);
        this.cookie = new Cookie(requestGetter, responseGetter);
        return (requestGetter().appRequest = new Request(
            { location: this.location, cookie: this.cookie },
            requestConfig
        ));
    }
}
