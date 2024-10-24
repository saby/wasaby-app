import type { IConfig } from 'Application/_Config/IConfig';
import type { IConsole } from 'Application/_Env/IConsole';
import type { IHttpRequest } from 'Application/_Env/IHttpRequest';
import type { IHttpResponse } from 'Application/_Env/IHttpResponse';
import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
import type { IRequest } from 'Application/_Request/IRequest';

/**
 * Интерфейс IEnv
 * @public
 * @author Санников К.А.
 */
export interface IEnv {
    /**
     * Инициализировать request при старте приложения
     */
    readonly initRequest: boolean;
    /**
     *
     */
    console: IConsole;
    /**
     *
     */
    cookie: ICookie;
    /**
     *
     */
    location: ILocation;
    /**
     *
     */
    getRequest(): IRequest;
    /**
     *
     */
    createRequest(
        requestConfig: IConfig,
        requestGetter?: () => IHttpRequest,
        responseGetter?: () => IHttpResponse
    ): IRequest;
}
