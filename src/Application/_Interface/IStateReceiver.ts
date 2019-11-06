/// <amd-module name="Application/_Interface/IStateReceiver" />
import { ISerializableState } from "Application/_Interface/ISerializableState";

/**
 * Интерфейс компонента для восстановления состояний компонентов.
 * Необходим для получения данных состояний компонентов созданных на сервер.
 * @interface Application/_Interface/IStateReceiver
 */
export interface IStateReceiver {
    /**
     * Получение сериализованного состояния всех зарегестрированных компонент
     * Используется для сохранения состояния страницы при построении на сервере
     * @remark
     * TODO сделал возвращаемый тип any, потому что UI/_base/StateReceiver возвращает ISerializedType.
     * Нужно будет переделывать.
     * @return {any}
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
     * @param {Application/Interface:ISerializableState} component сериализируемый компонент
     */
    register(uid: string, component: ISerializableState): void;
    
    /**
     * Отменить регистрацию по идентификатору инстанса
     * @param {String} uid идентификатор инстанса
     */
    unregister(uid: string): void;
}
