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
 * @cfg {String} protocol
 */
/**
 * @name Application/Interface/ILocation#host
 * @cfg {String} host
 */
/**
 * @name Application/Interface/ILocation#hostname
 * @cfg {String} hostname
 */
/**
 * @name Application/Interface/ILocation#port
 * @cfg {String} port
 */
/**
 * @name Application/Interface/ILocation#href
 * @cfg {String} href
 */
/**
 * @name Application/Interface/ILocation#pathname
 * @cfg {String} pathname
 */
/**
 * @name Application/Interface/ILocation#search
 * @cfg {String} search
 */
/**
 * @name Application/Interface/ILocation#hash
 * @cfg {String} hash
 */
