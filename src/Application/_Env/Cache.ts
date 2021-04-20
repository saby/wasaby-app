/// <amd-module name="Application/_Env/Cache" />
import { memoize } from 'Application/_Env/memoize';

/**
 * Класс реализующий методы для кэширования куки
 * @author Новолокова Н.О.
 */
export class CacheCookie {
    // оригинал кэшируемой функции, для поиска в массиве
    functionGet;

    /**
     * Кэшированию функции запроса
     * @param key Ключ запрашиваемой куки
     * @param funcGet Функция запроса
     * @returns Значение запрашиваемой куки
     */
    get(key: string, funcGet: Function): string |null {
        if (!this.functionGet || this.functionGet === 'undefined') {
            this.functionGet = funcGet;
            // @ts-ignore
            this.getCookie = memoize.add(this.functionGet);
        }
        return this.getCookie(key);
    }

    /*
     * Получить значение куки
     * @param key Ключ запрашиваемой куки
     * @returns Значение куки
     */
    getCookie(key: string): string {
        return this.functionGet(key);
    }

    /**
     * Очистить кэш
     * @param key Ключ очищаемой куки, если не передан, то очищается весь кэш функции
     */
    clear(key?: string): void {
        memoize.clear(this.functionGet, key);
    }
}
