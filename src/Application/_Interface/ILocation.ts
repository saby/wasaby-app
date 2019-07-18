/// <amd-module name="Application/_Interface/ILocation" />
import { PARAMS } from 'Application/_Env/QueryParams';
/**
 * Описание обобщенного window.location.
 * Выписаны те поля, которые есть на сервисе представления и в браузере
 * @interface
 * @name Core/Request/ILocation
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
    query?: PARAMS
}
