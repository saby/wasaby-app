/// <amd-module name="Application/_Interface/IEnv" />
import Config from 'Application/_Config/Config';
import { IConfig } from 'Application/_Interface/IConfig';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { ILocation } from 'Application/_Interface/ILocation';
import { IRequest, IRequestInternal } from 'Application/_Interface/IRequest';
import { IStoreMap } from 'Application/_Interface/IStore';

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
    storages: IStoreMap;
    getRequest(): IRequest;
    createRequest: (cfg: IConfig) => IRequestInternal;
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
/**
 * @name Application/_Interface/IEnv#storages
 * @cfg {Application/_Interface/IStoreMap} storages
 */
