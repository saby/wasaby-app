import Config from 'Application/_Config/Config';
import type { ICookie, ILocation } from 'Application/_Env/Interfaces';
import type { IStore } from 'Application/_Request/IStore';
import type { IStateReceiver } from 'Application/_State/Interfaces';

/**
 * Компонент, которые предоставляет в платформе доступ к синглтонам в рамках запроса пользователя.
 * @public
 * @author Санников К.А.
 */
export interface IRequest {
    /**
     * @cfg {ICookie} cookie
     */
    cookie: ICookie;
    /**
     * @cfg {ILocation} location
     */
    location: ILocation;
    /**
     * Получить Config
     * @return {Application/_Config/Config}
     */
    getConfig(): Config;

    /**
     * Доступ к объекту сохранения состояния на сервисе представлений,
     * для его получения на клиенте. Не привязан к VDOM механизмам,
     * поэтому можно будет его использовать в не визуальных компонентах.
     * @return {Application/_State/IStateReceiver}
     */
    getStateReceiver(): IStateReceiver;

    /**
     * Получение хранилища для сохранений данных в рамках запроса.
     * @param {String} key Тип хранилища.
     * @return {Application/_Request/IStore} Хранилище
     */
    getStore<T = Record<string, string>, S = IStore<T>>(
        key: string,
        createDefaultStore?: () => S
    ): S;

    /**
     * Установка хранилища
     * @param {String} key Тип хранилища.
     * @param {Application/_Request/IStore} storage Хранилище.
     */
    setStore<T = Record<string, string>, S = IStore<T>>(key: string, storage: S): void;

    setStateReceiver(stateReceiver: IStateReceiver): void;
}
