type IData = Record<string, any>;
/**
 * Интерфейс IConfig
 * @interface Application/_Config/IConfig
 * @public
 * @author Санников К.А.
 */
export interface IConfig {
    /**
     * get
     * @function
     * @name Application/_Config/IConfig#get
     * @param {String} key
     */
    get(key: keyof IData): IData[keyof IData];
}
