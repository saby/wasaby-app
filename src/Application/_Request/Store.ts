import type { IStore } from 'Application/_Request/IStore';

/**
 * Класс, предназначенный для работы с localStorage и SessionStorage
 * @public
 * @author Санников К.А.
 */
export default class Store implements IStore {
    // по умолчанию это Application/_Request/FakeWebStorage
    private __storage: Storage;
    constructor(storageType: Storage) {
        this.__storage = storageType;
    }
    get(key: string) {
        try {
            return this.__storage.getItem(key);
        } catch (err) {
            // ignore
            return null;
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
            if (this.__storage.getKeys) {
                return this.__storage.getKeys();
            }
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
