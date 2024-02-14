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
 * @class Application/Env/query
 * @author Санников К.А.
 * @public
 */
export const query: PARAMS = {
    /**
     * @cfg {Object} Извлеченные HASH параметры
     * @name Application/Env/query#hash
     */
    get hash(): Record<string, string> {
        return parseQueryHash(location.href);
    },
    /**
     * @cfg {Object} Извлеченные GET параметры
     * @name Application/Env/query#get
     */
    get get(): Record<string, string> {
        return parseQueryGet(location.href);
    },
};

/**
 * Объект для работы с hash строкой вида #hash1=value1&hash2=value2
 * @class Application/Env/hash
 * @author Мустафин Л.И.
 * @public
 */
export const hash = {
    /**
     * Получить все значения hash в виде объекта или значение одного ключа
     * @name Application/Env/hash#get
     * @param key если указан ключ, то вернет значение этого ключа
     */
    get(key?: string): Record<string, string> | string {
        const hashObj: {} = query.hash;
        if (key) {
            return hashObj[key];
        }
        return hashObj;
    },

    /**
     * Добавить/изменить значение для указанного ключа
     * @name Application/Env/hash#set
     */
    set(key: string, value: string): void {
        const hashObj: {} = query.hash;
        hashObj[key] = value;
        location.hash = getHashString(hashObj);
    },

    /**
     * Удалить значение по указанному ключу или несколько значений по списку ключей
     * @name Application/Env/hash#remove
     * @param keys если ключ строка, то удалит одно значение
     *             если ключ массив строк, то удалит все указанные значения
     */
    remove(keys: string | string[]): void {
        const hashObj: {} = query.hash;
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
