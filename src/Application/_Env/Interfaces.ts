/**
 * Описание обобщенного window.location.
 * Выписаны те поля, которые есть на сервисе представления и в браузере
 * @interface Application/Env/ILocation
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
 * @name Application/Env/ILocation#protocol
 * @cfg {String} Используемый протокол (http/https)
 */
/**
 * @name Application/Env/ILocation#host
 * @cfg {String} Хост
 */
/**
 * @name Application/Env/ILocation#hostname
 * @cfg {String} hostname Доменное имя хоста
 */
/**
 * @name Application/Env/ILocation#port
 * @cfg {String} Порт URL
 */
/**
 * @name Application/Env/ILocation#href
 * @cfg {String} Ссылка данной страницы (весь URL)
 */
/**
 * @name Application/Env/ILocation#pathname
 * @cfg {String} Путь (файл) данной страницы
 */
/**
 * @name Application/Env/ILocation#search
 * @cfg {String} Возвращает строка запроса с URL (querystring)
 */
/**
 * @name Application/Env/ILocation#hash
 * @cfg {String} Возвращает #-часть URL
 */
