import type { ISerializableState } from 'Application/_State/Interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IData = Record<string, any>;

/**
 * Класс Config
 * @class Application/_Config/Config
 * @public
 * @implements Application/_State/ISerializableState
 * @author Санников К.А.
 */
export default class Config implements ISerializableState {
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-denylist, id-match
    constructor(
        private data: IData = {},
        private __uid: string = 'appConfig'
    ) {}

    /**
     * Получить данные по ключу
     * @param {String} key
     * @return {Native}
     */
    get(key: keyof IData): IData[keyof IData] {
        return this.data[key];
    }

    /**
     * Добавить/установить значение по ключу
     * @param {String} key
     * @param {String} value
     * @return {Native}
     */
    set(key: keyof IData, value: any): void {
        return (this.data[key] = value);
    }
    /**
     * Получить состояние
     * @return {IData}
     */
    getState(): IData {
        return this.data;
    }

    /**
     * Задать состояние
     * @param {IData} data
     */
    setState(data: IData): void {
        if (!data) {
            return;
        }
        this.data = data;
    }

    /**
     * Получить UID
     * @return {String}
     */
    getUID(): string {
        return this.__uid;
    }
}
