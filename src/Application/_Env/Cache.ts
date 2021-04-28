/// <amd-module name="Application/_Env/Cache" />
import { Memoize } from 'Application/State';

/**
 * Класс реализующий методы для кэширования куки
 * @author Новолокова Н.О.
 */
export class CacheCookie {
    // Оригинал кэшируемой функции, сохраняю для поиска в массиве
    functionGet: Function;

    /* Возвращает запрашиваемую куку, мемизируемая функция.
       @param key - Ключ запрашиваемой куки
    */
    get: Function;

    // Переменная для функции мемомизации
    memoize: any;

    // Признак установки переменной для хранилища кэша
    isFirstLoad: Boolean = true;
    constructor(funcGet: Function, getStorage: Function) {
        this.functionGet = funcGet;
        this.memoize = new Memoize(getStorage);
        this.get = this.memoize.add(this.functionGet);
    }

    /**
     * Очистить кэш
     * @param key Ключ очищаемой куки, если не передан, то очищается весь кэш функции
     */
    clear(key?: string): void {
        this.memoize.clear(this.functionGet, key);
    }
}
