/// <amd-module name="Application/_Interface/IHttpResponse" />
import { ICookieOptions } from "Application/_Interface/ICookie";

/**
 * Интерфейс, описывающий базовый API объекта ответа (response)
 * @interface Application/_Interface/IHttpResponse
 * @public
 * @author Мустафин Л.И.
 */
export interface IHttpResponse {
    cookie(key: string, value: string, options?: Partial<ICookieOptions>): IHttpResponse;
}
