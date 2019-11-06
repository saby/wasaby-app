/// <amd-module name="Application/_Interface/IEnv" />
import Config from 'Application/_Config/Config';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { ILocation } from 'Application/_Interface/ILocation';
import { IRequest } from 'Application/_Interface/IRequest';
import { IStoreMap } from 'Application/_Interface/IStore';

/***
 * Модуль с интерфейсами {@link IEnv} и {@link IEnvFactory}
 * @module
 * @name Application/_Interface/IEnv
 * @author Санников К.А.
 */

/**
 * Интерфейс IEnv
 * @interface Application/Interface/IEnv/IEnv
 * @author Санников К.А.
 */
export interface IEnv {
    console: IConsole
    cookie: ICookie
    location: ILocation
    storages: IStoreMap
    getGlobal: () => { appRequest: IRequest | undefined }
}
/**
 * @name Application/Interface/IEnv/IEnv#console
 * @cfg {Application/Interface:IConsole} console
 */
/**
 * @name Application/Interface/IEnv/IEnv#cookie
 * @cfg {Application/Interface:IConsole} cookie
 */
/**
 * @name Application/Interface/IEnv/IEnv#location
 * @cfg {Application/Interface:IConsole} location
 */
/**
 * @name Application/Interface/IEnv/IEnv#storages
 * @cfg {Application/Interface:IConsole} storages
 */
/**
 * @function
 * @name Application/Interface/IEnv/IEnv#getGlobal
 * @return {IRequest|undefined}
 */

/**
 * Интерфейс IEnvFactory
 * @interface Application/Interface/IEnv/IEnvFactory
 * @author Санников К.А.
 */
export interface IEnvFactory {
    create(config: Config): IEnv
}
/**
 * @function
 * @name Application/Interface/IEnv/IEnvFactory#create
 * @param {Config} config
 * @return {IEnv}
 */
