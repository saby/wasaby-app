/// <amd-module name="Application/_Env/NodeJS/Cookie" />
import { ICookie, ICookieOptions } from 'Application/Interface';
/* eslint-disable */
/**
 * Класс, реализующий интерфейс {@link Core/Request/IStorage},
 * предназначенный для работы с cookie в браузере
 * @class Application/_Env/NodeJS/Cookie
 * @private
 * @implements Core/Request/IStorage
 * @author Заляев А.В.
 */
export default class Cookie implements ICookie {

    get() {
        return null;
    }

    set(_key: string, _value: string, _options?: Partial<ICookieOptions>): boolean {
        return false;
    }

    remove(key: string) {
        this.set(key, null);
    }

    getKeys(): Array<string> {
        return [];
    }

    toObject(): Record<string, string> {
        return {};
    }
}
