/// <amd-module name="Application/_Env/Cache" />
import { Memoize } from 'Application/_Env/memoize';

/**
 * Класс реализующий методы для кэширования куки
 * @author Новолокова Н.О.
 */
export class CacheCookie {
    // Оригинал кэшируемой функции, сохраняю для поиска в массиве
    functionGet: Function;
    memoize: any;
     constructor(funcGet: Function) {
         this.functionGet = funcGet;
         this.memoize = new Memoize();
         this.get = this.memoize.add(this.functionGet);
     }

    /**
     * Кэшированию функции запроса
     * @param key Ключ запрашиваемой куки
     * @param funcGet Функция запроса
     */
    get(key: string): string |null {
        return this.functionGet(key);
    }

    /**
     * Очистить кэш
     * @param key Ключ очищаемой куки, если не передан, то очищается весь кэш функции
     */
    clear(key?: string): void {
        this.memoize.clear(this.functionGet, key);
    }
}
