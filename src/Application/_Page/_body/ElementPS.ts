///// <amd-module name="Application/_Page/_body/ElementPS" />

/**
 * Класс для Application/_Page/Body
 * Обеспечивает часть интерфейса https://developer.mozilla.org/ru/docs/Web/API/Element/classList
 */

export class ElementPS implements Partial<DOMTokenList> {
    private _classes: string[] = [];

    [x: number]: string;
    length?: number;
    value?: string;
    item?(index: number): string {
        throw new Error('Method not implemented.');
    }
    replace?(oldToken: string, newToken: string): void {
        throw new Error('Method not implemented.');
    }
    supports?(token: string): boolean {
        throw new Error('Method not implemented.');
    }
    // tslint:disable-next-line:no-any
    forEach?(callbackfn: (value: string, key: number, parent: DOMTokenList) => void, thisArg?: any): void {
        throw new Error('Method not implemented.');
    }

    toString(): string {
        return this._classes.join(' ');
    }

    add(...tokens: string[]): void {
        tokens.forEach((token) => {
            this._checkToken(token, 'add');
            if (!this._classes.includes(token)) {
                this._classes.push(token);
            }
        });
    }

    remove(...tokens: string[]): void {
        tokens.forEach((token) => this._checkToken(token, 'remove'));
        this._classes = this._classes.filter((item) => {
            return !tokens.includes(item);
        });
    }

    toggle(token: string, force?: boolean): boolean {
        this._checkToken(token, 'toggle');

        if (typeof force === 'undefined') {
            if (this._classes.includes(token)) {
                this.remove(token);
                return false;
            } else {
                this.add(token);
                return true;
            }
        } else {
            if (!!force) {
                this.add(token);
                return true;
            } else {
                this.remove(token);
                return false;
            }
        }
    }

    contains(token: string): boolean {
        this._checkToken(token, 'contains');
        return this._classes.includes(token);
    }

    /**
     * Проверяем данные и стреляем ошибку как в браузере
     * @param token
     * @param method
     * @protected
     */
    protected _checkToken(token: string, method: string): void | never {
        if (!token) {
            throw new Error([
                `Failed to execute '${method}' on 'ElementPS':`,
                'The token provided must not be empty'
            ].join(' '));
        }
        if (token.includes(' ')) {
            throw new Error([
                `Failed to execute '${method}' on 'ElementPS':`,
                `The token provided ('${token}') contains HTML space characters, which are not valid in tokens.`
            ].join(' '));
        }
    }
}
