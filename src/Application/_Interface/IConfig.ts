/// <amd-module name="Application/_Interface/IConfig" />
type IData = Record<string, any>;
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
     */
    get(key: keyof IData): IData[keyof IData];
}
