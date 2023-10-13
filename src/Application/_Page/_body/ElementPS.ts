/**
 * Класс, которые непосредственно управляет тегом <body> на сервере
 * @author Печеркин С.В.
 * @private
 */
export default class ElementPS {
    protected readonly _attrs = {
        class: '',
        dir: '',
    };

    /**
     * Аналог метода contains для DOMTokenList у <body>
     * @see DOMTokenList
     * @param token
     */
    containsClass(token: string): boolean {
        return this._attrs.class.includes(ElementPS.escapeHtml(token));
    }

    /**
     * Аналог метода toString для DOMTokenList у <body>
     * @see DOMTokenList
     */
    getClasses(): string {
        return this._attrs.class;
    }

    /**
     * Аналог метода toggle для DOMTokenList у <body>
     * @see DOMTokenList
     * @param token
     * @param force
     */
    toggleClass(token: string, force?: boolean): boolean {
        const needAdd: boolean =
            force === undefined ? !this.containsClass(token) : force;
        if (needAdd) {
            this.updateClasses([], [token]);
        } else {
            this.updateClasses([token], []);
        }

        return this.containsClass(token);
    }

    /**
     * Аналог метода replace для DOMTokenList у <body>
     * @see DOMTokenList
     * @param initialRemoveList
     * @param initialAddList
     */
    updateClasses(initialRemoveList: string[], initialAddList: string[]): void {
        const removeList = ElementPS.prepareTokens(initialRemoveList);
        const addList = ElementPS.prepareTokens(initialAddList);

        let list: string[] = ElementPS.prepareTokens(
            this.getClasses().split(' ')
        );
        list = list.filter((item) => {
            return !removeList.includes(item);
        });
        list = list.concat(
            addList
                .filter((item) => {
                    return !list.includes(item);
                })
                .map((item) => {
                    return ElementPS.escapeHtml(item);
                })
        );

        this._attrs.class = list.join(' ');
    }

    /**
     * установка аттрибута dir на document.body на СП
     */
    setDir(value: string): void {
        this._attrs.dir = ElementPS.escapeHtml(value);
    }

    /**
     * получение выставленного значения аттрибута dir из document.body
     */
    getDir(): string {
        return this._attrs.dir;
    }

    /**
     * Токены классов нужно достаточно сильно фильтровать, иначе упадут нативные методы браузеров
     * Нельзя пропускать дальше пустые строки и строки с пробелами
     * @param tokens
     * @protected
     */
    protected static prepareTokens(tokens: string[]): string[] {
        const result: string[] = [];

        tokens.forEach((token) => {
            if (!!token) {
                result.push(token.trim());
            }
        });

        return result;
    }

    protected static escapeHtml(unsafe: string): string {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}
