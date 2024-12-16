import { location } from '../Location';
import { PARAMS, parseQueryGet, parseQueryHash } from './QueryParams';

/**
 * Возвращает все GET и HASH параметры.
 * @example
 * <pre class="brush: js">
 *  require(['Application/Env'], function (Env) {
 *      var getParams = Env.query.get    // { name: 'ferret', color: 'purple' }
 *      var hashParams = Env.query.hash  // { name: 'leha', age: '2' }
 *  });
 * </pre>
 * @author Санников К.А.
 * @public
 */
export const query: PARAMS = {
    /**
     * Извлеченные HASH параметры
     */
    get hash(): Record<string, string> {
        return parseQueryHash(location.href);
    },
    /**
     * Извлеченные GET параметры
     */
    get get(): Record<string, string> {
        return parseQueryGet(location.href);
    },
};

/**
 * Объект для работы с hash строкой вида #hash1=value1&hash2=value2
 * @author Мустафин Л.И.
 * @public
 */
export const hash = {
    /**
     * Получить все значения hash в виде объекта или значение одного ключа
     * @param key если указан ключ, то вернет значение этого ключа
     */
    get(key?: string): Record<string, string> | string {
        const hashObj: Record<string, string> = query.hash;
        if (key) {
            return hashObj[key];
        }
        return hashObj;
    },

    /**
     * Добавить/изменить значение для указанного ключа
     */
    set(key: string, value: string): void {
        const hashObj: Record<string, string> = query.hash;
        hashObj[key] = value;
        location.hash = getHashString(hashObj);
    },

    /**
     * Удалить значение по указанному ключу или несколько значений по списку ключей
     * @param keys если ключ строка, то удалит одно значение
     *             если ключ массив строк, то удалит все указанные значения
     */
    remove(keys: string | string[]): void {
        const hashObj: Record<string, string> = query.hash;
        if (typeof keys === 'string') {
            delete hashObj[keys];
        } else {
            for (const key of keys) {
                delete hashObj[key];
            }
        }
        location.hash = getHashString(hashObj);
    },
};

function getHashString(value: Record<string, string>): string {
    return Object.entries(value)
        .map((v) => `${v[0]}=${v[1]}`)
        .join('&');
}
