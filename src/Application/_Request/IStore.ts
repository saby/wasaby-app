/**
 * Описание интерфейса компонента, для работы неким Storage.
 * Необходим для того что бы создавать хранилище на клиенте и на сервисе представления.
 * @public
 * @author Санников К.А.
 * @see Application/_Request/IStore/IStoreMap
 */
export interface IStore<T = Record<string, string>> {
    get: <K extends keyof T & string>(key: K) => T[K] | null;
    set: <K extends keyof T & string>(key: K, value: T[K]) => boolean;
    remove(key: keyof T): void;
    getKeys(): (keyof T & string)[];
    toObject(): { [key in keyof T]: T[key] };
}
/**
 * Получить значение поля по ключу
 * @function
 * @name  Application/_Request/IStore#get
 * @param {String} key Ключ
 * @return {<[T=string]>|null}
 */
/**
 * Задать значение полю по ключу
 * @function
 * @name  Application/_Request/IStore#set
 * @param {String} key Ключ
 * @return {Boolean} Успех операции
 */
/**
 * Удалить поле по ключу
 * @function
 * @name  Application/_Request/IStore#remove
 * @param {String} key Ключ
 */
/**
 * Получить все ключи
 * @function
 * @name  Application/_Request/IStore#getKeys
 * @return {String[]}
 */
/**
 * Преобразовать в объект
 * @function
 * @name  Application/_Request/IStore#toObject
 * @return {[key: string]: string}
 */

/**
 * Функциональный интерфейс IStoreMap
 * @remark
 * Описывает функцию, возвращающую хранилище по имени:
 * <pre>
 * [propName: string]: IStore;
 * </pre>
 * @private
 * @name Application/_Request/IStore/IStoreMap
 */
export interface IStoreMap {
    [propName: string]: IStore<any>;
}
