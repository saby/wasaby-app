/// <amd-module name="Application/_Env/NodeJS/Location" />
import { ILocation } from 'Application/Interface';

function getRequest() {
    return {};
}

export default class Location implements ILocation {
    private hostMask = /([^:]+)(\:\d+)?/;
    private searchMask = /(\?.+)$/;

    constructor(private requestGetter?: Function) {
        if (requestGetter === undefined) {
            this.requestGetter = requestGetter = getRequest;
        }
        if (typeof requestGetter !== 'function') {
            throw new Error('requestGetter must be a function in new Location(requestGetter)');
        }
    }

    private getReqProp(prop: string): string {
        const req = this.requestGetter();
        if (typeof req[prop] !== 'string') {
            return '';
        }

        return req[prop];
    }

    get pathname() {
        return this.getReqProp('path');
    }

    get protocol() {
        return this.getReqProp('protocol') + ':';
    }

    get port() {
        const groups = this.getReqProp('hostname').match(this.hostMask);
        if (groups === null || !groups[2]) { return ''; }
        return groups[2];
    }

    get host() {
        const groups = this.getReqProp('hostname').match(this.hostMask);
        if (groups === null || !groups[1]) { return ''; }
        return groups[1];
    }

    get hostname() {
        return this.getReqProp('hostname');
    }

    get href() {
        const protocol = this.getReqProp('protocol');
        const hostname = this.getReqProp('hostname');
        const url =  this.getReqProp('url');
        return `${protocol}://${hostname}${url}`;
    }

    get search() {
        const groups = this.getReqProp('url').match(this.searchMask);
        if (groups === null || !groups[1]) { return ''; }
        return groups[1];
    }

    get hash() {
        return '';
    }
}
