/// <amd-module name="Application/_Interface/IConfig" />
import { Native } from 'Application/_Type';

/**
 * Интерфейс IConfig
 * @interface Application/_Interface/IConfig
 * @public
 * @author Санников К.А.
 */
export interface IConfig {
    /**
     * get
     * @function
     * @name Application/Interface/IConfig#get
     * @param {String} key
     * @return {Native}
     */
    get(key: string): Native
}