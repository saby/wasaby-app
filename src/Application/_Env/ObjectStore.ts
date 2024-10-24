import type { IStore } from 'Application/_Request/IStore';

export default class ObjectStore implements IStore {
    private __data: any = {};

    get(key: string) {
        return this.__data[key];
    }

    set(key: string, value: string) {
        this.__data[key] = value;
        return true;
    }

    remove(key: string) {
        delete this.__data[key];
    }

    getKeys() {
        return Object.keys(this.__data);
    }

    toObject() {
        return this.__data;
    }
}
