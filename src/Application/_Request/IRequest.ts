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
     *
     */
    cookie: ICookie;

    /**
     *
     */
    location: ILocation;

    /**
     * Получить Config
     */
    getConfig(): Config;

    /**
     * Доступ к объекту сохранения состояния на сервисе представлений,
     * для его получения на клиенте. Не привязан к VDOM механизмам,
     * поэтому можно будет его использовать в не визуальных компонентах.
     */
    getStateReceiver(): IStateReceiver;

    /**
     * Получение хранилища для сохранений данных в рамках запроса. Вызывается для создания нового Store, если нет хранилища для переданного ключа
     * @param key Тип хранилища.
     * @param createDefaultStore функция, возвращающая Store.
     */
    getStore<T = Record<string, string>, S = IStore<T>>(
        key: string,
        createDefaultStore?: () => S
    ): S;

    /**
     * Установка хранилища
     * @param key Тип хранилища.
     * @param storage Хранилище.
     */
    setStore<T = Record<string, string>, S = IStore<T>>(key: string, storage: S): void;

    /**
     * Задать stateReceiver
     */
    setStateReceiver(stateReceiver: IStateReceiver): void;
}
