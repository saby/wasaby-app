/// <amd-module name='Application/_utils/memoize' />
/**
 * Модуль кэширования функции.
 * @author Новолокова Н.О.
 */

const storage = new WeakMap();
class Memoize {
    /**
     *  Возвращает функцию, запоминающую результат первого вызова оборачиваемого метода объекта.
     *  При повторных вызовах возвращает единожды вычисленный результат.
     * @param original {Function} Кэшируемая функция
     * @returns Результат выполнения функции
     */
    add(original: Function): Function {
        return function (...args) {
            let cache = {};
            const key = JSON.stringify(args);
            storage.has(original) ? cache = storage.get(original) : storage.set(original, cache);
            if (!cache.hasOwnProperty(key)) {
                cache[key] = original.apply(this, args);
            }
            return cache[key];
        };
    }

    /**
     * Уничтожает кэшированные данные переданной функции
     * @param original {Function} Кэшируемая функция
     */
    clear(original: Function): void {
        if (storage.has(original)) {
            const cache = storage.get(original);
            Object.keys(cache).forEach(element => {
                if (cache.hasOwnProperty(element)) {
                    delete cache[element];
                }
            });
            storage.delete(original);
        }
    }

    /**
     * Обновляет данные в кэше
     * @param original {Function} Кэшируемая функция
     * @param key {string} Ключ изменяемой записи
     * @param value {string} Новое значение
     */
    refresh(original: Function, key: string, value: string): void {
        if (storage.has(original)) {
            storage.get(original)[key] = value;
        }
    }
    /**
     * Удаляет значение из заданной кэшируемой функции
     * @param original {Function} Кэшируемая функция
     * @param key {string} Ключ удаляемой записи
     */
    remove(original: Function, key: string): void {
        if (storage.has(original)) {
            const cache = storage.get(original);
            if (cache.hasOwnProperty(key)) {
                delete cache[key];
            }
        }
    }
}

export default Memoize;
