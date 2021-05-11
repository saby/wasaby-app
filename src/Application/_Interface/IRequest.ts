/// <amd-module name="Application/_Interface/IRequest" />
import Config from 'Application/_Config/Config';
import { ICookie } from 'Application/_Interface/ICookie';
import { ILocation } from "Application/_Interface/ILocation";
import { IStateReceiver } from "Application/_Interface/IStateReceiver";
import type { IStore } from "Application/_Request/IStore";

/**
 * Компонент, которые предоставляет в платформе доступ к синглтонам в рамках запроса пользователя.
 * @interface Application/_Interface/IRequest
 * @public
 * @author Санников К.А.
 */
export interface IRequest {
    /**
     * @name Application/_Interface/IRequest#cookie
     * @cfg {ICookie} cookie
     */
    cookie: ICookie;
    /**
     * @name Application/_Interface/IRequest#location
     * @cfg {ILocation} location
     */
    location: ILocation;
    /**
     * Получить Config
     * @return {Application/_Config/Config}
     */
    getConfig(): Config;

    /**
     * Доступ к объекту сохранения состояния на сервиспе представлений,
     * для его получения на клиенте. Не привязан к VDOM механизмам,
     * поэтому можно будет его использовать в не визуальных компонентах.
     * @return {Application/_Interface/IStateReceiver}
     */
    getStateReceiver(): IStateReceiver;

    /**
     * Получение хранилища для сохранений данных в рамках запроса.
     * @param {String} key Тип хранилища.
     * @return {Application/_Request/IStore} Хранилище
     */
    getStore<T = Record<string, string>>(key: string, createDefaultStore?: () => IStore<T>): IStore<T>;

    /**
     * Установка хранилища
     * @param {String} key Тип хранилища.
     * @param {Application/_Request/IStore} storage Хранилище.
     */
    setStore<T = Record<string, string>>(key: string, storage: IStore<T>): void;
}

export interface IRequestInternal extends IRequest {
    setStateReceiver(stateReceiver: IStateReceiver): void;
}
