/**
 * Тип данные
 */
export type IData = Record<string, any>;

/**
 * Интерфейс IConfig
 * @public
 * @author Санников К.А.
 */
export interface IConfig {
    /**
     *
     */
    get(key: keyof IData): IData[keyof IData];
}
