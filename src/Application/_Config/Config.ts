/// <amd-module name="Application/_Config/Config" />
import { ISerializableState } from "Application/_Interface/ISerializableState";
import { HashMap, Native } from 'Application/_Type';

/**
 * Класс Config
 * @class Application/_Config/Config
 * @public
 * @implements Application/_Interface/ISerializableState
 * @author Санников К.А.
 */
export default class Config implements ISerializableState {
    constructor(private data: HashMap<Native> = {}, private __uid: string = 'appConfig') {
    }
    /**
     * Получить данные по ключу
     * @param {String} key
     * @return {Native}
     */
    get(key: string): Native {
        return this.data[key];
    }
    /**
     * Получить состояние
     * @return {HashMap<Native>}
     */
    getState(): HashMap<Native> {
        return this.data;
    }
    /**
     * Задать состояние
     * @param {HashMap<Native>} data
     */
    setState(data: HashMap<Native>) {
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
