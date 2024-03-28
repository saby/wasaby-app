import { Config } from 'Application/Config';
import Request from 'Application/Request';
import Cookie from 'Application/_Env/Browser/Cookie';
import Console from 'Application/_Env/Console';
import type { IConsole } from 'Application/_Env/IConsole';
import type { IEnv } from 'Application/_Env/IEnv';
import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
import ObjectStore from 'Application/_Env/ObjectStore';
import type { IRequest, IRequestInternal } from 'Application/_Request/IRequest';

/**
 * Браузерное окружение
 * Класс EnvBrowser
 * @class Application/_Env/Browser/Env
 * @author Санников К.А.
 * @implements {Application/Env/IEnv}
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
     * @cfg {Application/_Env/IConsole} console
     * @name Application/_Env/Browser/Env#console
     */
    console: IConsole;
    /**
     * @cfg {Application/Env/ICookie} cookie
     * @name Application/_Env/Browser/Env#cookie
     */
    cookie: ICookie;
    /**
     * @cfg {Application/Env/ILocation} location
     * @name Application/_Env/Browser/Env#location
     */
    location: ILocation;

    private envConfig: Config;

    constructor(data: Record<string, unknown>) {
        this.envConfig = new Config(data);
        this.location = window.location;
        this.console = new Console(window.console as unknown as Console);
        if (this.envConfig.get('Application/Env.LogLevel') !== undefined) {
            this.console.setLogLevel(this.envConfig.get('Application/Env.LogLevel'));
        }
        try {
            this.cookie = new Cookie();
        } catch (e) {
            this.cookie = new ObjectStore();
            this.console.warn("Can't use Cookie", e);
        }
    }

    getRequest(): IRequest {
        return this._request;
    }

    createRequest(requestConfig: Config): IRequestInternal {
        if (requestConfig) {
            requestConfig.setState({
                ...this.envConfig.getState(),
                ...requestConfig.getState(),
            });
        }
        return (this._request = new Request(
            { cookie: this.cookie, location: this.location },
            requestConfig
        ));
    }
}
