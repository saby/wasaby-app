import { default as ElementPS } from 'Application/_Page/_body/ElementPS';

/**
 * Класс, которые непосредственно управляет тегом <body> на клинете
 * @author Печеркин С.В.
 * @private
 */
export default class Element extends ElementPS {
    /**
     * Аналог метода contains для DOMTokenList у <body>
     * Фактически, он его и вызывает, потому что на сервере у нас нет body, а на клиенте незачем что-то выдумывать
     * @see DOMTokenList
     * @param token
     */
    containsClass(token: string): boolean {
        return document.body.classList.contains(ElementPS.escapeHtml(token));
    }

    /**
     * Аналог метода toString для DOMTokenList у <body>
     * Фактически, он его и вызывает, потому что на сервере у нас нет body, а на клиенте незачем что-то выдумывать
     * @see DOMTokenList
     */
    getClasses(): string {
        return document.body.classList.toString();
    }

    /**
     * Аналог метода toggle для DOMTokenList у <body>
     * Фактически, он его и вызывает, потому что на сервере у нас нет body, а на клиенте незачем что-то выдумывать
     * @see DOMTokenList
     * @param token
     * @param force
     */
    toggleClass(token: string, force?: boolean): boolean {
        return document.body.classList.toggle(Element.escapeHtml(token), force);
    }

    /**
     * Аналог метода replace для DOMTokenList у <body>
     * Можно бы было использовать нативные метод, но он работает только с одним удаляемым и добавляемым классом
     * @see DOMTokenList
     * @param initialRemoveList
     * @param initialAddList
     */
    updateClasses(initialRemoveList: string[], initialAddList: string[]) {
        super.updateClasses(initialRemoveList, initialAddList);
        if (document.body.className === this._attrs.class) {
            return;
        }
        document.body.setAttribute('class', this._attrs.class);
        this._notifyEventCrunch();
    }

    /**
     * установка аттрибута dir на document.body
     */
    setDir(value: string): void {
        document.body.dir = ElementPS.escapeHtml(value);
    }

    /**
     * получение выставленного значения аттрибута dir из document.body
     */
    getDir(): string {
        return document.body.dir;
    }

    /** Костылямбрий, который будет жить, пока не закончится переход на построение от шаблона #bootsrap */
    private _notifyEventCrunch(): void {
        if (typeof window !== 'undefined') {
            customEventPolyfill();
            window.document.body.dispatchEvent(
                new CustomEvent('_bodyClassesUpdateCrunch', {
                    detail: this.getClasses(),
                })
            );
        }
    }
}

/** Костылямбрий, который будет жить, пока не закончится переход на построение от шаблона #bootsrap */
function customEventPolyfill(): void {
    if (typeof window.CustomEvent === 'function') {
        return;
    }

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(
            event,
            params.bubbles,
            params.cancelable,
            params.detail
        );
        return evt;
    }

    // @ts-ignore
    window.CustomEvent = CustomEvent;
}
