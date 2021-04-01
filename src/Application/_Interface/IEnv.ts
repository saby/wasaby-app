/// <amd-module name="Application/_Interface/IEnv" />
import { IConfig } from 'Application/_Interface/IConfig';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { IHttpRequest } from 'Application/_Interface/IHttpRequest';
import { IHttpResponse } from 'Application/_Interface/IHttpResponse';
import { ILocation } from 'Application/_Interface/ILocation';
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
 * @cfg {Application/_Interface/IConsole} console
 */
/**
 * @name Application/_Interface/IEnv#cookie
 * @cfg {Application/_Interface/ICookie} cookie
 */
/**
 * @name Application/_Interface/IEnv#location
 * @cfg {Application/_Interface/ILocation} location
 */
