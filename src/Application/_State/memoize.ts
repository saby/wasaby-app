/// <amd-module name='Application/_State/memoize' />
/**
 * Модуль кэширования функции.
 * @author Новолокова Н.О.
 */

export class Memoize {
    storage: any;
    setStorage: Function
    /**
     * Возвращает функцию, запоминающую результат первого вызова оборачиваемого метода объекта.
     * При повторных вызовах возвращает единожды вычисленный результат.
     * @param original {Function} Кэшируемая функция
     * @returns Результат выполнения функции
     */
    constructor(setStorage: Function) {
        this.setStorage = setStorage;
    }

    add(original: any): Function | any {
        if (!this.storage) {
            this.storage = this.setStorage();
        }
        const storage = this.storage;
        return function (...args) {
            let cache = {};
            const key = args.toString();
            storage?.has(original) ? cache = storage.get(original) : storage?.set(original, cache);
            if (!cache.hasOwnProperty(key)) {
                cache[key] = original.apply(this, args);
            }
            return cache[key];
        };
    }

    /**
     * Очищает кэш переданной функции, если передали ключ, то очищает значение ключа
     * @param original {Function} Кэшируемая функция
     * @param key {string} Ключ удаляемой записи
     */
    clear(original: Function, key?: string): void {
        if (this.storage?.has(original)) {
            const cache = this.storage.get(original);
            if (key) {
                if (cache.hasOwnProperty(key)) {
                    delete cache[key];
                }
            } else {
                Object.keys(cache).forEach(element => {
                    if (cache.hasOwnProperty(element)) {
                        delete cache[element];
                    }
                });
                this.storage.delete(original);
            }
        }
    }
}
