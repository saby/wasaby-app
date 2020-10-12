/// <amd-module name="Application/Page" />
import { Head } from 'Application/_Page/Head';
import { logger } from 'Application/Env';

/**
 * Библиотека управления страницей. Например, ее заголовок, список загруженных ресурсов или og описание
 *
 * @library Application/Page
 * @public
 * @includes Head Application/_Page/Head
 * @author Печеркин С.В.
 */
export { Head };

/**
 * Добавление ресурсов, которые необходимо вставить в head как <link rel="prefetch"/>
 * @param modules
 * @public
 */
export function addPrefetchModules(modules: string[]): void {
    _addHeadLinks(modules, {prefetch: true});
}

/**
 * Добавление ресурсов, которые необходимо вставить в head как <link rel="preload"/>
 * @param modules
 * @public
 */
export function addPreloadModules(modules: string[]): void {
    _addHeadLinks(modules, {preload: true});
}

/**
 * Добавление ресурсов, которые необходимо вставить в head как <link rel="prefetch"/> или <link rel="preload"/>
 * @param modules
 * @param cfg
 * @private
 */
function _addHeadLinks(modules: string[], cfg: IHeadLinks): void {
    if (!modules?.length) {
        return;
    }

    // TODO получить абсолютные ссылки для указанных модулей методом Мальцева А
    const absPrefetchLinks = modules;

    const API = Head.getInstance();
    absPrefetchLinks.forEach((path) => {
        const _type = _getTypeString(path);
        if (!_type) {
            logger.warn(`[Application/Page.ts] Для файла ${path} не удалось получить строку-тип`);
            return;
        }

        let rel: string = cfg?.preload ? 'preload' : 'prefetch';
        API.createTag('link', {rel, as: _type, href: path});
    });
}

interface IHeadLinks {
    prefetch?: boolean;
    preload?: boolean;
}

/**
 * Получить строку-тип ресурса по его расширению
 * @param path
 * @private
 */
function _getTypeString(path: string): string {
    const types = {
        'script': new RegExp('\.js'),
        'fetch': new RegExp('\.wml'),
        'style': new RegExp('\.css')
    };
    for (let _type in types) {
        if(types.hasOwnProperty(_type) && types[_type].test(path)) {
            return _type;
        }
    }
    return null;
}
