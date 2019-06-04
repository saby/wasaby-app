/// <amd-module name="Application/_Env/Browser/Cookie" />
import { ICookie, ICookieOptions } from "Application/_Interface/ICookie";
import { IStore } from 'Application/_Interface/IStore';
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const NAME_REPLACE_REGEXP = /=.*/;
/** Разделитель между куками в documents.cookie */
const SEPARATOR = '; ';
/**
 * Класс, реализующий интерфейс {@link Core/Request/IStorage},
 * предназначенный для работы с cookie в браузере
 * @class
 * @name _Request/_Storage/Cookie
 * @implements Core/Request/IStorage
 * @author Заляев А.В
 */
export default class Cookie implements ICookie, IStore<string> {
    cosntructor() {
        if (!document || !document.cookie) {
            throw new Error('document.cookie not found');
        }
    }

    get(key: string) {
        const cookies = document.cookie.split(SEPARATOR);
        let value = null;
        let item;
        for (let i = 0; i < cookies.length; i++) {
            item = String(cookies[i]).trim();
            if (item.substring(0, key.length + 1) === (key + "=")) {
                value = decodeURIComponent(item.substring(key.length + 1));
                break;
            }
        }
        return value;
    }

    set(key: string, value: string, options?: Partial<ICookieOptions>): boolean {
        let expires = '';
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        if (options.expires) {
            let date = void 0;
            if (typeof options.expires === 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * MS_IN_DAY));
            }
            else if (options.expires.toUTCString) {
                date = options.expires;
            }
            else {
                throw new TypeError('Option "expires" should be a Number or Date instance');
            }
            expires = `${SEPARATOR}expires=${date.toUTCString()}`;
        }
        let path = options.path ? `${SEPARATOR}path=${options.path}` : '';
        let domain = options.domain ? `${SEPARATOR}domain=${options.domain}` : '';
        let secure = options.secure ? `${SEPARATOR}secure` : '';
        try {
            document.cookie = [key, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } catch (e) {
            return false;
        }
        return true;
    }

    remove(key: string) {
        this.set(key, null);
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
            const key = _a[0]
            const value = _a[1];
            result[key] = decodeURIComponent(value);
        });
        return result;
    }
}
