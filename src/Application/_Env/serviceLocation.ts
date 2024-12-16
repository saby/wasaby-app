import App from './App';
import type { ILocation } from './Interfaces';
import { location } from './Location';

const isClientSide = typeof window !== 'undefined';

/**
 * Реализация window.location на СП учитывающий работу на стороннем сервисе.
 * Для методов `href` и `pathname`
 * @public
 */
export const serviceLocation: ILocation = {
    get protocol(): string {
        return location.protocol;
    },

    get host(): string {
        return location.host;
    },

    get hostname(): string {
        return location.hostname;
    },

    get port(): string {
        return location.port;
    },

    // на СП находясь на стороннем сервисе /service-name href вида https://sbis.ru/page/main
    // превратит в https://sbis.ru/service-name/page/main
    get href(): string {
        if (isClientSide) {
            return location.href;
        }
        const path = withServiceName(location.pathname);
        return `${location.protocol}//${location.hostname}${path}${location.search}`;
    },

    set href(href: string) {
        location.href = href;
    },

    // на СП находясь на стороннем сервисе /service-name pathname вида /page/main
    // превратит в /service-name/page/main
    get pathname(): string {
        if (isClientSide) {
            return location.pathname;
        }
        return withServiceName(location.pathname);
    },

    get search(): string {
        return location.search;
    },

    get hash(): string {
        return location.hash;
    },

    set hash(value: string) {
        location.hash = value;
    },

    replace: (url: string): void => {
        location.replace(url);
    },
};

/**
 * Получить url с названием сервиса в начале
 */
function withServiceName(path: string) {
    let baseUrl = App.getRequest().getConfig().get('appRoot');
    if (!baseUrl || baseUrl === '/') {
        return path;
    }
    baseUrl = baseUrl.replace(/\//g, '');
    return `/${baseUrl}/${path.replace(/^\//, '')}`;
}
