/// <amd-module name="Application/_Interface/IRequest" />
import Config from 'Application/_Config/Config';
import { IConsole } from "Application/_Interface/IConsole";
import { ICookie } from 'Application/_Interface/ICookie';
import { ILocation } from "Application/_Interface/ILocation";
import { IStateReceiver } from "Application/_Interface/IStateReceiver";
import { IStore } from "Application/_Interface/IStore";

/**
 * Компонент, которые предоставляет в платформе доступ к синглтонам в раках запроса пользователя.
 * @interface Application/Interface/IRequest
 * @public
 * @author Санников К.А.
 */
export interface IRequest {
    /**
     * @name Application/Interface/IRequest#cookie
     * @cfg {ICookie} cookie
     */
    cookie: ICookie;
    /**
     * @name Application/Interface/IRequest#location
     * @cfg {ILocation} location
     */
    location: ILocation;
    /**
     * @name Application/Interface/IRequest#console
     * @cfg {IConsole} console
     */
    console: IConsole;
    /**
     * @return {Config}
     */
    getConfig(): Config;

    /**
     * Доступ к объекту сохранения состояния на сервиспе представлений,
     * для его получения на клиенте. Не привязан к VDOM механизмам,
     * поэтому можно будет его использовать в не визуальных компонентах.
     * @return {Config}
     */
    getStateReceiver(): IStateReceiver;

    /**
     * Получение хранилища для сохранений данных в рамках запроса.
     * @param {String} key Тип хранилища.
     * @return {Config} IStore
     */
    getStore(key: string): IStore;

    /**
     * Установка хранилища
     * @param key {string} Тип хранилища.
     * @param storage {IStore}
     */
    setStore(key: string, storage: IStore);
}
