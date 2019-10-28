/// <amd-module name="Application/_Interface/IEnv" />
import Config from 'Application/_Config/Config';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { ILocation } from 'Application/_Interface/ILocation';
import { IRequest } from 'Application/_Interface/IRequest';
import { IStoreMap } from 'Application/_Interface/IStore';

/**
 * @interface Application/_Interface/IEnv
 * @public
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
 * @name Application/_Interface/IEnv#console
 * @cfg {IConsole} console
 */
/**
 * @name Application/_Interface/IEnv#cookie
 * @cfg {IConsole} cookie
 */
/**
 * @name Application/_Interface/IEnv#location
 * @cfg {IConsole} location
 */
/**
 * @name Application/_Interface/IEnv#storages
 * @cfg {IConsole} storages
 */
/**
 * @function
 * @name Application/_Interface/IEnv#getGlobal
 * @return {IRequest | undefined}
 */

/**
 * @interface Application/_Interface/IEnvFactory
 * @public
 * @author Санников К.А.
 */
export interface IEnvFactory {
    create(config: Config): IEnv
}
/**
 * @function
 * @name Application/_Interface/IEnvFactory#create
 * @param {Config} config
 * @return {IEnv}
 */
