/// <amd-module name="Application/_Env/ObjectStore" />
import { IStore } from 'Application/_Interface/IStore';

export default class ObjectStore<T = Record<string, string>> implements IStore<T> {
    private __data: { [key in keyof T]: T[key] } = Object.create(null);

    get<K extends keyof T & string>(key: K) {
        return this.__data[key];
    }

    set<K extends keyof T & string>(key: K, value: T[K]) {
        this.__data[key] = value;
        return true;
    }

    remove<K extends keyof T & string>(key: K) {
        delete this.__data[key];
    }

    getKeys() {
        return <(keyof T & string)[]> Object.keys(this.__data);
    }

    toObject() {
        return this.__data;
    }
}
