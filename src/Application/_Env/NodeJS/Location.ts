import type { IHttpRequest } from 'Application/_Env/IHttpRequest';
import type { ILocation } from 'Application/_Env/Interfaces';
import { IHttpResponse } from '../IHttpResponse';

export default class Location implements ILocation {
    private hostMask: RegExp = /([^:]+)(:\d+)?/;
    private searchMask: RegExp = /(\?.+)$/;

    constructor(
        private requestGetter: () => Partial<IHttpRequest>,
        private responseGetter: () => Partial<IHttpResponse>
    ) {
        if (typeof requestGetter !== 'function') {
            throw new Error(
                'requestGetter must be a function in new Location(requestGetter, responseGetter)'
            );
        }
        if (typeof responseGetter !== 'function') {
            throw new Error(
                'responseGetter must be a function in new Location(requestGetter, responseGetter)'
            );
        }
    }

    private getReqProp<K extends keyof IHttpRequest>(
        prop: K
    ): Exclude<Partial<IHttpRequest>[K], undefined> | '' {
        const req = this.requestGetter();
        if (typeof req[prop] !== 'string') {
            return '';
        }

        return req[prop] as Exclude<Partial<IHttpRequest>[K], undefined>;
    }

    get pathname(): string {
        return this.getReqProp('path');
    }

    get protocol(): string {
        return this.getReqProp('protocol') + ':';
    }

    get port(): string {
        const groups = this.hostname.match(this.hostMask);
        if (groups === null || !groups[2]) {
            return '';
        }
        return groups[2];
    }

    get host(): string {
        const groups = this.hostname.match(this.hostMask);
        if (groups === null || !groups[1]) {
            return '';
        }
        return groups[1];
    }

    get hostname(): string {
        // В express версии 4.x в hostname нет порта и даже части домена.
        // Поэтому пробуем сначала hostname получить из заголовка host, а потом уже из объекта req
        const req = this.requestGetter();
        const hostname = req.header?.('host');
        if (hostname) {
            return hostname;
        }
        return this.getReqProp('hostname');
    }

    get href(): string {
        return `${this.protocol}//${this.hostname}${this.getReqProp('url')}`;
    }

    set href(href: string) {
        this.replace(href);
    }

    get search(): string {
        const groups = this.getReqProp('url').match(this.searchMask);
        if (groups === null || !groups[1]) {
            return '';
        }
        return groups[1];
    }

    get hash(): string {
        return '';
    }

    set hash(_value: string) {
        // do nothing
    }

    replace(path: string): void {
        this.responseGetter().redirect?.(path);
    }
}
