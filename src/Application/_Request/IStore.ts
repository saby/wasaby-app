/**
 * Описание интерфейса компонента, для работы неким Storage.
 * Необходим для того что бы создавать хранилище на клиенте и на сервисе представления.
 * @public
 * @author Санников К.А.
 */
export interface IStore<T = Record<string, string>> {
    /**
     * Получить значение поля по ключу
     * @param key Ключ
     */
    get<K extends keyof T & string>(key: K): T[K] | null;
    /**
     * Задать значение полю по ключу
     * @param key Ключ
     * @return Успех операции
     */
    set<K extends keyof T & string>(key: K, value: T[K]): boolean;
    /**
     * Удалить поле по ключу
     * @param key Ключ
     */
    remove(key: keyof T): void;
    /**
     * Получить все ключи
     */
    getKeys(): (keyof T & string)[];
    /**
     * Преобразовать в объект
     */
    toObject(): { [key in keyof T]: T[key] };
}

/**
 * Функциональный интерфейс IStoreMap
 * @remark
 * Описывает функцию, возвращающую хранилище по имени:
 * <pre>
 * [propName: string]: IStore;
 * </pre>
 * @private
 */
export interface IStoreMap {
    [propName: string]: IStore<any>;
}
