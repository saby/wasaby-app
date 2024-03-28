import App from './App';
import type { ILocation } from './Interfaces';

/**
 * Реализация {@link Application/Env/ILocation} — обобщенного window.location.
 * @class Application/Env/location
 * @implements Application/Env/ILocation
 * @see Application/Env/ILocation
 * @author Санников К.А.
 * @public
 */
export const location: ILocation = {
    get protocol(): string {
        return App.getRequest().location.protocol;
    },

    get host(): string {
        return App.getRequest().location.host;
    },

    get hostname(): string {
        return App.getRequest().location.hostname;
    },

    get port(): string {
        return App.getRequest().location.port;
    },

    get href(): string {
        return App.getRequest().location.href;
    },

    set href(href: string) {
        App.getRequest().location.href = href;
    },

    get pathname(): string {
        return App.getRequest().location.pathname;
    },

    get search(): string {
        return App.getRequest().location.search;
    },

    get hash(): string {
        return App.getRequest().location.hash;
    },

    set hash(value: string) {
        App.getRequest().location.hash = value;
    },

    replace: (url: string): void => {
        App.getRequest().location.replace(url);
    },
};
