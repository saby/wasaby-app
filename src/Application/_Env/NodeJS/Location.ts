/// <amd-module name="Application/_Env/NodeJS/Location" />
import { IHttpRequest } from 'Application/Interface';
import type { ILocation } from 'Application/_Env/Interfaces;

export default class Location implements ILocation {
    private hostMask: RegExp = /([^:]+)(:\d+)?/;
    private searchMask: RegExp = /(\?.+)$/;

    constructor(private requestGetter: () => Partial<IHttpRequest>) {
        if (typeof requestGetter !== 'function') {
            throw new Error('requestGetter must be a function in new Location(requestGetter)');
        }
    }

    private getReqProp<K extends keyof IHttpRequest>(prop: K): Partial<IHttpRequest>[K] | '' {
        const req = this.requestGetter();
        if (typeof req[prop] !== 'string') {
            return '';
        }

        return req[prop];
    }

    get pathname(): string {
        return this.getReqProp('path');
    }

    get protocol(): string {
        return this.getReqProp('protocol') + ':';
    }

    get port(): string {
        const groups = this.getReqProp('hostname').match(this.hostMask);
        if (groups === null || !groups[2]) {
            return '';
        }
        return groups[2];
    }

    get host(): string {
        const groups = this.getReqProp('hostname').match(this.hostMask);
        if (groups === null || !groups[1]) {
            return '';
        }
        return groups[1];
    }

    get hostname(): string {
        return this.getReqProp('hostname');
    }

    get href(): string {
        return `${this.protocol}//${this.hostname}${this.getReqProp('url')}`;
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
}
