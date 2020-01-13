/// <amd-module name="Application/_Env/ObjectStore" />
import { IStore } from 'Application/_Interface/IStore';

export default class ObjectStore<T = string> implements IStore<T> {
    private __data = {};

    get(key: string) {
        return this.__data[key];
    }

    set(key: string, value: T) {
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
