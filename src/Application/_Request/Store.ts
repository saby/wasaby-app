/// <amd-module name="Application/_Request/Store" />
import { IStore } from "Application/_Interface/IStore";

/**
 * Класс, реализующий интерфейс {@link Application/_Interface/IStore},
 * предназначенный для работы с localStorage и SessionStorage
 * @class Application/_Request/Store
 * @implements Application/_Interface/IStore
 * @author Санников К.А.
 */
export default class Store<T = Record<string, string>> implements IStore<T> {
    private __storage: Storage;
    constructor (storageType: Storage) {
        this.__storage = storageType;
    }
    get<K extends keyof T & string>(key: K): T[K] {
        try {
            return (<T[K]> <unknown> this.__storage.getItem(key));
        } catch (err) {
            // ignore
        }
    }
    set<K extends keyof T & string>(key: K, data: T[K]) {
        try {
            this.__storage.setItem(key, data.toString());
            return true;
        } catch (err) {
            // ignore
            return false;
        }
    }
    remove<K extends keyof T & string>(key: K) {
        try {
            this.__storage.removeItem(key);
        } catch (err) {
            // ignore
        }
    }
    getKeys() {
        try {
            return <(keyof T & string)[]> Object.keys(this.__storage);
        } catch (err) {
            return [];
        }
    }
    toObject() {
        try {
            return <{ [key in keyof T]: T[key] }> <unknown> { ...this.__storage };
        } catch (err) {
            return <{ [key in keyof T]: T[key] }> {};
        }
    }
}
