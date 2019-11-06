/// <amd-module name="Application/_Interface/IStore" />

/**
 * Модуль с интерфейсами IStore и IStoreMap
 * @module
 * @name Application/_Interface/IStore
 * @author Санников К.А.
 */

/**
 * Описание интерфейса компонента, для работы неким Storage.
 * Необходим для того что бы создавать хранилище на клиенте и на сервисе представления.
 * @interface
 * @name Application/Interface/IStore/IStore
 */
export interface IStore < T = string >  {
    get(key: string): T | null;
    set(key: string, value: T): boolean;
    remove(key: string): void;
    getKeys(): string[];
    toObject(): {[key: string]: string};
}
/**
 * Интерфейс IStoreMap
 * @interface
 * @name Application/Interface/IStore/IStoreMap
 */
export interface IStoreMap {
    [propName: string]: IStore;
}
