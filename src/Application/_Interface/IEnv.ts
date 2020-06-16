/// <amd-module name="Application/_Interface/IEnv" />
import Config from 'Application/_Config/Config';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { ILocation } from 'Application/_Interface/ILocation';
import { IRequest, IRequestInternal } from 'Application/_Interface/IRequest';
import { IStoreMap } from 'Application/_Interface/IStore';
import { IConfig } from 'Application/_Interface/IConfig';

/**
 * Интерфейс IEnv
 * @interface Application/_Interface/IEnv
 * @public
 * @author Санников К.А.
 * @see Application/Interface/IEnv/IEnvFactory
 */
export interface IEnv {
    /** Инициализировать request при старте приложения */
    readonly initRequest: boolean;
    console: IConsole;
    cookie: ICookie;
    location: ILocation;
    storages: IStoreMap;
    getGlobal: () => { appRequest: IRequest | undefined; }; // удалить
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
/**
 * getGlobal
 * @function
 * @name Application/_Interface/IEnv#getGlobal
 * @return {IRequest|undefined}
 */

/**
 * Интерфейс IEnvFactory
 * @interface Application/Interface/IEnv/IEnvFactory
 * @author Санников К.А.
 */
export interface IEnvFactory {
    create(config: Config): IEnv;
     /** Создавать ли Request при инициализации приложения */
     initRequest: boolean;
}
/**
 * Создать IEnv
 * @function
 * @name Application/_Interface/IEnvFactory#create
 * @param {Application/_Config/Config} config
 * @return {IEnv}
 */
