/// <amd-module name="Application/_Interface/IHttpRequest" />
import { IRequest } from "./IRequest";

/**
 * Интерфейс, описывающий базовый API объекта запроса (request)
 * @interface Application/_Interface/IHttpRequest
 * @public
 * @author Мустафин Л.И.
 */
export interface IHttpRequest {
    appRequest: IRequest;
    compatible: boolean;
    baseUrl: string;
    path: string;
    protocol: string;
    hostname: string;
    url: string;
    query?: object;
    headers: Record<string, string>;
    cookies: Record<string, string>;
    get(header: string): string;
    header(header: string): string;
}
