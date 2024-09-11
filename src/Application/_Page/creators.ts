import { Head as HeadAPI } from 'Application/_Page/Head';
import type {
    IPageTagId,
    TFaviconAttrs,
    THttpEquivAttrs,
    TScriptAttrs,
} from 'Application/_Page/_pageTagAPI/Interface';

/**
 * Обёртки над Head API, которые облегчают работу с Head API.
 * Как правило, в функции-обёртке,
 * вначале пробрасываются важные атрибуты в виде строки в отдельных аргументах.
 * Другие специфические аттрибуты пробрасываются опционально в аргументе attrs единым объектом.
 * @author Хамбелов М.И.
 */

/**
 * Создание title
 * @param title
 */
export function createTitle(title: string): IPageTagId {
    return HeadAPI.getInstance().createTag('title', {}, title);
}

/**
 * Создание микроразметки
 * @param microdata данные в виде строки, что содержатся внутри тега
 */
export function createMicroData(microdata: string): IPageTagId {
    return HeadAPI.getInstance().createTag('script', { type: 'application/ld+json' }, microdata);
}

/**
 * Создание мета-тега viewport
 * @param content аттрибут тега viewport
 */
export function createViewPort(content: string): IPageTagId {
    return HeadAPI.getInstance().createTag('meta', {
        name: 'viewport',
        content,
    });
}

/**
 * Создание стилей
 * @param href путь в виде строки
 */
export function createCSS(href: string): IPageTagId {
    return HeadAPI.getInstance().createTag('link', {
        rel: 'stylesheet',
        type: 'text/css',
        href,
    });
}

/**
 * Создание шрифтов
 * @param href путь в виде строки
 * @remark
 * Аттрибут type определится автоматически из аргумента href.
 * Для этого в href должен содержаться в конце строки формат.
 */
export function createFont(href: string): IPageTagId {
    let type = 'font';
    /** определим формат шрифтов из href */
    const extension = href.match(/\.[0-9a-z]+$/i);
    if (extension) {
        /**
         * если формат найден - он найден вида ".woff2", заменим тогда точку на слэш,
         * т.к. в аттрибут type должен попасть значение вида font/woff2
         */
        type += extension[0].replace('.', '/');
    }
    return HeadAPI.getInstance().createTag('link', {
        rel: 'preload',
        as: 'font',
        type,
        href,
    });
}

/**
 * Создание тега script
 * @param src путь в виде строки
 * @param attrs{TScriptAttrs} дополнительные аттрибуты в виде объекта
 */
export function createScript(src: string, attrs: TScriptAttrs = {}): IPageTagId {
    return HeadAPI.getInstance().createTag('script', {
        type: 'text/javascript',
        ...attrs,
        src,
    });
}

/**
 * Создание favicon
 * @param href путь в виде строки
 * @param attrs{TFaviconAttrs} дополнительные аттрибуты в виде объекта
 */
export function createFavicon(href: string, attrs: TFaviconAttrs = {}): IPageTagId {
    return HeadAPI.getInstance().createTag('link', {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        ...attrs,
        href,
    });
}

/**
 * Создание мета-тега httpEquiv
 * @param httpEquiv
 * @param content
 * @param attrs{THttpEquivAttrs} дополнительные аттрибуты в виде объекта
 * @remark
 * Браузеры преобразовывают значение атрибута http-equiv, заданное с помощью content,
 * в формат заголовка ответа HTTP и обрабатывают их, как будто они прибыли непосредственно от сервера.
 * Мета-тег не может содержать аттрибуты http-equiv и name одновременно.
 */
export function createHttpEquiv(
    httpEquiv: string,
    content: string,
    attrs: THttpEquivAttrs = {}
): IPageTagId {
    return HeadAPI.getInstance().createTag('meta', {
        ...attrs,
        'http-equiv': httpEquiv,
        content,
    });
}
