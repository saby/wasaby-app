/// <amd-module name="Application/_Interface/IStateReceiver" />
import { ISerializableState } from "Application/_Interface/ISerializableState";

/**
 * Инетрфейс компонента для восстановления состояний компонентов.
 * Необходим для получения данных состояний компонентов созданных на сервер.
 * @interface
 * @name Application/_Interface/IStateReceiver
 */
export interface IStateReceiver {
    /**
     * Получеие сериализованного состояния всех зарегестрированных компонент
     * Используется для сохранения состояния страницы при построении на сервере
     * @return {any}
     * TODO сделал возвращаемый тип any, потому что UI/_base/StateReceiver возвращает ISerializedType.
     *  Нужно будет переделывать.
     */
    serialize(): any;

    /**
     * Метод, устанавливающий состояние всем зарегестрированным компонентам.
     * Используется при оживлении страницы после серверной вёрстки
     * @param {String} data
     */
    deserialize(data: string): void;

    /**
     * Регистрация компонентов, состояние которыех необходимо сохранить.
     * @param {String} uid идентификатор инстанса, для идентификации сохраненного для него состояния
     * @param {Application/_Interface/ISerializableState} component сериализируемый компонент
     */
    register(uid: string, component: ISerializableState): void;
    unregister(uid: string): void;
}
