import type { IStore } from 'Application/_Request/IStore';

/**
 * Описание обобщенного window.location.
 * Выписаны те поля, которые есть на сервисе представления и в браузере
 * @public
 * @author Санников К.А..
 */
export interface ILocation {
    /**
     * Используемый протокол (http/https)
     */
    protocol: string;
    /**
     * Хост
     */
    host: string;
    /**
     * Доменное имя хоста
     */
    hostname: string;
    /**
     * Порт URL
     */
    port: string;
    /**
     * Ссылка данной страницы (весь URL)
     */
    href: string;
    /**
     * Путь (файл) данной страницы
     */
    pathname: string;
    /**
     * Возвращает строка запроса с URL (querystring)
     */
    search: string;
    /**
     * Возвращает #-часть URL
     */
    hash: string;
    /**
     *
     */
    replace(path: string): void;
}

/**
 * Набор опций для cookie
 */
export interface ICookieOptions {
    /**
     *
     */
    domain: string;
    /**
     *
     */
    expires: number | Date;
    /**
     *
     */
    path: string;
    /**
     *
     */
    secure: string;
}

/**
 * Интерфейс для работы с cookie
 * @public
 * @author Санников К.А.
 */
export interface ICookie extends IStore {
    /**
     * Получение значение из cookie
     * @param
     */
    get(key: string): string | null;
    /**
     * Устанавливаем cookie
     * @throws {Error} ошибка установки значения
     */
    set(key: string, value: string, options?: Partial<ICookieOptions>): boolean;
    /**
     * Удаляем cookie
     * @throws {Error} ошибка очистки значения
     */
    remove(key: string): void;
    /**
     * Очистка всех закэшированных значений cookie
     */
    clearCache?(): void;
}
