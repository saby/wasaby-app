/// <amd-module name="Application/_Interface/ILocation" />
/**
 * Описание обобщенного window.location.
 * Выписаны те поля, которые есть на сервисе представления и в браузере
 * @interface Application/Interface/ILocation
 */
export interface ILocation {
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    href: string;
    pathname: string;
    search: string;
    hash: string;
}
/**
 * @name Application/Interface/ILocation#protocol
 * @cfg {String} protocol Используемый протокол (http/https)
 */
/**
 * @name Application/Interface/ILocation#host
 * @cfg {String} host Хост
 */
/**
 * @name Application/Interface/ILocation#hostname
 * @cfg {String} hostname Доменное имя хоста
 */
/**
 * @name Application/Interface/ILocation#port
 * @cfg {String} port Порт URL
 */
/**
 * @name Application/Interface/ILocation#href
 * @cfg {String} href Ссылка данной страницы (весь URL)
 */
/**
 * @name Application/Interface/ILocation#pathname
 * @cfg {String} pathname Путь (файл) данной страницы
 */
/**
 * @name Application/Interface/ILocation#search
 * @cfg {String} search Возвращает строка запроса с URL (querystring)
 */
/**
 * @name Application/Interface/ILocation#hash
 * @cfg {String} hash Возвращает #-часть URL
 */
