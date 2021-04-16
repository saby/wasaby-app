/// <amd-module name='Application/_Env/memoize' />
import { IMemoize } from 'Application/_Interface/IMemoize';
/**
 * Модуль кэширования функции.
 * @author Новолокова Н.О.
 */

const storage = new WeakMap();
class Memoize implements IMemoize {
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

    refresh(original: Function, key: string, value: string): void {
        if (storage.has(original)) {
            storage.get(original)[key] = value;
        }
    }

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
