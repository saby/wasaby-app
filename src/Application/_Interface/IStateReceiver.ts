/// <amd-module name="Application/_Interface/IStateReceiver" />
import { ISerializableState } from "Application/_Interface/ISerializableState";

/**
 * Интерфейс компонента для восстановления состояний компонентов.
 * Необходим для получения данных состояний компонентов созданных на сервер.
 * @interface Application/_Interface/IStateReceiver
 * @private
 * @author Санников К.А.
 */
export interface IStateReceiver {
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
     * @param {String} uid Идентификатор инстанса, для идентификации сохраненного для него состояния.
     * @param {Application/_Interface/ISerializableState} component Сериализируемый компонент.
     */
    register(uid: string, component: ISerializableState): void;

    /**
     * Отменить регистрацию по идентификатору инстанса.
     * @param {String} uid Идентификатор инстанса.
     */
    unregister(uid: string): void;
}
