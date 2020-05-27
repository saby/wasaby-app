/// <amd-module name="Application/_Config/Config" />
import { ISerializableState } from "Application/_Interface/ISerializableState";
type IData = Record<string, any>;
/**
 * Класс Config
 * @class Application/_Config/Config
 * @public
 * @implements Application/_Interface/ISerializableState
 * @author Санников К.А.
 */
export default class Config implements ISerializableState {
    constructor (private data: IData = {}, private __uid: string = 'appConfig') {
    }
    /**
     * Получить данные по ключу
     * @param {String} key
     * @return {Native}
     */
    get(key: keyof IData): IData[keyof IData] {
        return this.data[key];
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
    setState(data: IData) {
        if (!data) {
            return;
        }
        this.data = data;
    }
    /**
     * Получить UID
     * @return {String}
     */
    getUID() {
        return this.__uid;
    }
}
