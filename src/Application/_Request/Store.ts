/// <amd-module name="Application/_Request/Store" />
import type { IStore } from "Application/_Request/IStore";

/**
 * Класс, реализующий интерфейс {@link Application/_Request/IStore},
 * предназначенный для работы с localStorage и SessionStorage
 * @class Application/_Request/Store
 * @implements Application/_Request/IStore
 * @public
 * @author Санников К.А.
 */
export default class Store implements IStore {
    private __storage: Storage;
    constructor (storageType: Storage) {
        this.__storage = storageType;
    }
    get(key: string) {
        try {
            return this.__storage.getItem(key);
        } catch (err) {
            // ignore
        }
    }
    set(key: string, data: string) {
        try {
            this.__storage.setItem(key, data);
            return true;
        } catch (err) {
            // ignore
            return false;
        }
    }
    remove(key: string) {
        try {
            this.__storage.removeItem(key);
        } catch (err) {
            // ignore
        }
    }
    getKeys() {
        try {
            return Object.keys(this.__storage);
        } catch (err) {
            return [];
        }
    }
    toObject() {
        try {
            return { ...this.__storage };
        } catch (err) {
            return {};
        }
    }
}
