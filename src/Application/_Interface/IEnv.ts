/// <amd-module name="Application/_Interface/IEnv" />
import Config from 'Application/_Config/Config';
import { IConsole } from 'Application/_Interface/IConsole';
import { ICookie } from 'Application/_Interface/ICookie';
import { ILocation } from 'Application/_Interface/ILocation';
import { IRequest } from 'Application/_Interface/IRequest';
import { IStoreMap } from 'Application/_Interface/IStore';

/**
 * @interface Application/Interface/IEnv
 * @public
 * @author Санников К.А.
 */
export interface IEnv {
    /**
     * @name Application/Interface/IEnv#console
     * @cfg {IConsole} console
     */
    console: IConsole
    /**
     * @name Application/Interface/IEnv#cookie
     * @cfg {IConsole} cookie
     */
    cookie: ICookie
    /**
     * @name Application/Interface/IEnv#location
     * @cfg {IConsole} location
     */
    location: ILocation
    /**
     * @name Application/Interface/IEnv#storages
     * @cfg {IConsole} storages
     */
    storages: IStoreMap
    /**
     * @return {IRequest | undefined}
     */
    getGlobal: () => { appRequest: IRequest | undefined }
}

/**
 * @interface Application/Interface/IEnvFactory
 * @public
 * @author Санников К.А.
 */
export interface IEnvFactory {
    /**
     * @param {Config} config
     * @return {IEnv}
     */
    create(config: Config): IEnv
}
