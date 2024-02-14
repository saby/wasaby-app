import type { IConsole } from 'Application/_Env/IConsole';

/**
 * Интерфейс ресурса
 * @public
 * @author Хамбелов М.И.
 */

export interface IResourceDisposable {
    /**
     * открывает ресурс
     * @param {unknown} owner контрол, которому принадлежит ресурс
     */
    enter(owner: unknown): void;
    /**
     * закрывает ресурс
     * @param {unknown} owner контрол, которому принадлежит ресурс
     */
    dispose(owner: unknown): void;
}

/**
 * Интерфейс, который нужно поддержать компонентам, что бы их можно было сериализовать
 * и восстановливать их состояние в любой момент
 * @public
 * @author Санников К.А.
 * @example
 * Использование отдельного объекта для сохранения состояния.
 * <pre>
 * import { getStateReceiver } from 'Application/Env';
 * import { ISerializableState } from 'Application/State';
 * const DEFAULT_STATE = {
 *     // ...
 * }
 * class MyControl implements ISerializableState {
 *    private __uid: string = '<какой-то-строковый-идентификатор>';
 *    protected _state: Record<string, any>;
 *    constructor(...args) {
 *        getStateReceiver().register(this.__uid, this);
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
 *        getStateReceiver().unregister(this.__uid);
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

export type IStateReceiverMeta = { ulid: string } & Record<string, string>;

/**
 * Интерфейс компонента для восстановления состояний компонентов.
 * Необходим для получения данных состояний компонентов созданных на сервер.
 * @private
 * @author Санников К.А.
 */
export interface IStateReceiver {
    /**
     * В новой архитектуре на основе React нельзя использовать на сервере асинхронное построение и мы это лечим.
     * Но есть достаточно распространенные компоненты типа Controls.list:DataContainer,
     * которые силами платформы долго переводить на синхронное построение. Поэтому мы решили регистрировать все
     * результаты _beforeMount типа Promise и ждать их тут 5 секунд.
     */
    waitBeforeMounts(): Promise<unknown>;
    /**
     * Получить сериализованное состояние всех зарегестрированных компонентов.
     * Используется для сохранения состояния страницы при построении на сервере.
     * @remark
     * TODO сделал возвращаемый тип any, потому что UI/_base/StateReceiver возвращает ISerializedType.
     * Нужно будет переделывать.
     * @return {any}
     */
    serialize(): any;

    /**
     * Установить состояние всем зарегестрированным компонентам.
     * Используется при оживлении страницы после серверной вёрстки.
     * @param {String} data Данные
     */
    deserialize(data: string): void;

    /**
     * Зарегистрировать компоненты, состояние которых необходимо сохранить.
     * @param {string | IStateReceiverMeta} uid Идентификатор инстанса,
     * для идентификации сохраненного для него состояния.
     * @param meta
     * @param {Application/_State/ISerializableState} component Сериализируемый компонент.
     * @param {boolean} guess
     */
    register(
        meta: string | IStateReceiverMeta,
        component: ISerializableState | Promise<ISerializableState>,
        guess: boolean
    ): void;

    /**
     * Отменить регистрацию по идентификатору инстанса.
     * @param {String} uid Идентификатор инстанса.
     */
    unregister(uid: string): void;
    /**
     * установить логгер
     * @param  {Application/_Env/IConsole} логгер.
     */
    setLogger(Logger: IConsole): void;
}
