/// <amd-module name="Application/_Interface/IStore" />

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
 * @interface
 * @name Application/Interface/IStore/IStoreMap
 */
export interface IStoreMap {
    [propName: string]: IStore;
}
