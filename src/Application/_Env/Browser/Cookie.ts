import type { ICookie, ICookieOptions } from 'Application/_Env/Interfaces';
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const NAME_REPLACE_REGEXP = /=.*/;
/** Разделитель между куками в documents.cookie */
const SEPARATOR = '; ';
/**
 * Класс предназначенный для работы с cookie в браузере,
 * @private
 * @name _Request/_Storage/Cookie
 * @implements Application/Env/ICookie
 * @implements Application/_Request/IStore
 * @author Санников К.А.
 */
export default class Cookie implements ICookie {
    private readonly isCoookieAvailable = checkCookie();
    constructor(private cacheCookie: Map<string, string> = new Map()) {
        if (!this.isCoookieAvailable) {
            throw new Error('document.cookie is not available');
        }
    }

    get(key: string) {
        if (this.cacheCookie.has(key)) {
            return this.cacheCookie.get(key);
        }
        const cookies = document.cookie.split(SEPARATOR);
        let foundValue = null;
        for (let i = 0; i < cookies.length; i++) {
            const item = String(cookies[i]).trim();
            const indexEqualSign = item.indexOf('=');
            const currentKey = item.slice(0, indexEqualSign);
            const currentValue = decodeURIComponent(
                item.slice(indexEqualSign + 1)
            );
            this.cacheCookie.set(currentKey, currentValue);
            if (currentKey === key) {
                foundValue = currentValue;
            }
        }
        return foundValue;
    }

    set(
        key: string,
        value: string,
        options?: Partial<ICookieOptions>
    ): boolean {
        let expires = '';
        options = options || {};
        if (value === null) {
            options.expires = -1;
        }
        if (options.expires) {
            let date = void 0;
            if (typeof options.expires === 'number') {
                date = new Date();
                date.setTime(date.getTime() + options.expires * MS_IN_DAY);
            } else if (options.expires.toUTCString) {
                date = options.expires;
            } else {
                throw new TypeError(
                    'Option "expires" should be a Number or Date instance'
                );
            }
            expires = `${SEPARATOR}expires=${date.toUTCString()}`;
        }
        const path = options.path ? `${SEPARATOR}path=${options.path}` : '';
        const domain = options.domain
            ? `${SEPARATOR}domain=${options.domain}`
            : '';
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
        this.set(key, null);
        this.cacheCookie.delete(key);
    }

    getKeys() {
        return document.cookie.split(SEPARATOR).map(function (cookie) {
            return cookie.replace(NAME_REPLACE_REGEXP, '');
        });
    }

    toObject() {
        const result = {};
        document.cookie.split(SEPARATOR).forEach(function (item) {
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
