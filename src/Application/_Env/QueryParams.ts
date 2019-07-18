/// <amd-module name='Application/_Env/QueryParams' />

const KEY_VALUE_SEPARATOR = '=';
const HASH_SEPARATOR = '#';
const GET_SEPARATOR = '?';
const SEPARATOR = '&';
const ANY_SEPARATOR = new RegExp(`\\${GET_SEPARATOR}|\\${HASH_SEPARATOR}`);
const QUERY_PARAMS = [GET_SEPARATOR, HASH_SEPARATOR];

/**
 * @cfg {String} query URL-Like строка, содержащая GET- и/или HASH- параметры
 * @name Application/_Env/QueryParams#query
 */

/**
 * Функция parseQuery получает URL-Like строку и возвращает все ивзлеченные GET и HASH параметры
 * @param {String} query URL-Like строка, содержащая GET- и/или HASH- параметры
 * @return {PARAMS} Извлеченные параметры
 * @public
 * @author Ибрагимов А.А
 * @example
 * <pre>
 *  require(['Application/Env'], function (Env) {
 *      var params = Env.parseQuery('http://example.com/path#name=leha&age=2?name=ferret&color=purple');
 *      params.get  // { name: 'ferret', color: 'purple' }
 *      params.hash // { name: 'leha', age: '2' }
 *  });
 * </pre>
 */
export function parseQuery(query: string): PARAMS {
    const params = extractAllParams(query);
    return {
        hash: params[HASH_SEPARATOR],
        get: params[GET_SEPARATOR],
    }
}

/**
 * Извлекает параметры всех типов
 * @param {String} query Строка с get и hash параметрами
 * @returns {Object} 
 */
export function extractAllParams(query: string): PARAMS {
    return QUERY_PARAMS.reduce((params, param) => {
        if (!query.includes(param)) {
            params[param] = Object.create(null);
            return params;
        }
        const queryParams = query.substr(query.indexOf(param) + 1);
        const end = queryParams.search(ANY_SEPARATOR);
        params[param] = extractParams(queryParams.substring(0, (end !== -1) ? end : void 0));
        return params;
    }, Object.create(null));
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
 * @typedef {Object} PARAMS
 * @property {String} param_name значение параметра
 */
type PARAMS_SET = { [param_name: string]: string }
