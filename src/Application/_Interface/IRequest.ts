/// <amd-module name="Application/_Interface/IRequest" />
import Config from 'Application/_Config/Config';
import { IConsole } from "Application/_Interface/IConsole";
import { ICookie } from 'Application/_Interface/ICookie';
import { ILocation } from "Application/_Interface/ILocation";
import { IStateReceiver } from "Application/_Interface/IStateReceiver";
import { IStore } from "Application/_Interface/IStore";

/**
 * Компонент, которые предоставляет в платформе доступ к синглтонам в раках запроса пользователя.
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
     * @name Application/_Interface/IRequest#console
     * @cfg {IConsole} console
     */
    console: IConsole;
    /**
     * Получить Config
     * @return {Application/_Config/Config}
     */
    getConfig(): Config;

    /**
     * Доступ к объекту сохранения состояния на сервиспе представлений,
     * для его получения на клиенте. Не привязан к VDOM механизмам,
     * поэтому можно будет его использовать в не визуальных компонентах.
     * @return {Application/_Config/Config}
     */
    getStateReceiver(): IStateReceiver;

    /**
     * Получение хранилища для сохранений данных в рамках запроса.
     * @param {String} key Тип хранилища.
     * @return {Application/Interface/IStore/IStore} IStore
     */
    getStore(key: string): IStore;

    /**
     * Установка хранилища
     * @param {String} key Тип хранилища.
     * @param {Application/Interface/IStore/IStore} storage Хранилище.
     */
    setStore(key: string, storage: IStore);
}
