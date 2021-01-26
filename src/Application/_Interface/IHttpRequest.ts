/// <amd-module name="Application/_Interface/IHttpRequest" />

/**
 * Интерфейс, описывающий базовый API объекта запроса (request)
 * @interface Application/_Interface/IHttpRequest
 * @public
 * @author Мустафин Л.И.
 */
export interface IHttpRequest {
    path: string;
    protocol: string;
    hostname: string;
    url: string;
    cookies: Record<string, string>;
}
