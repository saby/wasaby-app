/// <amd-module name="Application/_Interface/ISerializableState" />
/**
 * Интерфейс, который нужно поддержать компонентам, что бы их можно было сериализовать
 * и восстановливать их состояние в любой момент
 * @interface Application/_Interface/ISerializableState
 * @public
 * @author Санников К.А.
 * @example
 * <pre>
 * const DEFAULT_STATE = {
 *     // ...
 * }
 * class Control implements ISerializableState {
 *    private __uid: string;
 *    protected _state: Record<string, any>;
 *    constructor(...args) {
 *        stateReceiver.register(this.__uid, this);
 *        // ...
 *    }
 *    getState(): Record<string, any> {
 *        return this._state || {}
 *    }
 *    setState(data: Record<string, any>): void {
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
    getState(): Record<string, any>;

    /**
     * Устанавливаем состояния после десериализации
     */
    setState(data: Record<string, any>): void;
}
