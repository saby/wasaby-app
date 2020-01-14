/// <amd-module name="Application/_Env/ObjectStore" />
import { IStore } from 'Application/_Interface/IStore';

export default class ObjectStore implements IStore {
    private __data = {};

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
