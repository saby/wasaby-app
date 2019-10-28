/// <amd-module name="Application/_Interface/IConfig" />
import { Native } from 'Application/_Type';

/**
 * @interface Application/_Interface/IConfig
 * @public
 * @author Санников К.А.
 */
export interface IConfig {
    get(key: string): Native
}
/**
 * @function
 * @name Application/_Interface/IConfig#get
 * @param {String} key
 * @return {Native}
 */
