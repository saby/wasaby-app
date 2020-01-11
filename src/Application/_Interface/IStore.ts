/// <amd-module name="Application/_Interface/IStore" />

/**
 * Описание интерфейса компонента, для работы неким Storage.
 * Необходим для того что бы создавать хранилище на клиенте и на сервисе представления.
 * @interface Application/_Interface/IStore
 * @public
 * @author Санников К.А.
 * @see Application/Interface/IStore/IStoreMap
 */
export interface IStore<T = string, Data = Record<string, T>> {
    get: <K extends keyof Data>(key: K) => Data[K] | never;
    set: <K extends keyof Data>(key: K, value: Data[K]) => boolean;
    remove(key: keyof Data): void;
    getKeys(): (keyof Data)[];
    toObject(): { [key in keyof Data]: T };
};
/**
 * Получить значение поля по ключу
 * @function
 * @name  Application/_Interface/IStore#get
 * @param {String} key Ключ
 * @return {<[T=string]>|null}
 */
/**
 * Задать значение полю по ключу
 * @function
 * @name  Application/_Interface/IStore#set
 * @param {String} key Ключ
 * @return {Boolean} Успех операции
 */
/**
 * Удалить поле по ключу
 * @function
 * @name  Application/_Interface/IStore#remove
 * @param {String} key Ключ
 */
/**
 * Получить все ключи
 * @function
 * @name  Application/_Interface/IStore#getKeys
 * @return {String[]}
 */
/**
 * Преобразовать в объект
 * @function
 * @name  Application/_Interface/IStore#toObject
 * @return {[key: string]: string}
 */

/**
 * Функциональный интерфейс IStoreMap
 * @remark
 * Описывает функцию, возвращающую хранилище по имени:
 * <pre>
 * [propName: string]: IStore;
 * </pre>
 * @interface
 * @name Application/Interface/IStore/IStoreMap
 */
export interface IStoreMap {
    [propName: string]: IStore<any>;
}
