/// <amd-module name="Application/_Request/Store" />
import { IStore } from "Application/_Interface/IStore";

/**
 * Класс, реализующий интерфейс {@link Application/Interface/IStore/IStore},
 * предназначенный для работы с localStorage и SessionStorage
 * @class Application/_Request/Store
 * @implements Application/Interface/IStore/IStore
 * @author Санников К.А.
 */
export default class Store implements IStore {
    private __storage: Storage;
    constructor(storageType: Storage) {
        this.__storage = storageType;
    }
    /**
     * @param {String} key
     * @return {*} Данные
     */
    get(key: string) {
        try {
            return this.__storage.getItem(key);
        } catch (err) {
            // ignore
        }
    }
    /**
     * @param {String} key
     * @param {String} data
     * @return {Boolean} Успех операции
     */
    set(key: string, data: string) {
        try {
            this.__storage.setItem(key, data);
            return true;
        } catch (err) {
            // ignore
            return false;
        }
    }
    /**
     * @param {String} key
     */
    remove(key: string) {
        try {
            this.__storage.removeItem(key);
        } catch (err) {
            // ignore
        }
    }
    /**
     * @return {*}
     */
    getKeys() {
        try {
            return Object.keys(this.__storage);
        } catch (err) {
            return []
        }
    }
    /**
     * @return {Object}
     */
    toObject() {
        try {
            return {
                ...this.__storage
            }
        } catch (err) {
            return {}
        }
    }
}
