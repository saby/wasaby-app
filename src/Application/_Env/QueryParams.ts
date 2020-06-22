/// <amd-module name='Application/_Env/QueryParams' />

const KEY_VALUE_SEPARATOR = '=';
const HASH_SEPARATOR = '#';
const GET_SEPARATOR = '?';
const SEPARATOR = '&';
const ANY_SEPARATOR = new RegExp(`\\${GET_SEPARATOR}|\\${HASH_SEPARATOR}`);

/**
 * @cfg {String} query URL-Like строка, содержащая GET- и/или HASH- параметры
 * @name Application/_Env/QueryParams#query
 */

/**
 * Функция parseQueryHash получает URL-Like строку и возвращает все ивзлеченные HASH-параметры
 * @param {String} query URL-Like строка, содержащая HASH-параметры
 * @return {PARAMS_SET} Извлеченные параметры
 * @example
 * <pre>
 *  require(['Application/_Env/QueryParams'], function (QueryParams) {
 *      var getParams = QueryParams.parseQueryHash(window.location) // { name: 'ferret', color: 'purple' }
 *  });
 * </pre>
 */
export const parseQueryHash = (query: string): PARAMS_SET => extractQuery(query, HASH_SEPARATOR);
/**
 * Функция parseQueryHash получает URL-Like строку и возвращает все ивзлеченные GET-параметры
 * @param {String} query URL-Like строка, содержащая GET-параметры
 * @return {PARAMS_SET} Извлеченные параметры
 * @example
 * <pre>
 *  require(['Application/_Env/QueryParams'], function (QueryParams) {
 *      var hashParams = QueryParams.parseQueryGet(window.location) // { name: 'leha', age: '2' }
 *  });
 * </pre>
 */
export const parseQueryGet = (query: string): PARAMS_SET => extractQuery(query, GET_SEPARATOR);

/**
 * Извлекает параметры всех типов
 * @param {String} query Строка с get и hash параметрами
 * @returns {Object} 
 */
export function extractQuery(query: string, param: string): PARAMS_SET {
    if (query.indexOf(param) === -1) {
        return Object.create(null);
    }
    const queryParams = query.substr(query.indexOf(param) + 1);
    const end = queryParams.search(ANY_SEPARATOR);
    return extractParams(queryParams.substring(0, (end !== -1) ? end : void 0));
}

/**
 * Извлекает параметры из строки
 * @param {String} str Строка get/hash параметров, разделенных &
 * @returns {PARAMS_SET} Словарь параметров
 */
export function extractParams(str: string): PARAMS_SET {
    return str
        .split(SEPARATOR)
        .reduce((params, couple) => {
            if (!couple) { return params; }
            const [key, value] = couple.split(KEY_VALUE_SEPARATOR);
            params[key] = value;
            return params;
        }, Object.create(null));
}

/**
 * @typedef {Object} PARAMS
 * @property {PARAMS_SET} get Словарь GET параметров
 * @property {PARAMS_SET} hash Словарь HASH параметров
 */
export type PARAMS = { [param_type in PARAM_TYPE]: PARAMS_SET };

/**
 * @typedef {String} PARAM_TYPE
 * @variant hash HASH параметры строки
 * @variant get GET параметры строки
 */
type PARAM_TYPE = 'hash' | 'get';

/**
 * Словарь параметров, ключом является имя параметра, значением - значение параметра
 * @typedef {Object} PARAMS_SET
 * @property {String} param_name значение параметра
 */
type PARAMS_SET = { [param_name: string]: string }
