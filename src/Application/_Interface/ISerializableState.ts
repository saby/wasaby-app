/// <amd-module name="Application/_Interface/ISerializableState" />
import { HashMap, Native } from "Application/_Type";

/**
 * Интерфейс, который нужно поддержать компонентам, что бы их можно было сериализовать
 * и восстановливать их состояние в любой момент
 * @interface Application/_Interface/ISerializableState
 * @example
 * <pre>
 * const DEFAULT_STATE = {
 *     // ...
 * }
 * class Control implements ISerializableState {
 *    private __uid: string;
 *    protected _state: HashMap<Native>;
 *    constructor(...args) {
 *        stateReceiver.register(this.__uid, this);
 *        // ...
 *    }
 *    getState(): HashMap<Native> {
 *        return this._state || {}
 *    }
 *    setState(data: HashMap<Native>): void {
 *        this._state = {
 *            ...DEFAULT_STATE,
 *            ...data
 *        }
 *        this._redraw();
 *    }
 *    destroy() {
 *        stateReceiver.unregister(this.__uid);
 *        // ...
 *    }
 * }
 * </pre>
 */
export interface ISerializableState {
    /**
     * Получаем состояние для сериализации
     */
    getState(): HashMap<Native>;

    /**
     * Устанавливаем состояния после десериализации
     */
    setState(data: HashMap<Native>): void;
}
