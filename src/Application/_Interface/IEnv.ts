/// <amd-module name="Application/_Interface/IEnv" />
import type { IConsole } from 'Application/_Env/IConsole';
import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
import { IConfig } from 'Application/_Interface/IConfig';
import { IHttpRequest } from 'Application/_Interface/IHttpRequest';
import { IHttpResponse } from 'Application/_Interface/IHttpResponse';
import { IRequest, IRequestInternal } from 'Application/_Interface/IRequest';

/**
 * Интерфейс IEnv
 * @interface Application/_Interface/IEnv
 * @public
 * @author Санников К.А.
 */
export interface IEnv {
    /** Инициализировать request при старте приложения */
    readonly initRequest: boolean;
    console: IConsole;
    cookie: ICookie;
    location: ILocation;
    getRequest(): IRequest;
    createRequest(cfg: IConfig, requestGetter: () => IHttpRequest,
                  responseGetter: () => IHttpResponse): IRequestInternal;
}
/**
 * @name Application/_Interface/IEnv#console
 * @cfg {Application/_Env/IConsole} console
 */
/**
 * @name Application/_Interface/IEnv#cookie
 * @cfg {Application/Env/ICookie} cookie
 */
/**
 * @name Application/Env/IEnv#location
 * @cfg {Application/Env/ILocation} location
 */
