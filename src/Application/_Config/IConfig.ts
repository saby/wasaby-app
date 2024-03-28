type IData = Record<string, any>;
/**
 * Интерфейс IConfig
 * @public
 * @author Санников К.А.
 */
export interface IConfig {
    /**
     * get
     * @param {String} key
     */
    get(key: keyof IData): IData[keyof IData];
}
