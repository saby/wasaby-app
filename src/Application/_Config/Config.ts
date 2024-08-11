import type { ISerializableState } from 'Application/State';
import type { IData } from './IConfig';

/**
 * Класс Config
 * @public
 * @author Санников К.А.
 */
export default class Config implements ISerializableState {
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-denylist, id-match
    /**
     *
     */
    constructor(private data: IData = {}, private __uid: string = 'appConfig') {}

    /**
     * Получить данные по ключу
     * @param key
     * @return
     */
    get(key: keyof IData): IData[keyof IData] {
        return this.data[key];
    }

    /**
     * Добавить/установить значение по ключу
     * @param key
     * @param value
     * @return
     */
    set(key: keyof IData, value: any): void {
        return (this.data[key] = value);
    }
    /**
     * Получить состояние
     * @return
     */
    getState(): IData {
        return this.data;
    }

    /**
     * Задать состояние
     * @param data
     */
    setState(data: IData): void {
        if (!data) {
            return;
        }
        this.data = data;
    }

    /**
     * Получить UID
     * @return
     */
    getUID(): string {
        return this.__uid;
    }
}
