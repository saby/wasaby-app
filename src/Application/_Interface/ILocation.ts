/// <amd-module name="Application/_Interface/ILocation" />
/**
 * Описание обобщенного window.location.
 * Выписаны те поля, которые есть на сервисе представления и в браузере
 * @interface Application/_Interface/ILocation
 * @public
 * @author Санников К.А..
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
 * @name Application/_Interface/ILocation#protocol
 * @cfg {String} Используемый протокол (http/https)
 */
/**
 * @name Application/_Interface/ILocation#host
 * @cfg {String} Хост
 */
/**
 * @name Application/_Interface/ILocation#hostname
 * @cfg {String} hostname Доменное имя хоста
 */
/**
 * @name Application/_Interface/ILocation#port
 * @cfg {String} Порт URL
 */
/**
 * @name Application/_Interface/ILocation#href
 * @cfg {String} Ссылка данной страницы (весь URL)
 */
/**
 * @name Application/_Interface/ILocation#pathname
 * @cfg {String} Путь (файл) данной страницы
 */
/**
 * @name Application/_Interface/ILocation#search
 * @cfg {String} Возвращает строка запроса с URL (querystring)
 */
/**
 * @name Application/_Interface/ILocation#hash
 * @cfg {String} Возвращает #-часть URL
 */
