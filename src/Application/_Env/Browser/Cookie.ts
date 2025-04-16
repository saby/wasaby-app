import type { ICookie, ICookieOptions } from 'Application/_Env/Interfaces';
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const NAME_REPLACE_REGEXP = /=.*/;
/** Разделитель между куками в documents.cookie */
const SEPARATOR = '; ';

/**
 * Класс предназначенный для работы с cookie в браузере,
 * @private
 * @author Санников К.А.
 */
export default class Cookie implements ICookie {
    private readonly isCoookieAvailable: boolean = checkCookie();
    constructor(private cacheCookie: Map<string, string> = new Map()) {
        if (!this.isCoookieAvailable) {
            throw new Error('document.cookie is not available');
        }
    }

    get(key: string): string | null {
        if (this.cacheCookie.has(key)) {
            return this.cacheCookie.get(key) as unknown as string | null;
        }
        const cookies = document.cookie.split(SEPARATOR);
        let foundValue = null;
        for (let i = 0; i < cookies.length; i++) {
            const item = String(cookies[i]).trim();
            const indexEqualSign = item.indexOf('=');
            const currentKey = item.slice(0, indexEqualSign);

            // в строке document.cookie будут все ключи даже для разных path, хотя знание про path может и не быть в строке с куками
            // например находясь на странице /page установили куку foo=1
            // потом перешли на страницу /page/some и установили куку foo=2
            // теперь в document.cookie будет лежать 2 значения foo: "foo=2; foo=1"
            // более подходящее для текущего location.href значение будет лежать вначале строки с куками
            // поэтому при заполнении кэша просто берем первое найденное значение.
            if (this.cacheCookie.has(currentKey)) {
                continue;
            }

            let currentValue;
            try {
                currentValue = decodeURIComponent(item.slice(indexEqualSign + 1));
            } catch (e) {
                continue;
            }
            this.cacheCookie.set(currentKey, currentValue);
            if (currentKey === key) {
                foundValue = currentValue;
            }
        }
        return foundValue as unknown as string | null;
    }

    set(key: string, value: string, options?: Partial<ICookieOptions>): boolean {
        let expires = '';
        options = options || {};
        if (value === null) {
            options.expires = -1;
        }
        if (options.expires) {
            let date: Date | void = void 0;
            if (typeof options.expires === 'number') {
                date = new Date();
                date.setTime(date.getTime() + options.expires * MS_IN_DAY);
                // @ts-ignore options.expires.toUTCString всегда true
            } else if (options.expires.toUTCString) {
                date = options.expires;
            } else {
                throw new TypeError('Option "expires" should be a Number or Date instance');
            }
            expires = `${SEPARATOR}expires=${date.toUTCString()}`;
        }
        const path = options.path ? `${SEPARATOR}path=${options.path}` : '';
        const domain = options.domain ? `${SEPARATOR}domain=${options.domain}` : '';
        const secure = options.secure ? `${SEPARATOR}secure` : '';
        try {
            document.cookie = [
                key,
                '=',
                encodeURIComponent(Object.is(value, null) ? '' : value),
                expires,
                path,
                domain,
                secure,
            ].join('');
            this.cacheCookie.set(key, value);
        } catch (e) {
            return false;
        }
        return true;
    }

    remove(key: string) {
        // @ts-ignore value строка, но есть проверка на null
        this.set(key, null);
        this.cacheCookie.delete(key);
    }

    clearCache(): void {
        this.cacheCookie.clear();
    }

    getKeys() {
        return document.cookie.split(SEPARATOR).map(function (cookie: string) {
            return cookie.replace(NAME_REPLACE_REGEXP, '');
        });
    }

    toObject() {
        const result: Record<string, string> = {};
        document.cookie.split(SEPARATOR).forEach(function (item: string) {
            const _a = item.split('=');
            const key = _a[0];
            const value = _a[1];
            result[key] = decodeURIComponent(value);
        });
        return result;
    }
}
/**
 * Проверка доступности кук
 * В случае, если куки заблокированы или код выполняется в VSCode.WebView выбрасывается исключение
 */
function checkCookie() {
    try {
        return typeof document.cookie === 'string';
    } catch (_) {
        return false;
    }
}
