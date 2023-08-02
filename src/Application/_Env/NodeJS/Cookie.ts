import type { IHttpRequest } from 'Application/_Env/IHttpRequest';
import type { IHttpResponse } from 'Application/_Env/IHttpResponse';
import type { ICookie, ICookieOptions } from 'Application/_Env/Interfaces';

/**
 * Класс, реализующий интерфейс {@link Core/Request/IStorage},
 * предназначенный для работы с cookie в браузере
 * @class Application/_Env/NodeJS/Cookie
 * @private
 * @implements Core/Request/IStorage
 * @author Заляев А.В.
 */
export default class Cookie implements ICookie {
    constructor(
        private getRequest: () => Partial<IHttpRequest>,
        private getResponse: () => Partial<IHttpResponse>
    ) {}

    get(key: string): string | null {
        return this.getRequest().cookies?.[key] || null;
    }

    set(
        key: string,
        value: string,
        options: Partial<ICookieOptions> = {}
    ): boolean {
        const { cookie } = this.getResponse();

        if (typeof cookie !== 'function') {
            return false;
        }

        const cookieOptions = { ...options };
        delete cookieOptions.expires;

        cookie.apply(this.getResponse(), [
            key,
            value,
            {
                ...cookieOptions,
                ...Cookie.getExpires(value === null ? -1 : options.expires),
            },
        ]);

        return true;
    }

    remove(key: string): void {
        this.set(key, null);
    }

    getKeys(): string[] {
        return Object.keys(this.getRequest().cookies || {});
    }

    toObject(): Record<string, string> {
        return {
            ...this.getRequest().cookies,
        };
    }

    private static getExpires(expires: number | Date): {
        expires?: number | Date;
    } {
        if (!expires) {
            return {};
        }

        let date;

        if (typeof expires === 'number') {
            date = new Date();
            const MS_IN_DAY = 86400000;
            date.setTime(date.getTime() + expires * MS_IN_DAY);
        } else if (expires.toUTCString) {
            date = expires;
        } else {
            throw new TypeError(
                'Option "expires" should be a Number or Date instance'
            );
        }

        return { expires: date };
    }
}
