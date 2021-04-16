/// <amd-module name="Application/_Env/Cache" />
import Memoize from 'Application/_Env/memoize';
import { IMemoize } from 'Application/_Interface/IMemoize';

/**
 * Класс реализующий методы для кэширования куки
 * @author Новолокова Н.О.
 */
export class CacheCookie {
    // оригинал кэшируемой функции, для поиска в массиве
    cacheFn: Function;
    memoize: IMemoize;
    functionGet;
    constructor() {
        this.memoize = new Memoize();
    }
    /**
     * Подготовка к кэшированию функции запроса
     * @param name Имя запрашиваемой куки
     * @param funcGet Функция запроса
     * @returns Значение запрашиваемой куки
     */
    prepare(name: string, funcGet: Function): String {
        if (!this.functionGet || this.functionGet === 'undefined') {
            this.functionGet = funcGet;
            // @ts-ignore
            this.getCookie = this.memoize.add(this.getCookie);

        }
        return this.getCookie(name);
    }
    /**
     * Получить значение куки
     * @param nameCookie Имя куки
     * @returns Значение куки
     */
    getCookie(nameCookie: string): string {
        return this.functionGet(nameCookie);
    }

    /**
     * Обновить значение куки в кэше
     * @param key Имя куки
     * @param value Новое значение куки
     */
    refresh(key: string, value: string): void {
        this.memoize.refresh(this.cacheFn, key, value)
    }

    /**
     * Удалить куку из кэша
     * @param key Имя удаляемой куки
     */
    remove(key: string): void {
        this.memoize.remove(this.cacheFn, key);
    }
}
