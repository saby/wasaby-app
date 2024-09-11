import type { ICookieOptions } from 'Application/_Env/Interfaces';

/**
 * Интерфейс, описывающий базовый API объекта ответа (response)
 * @interface Application/Env/IHttpResponse
 * @public
 * @author Мустафин Л.И.
 */
export interface IHttpResponse {
    clearCookie(key: string, options?: Partial<ICookieOptions>): IHttpResponse;
    cookie(key: string, value: string, options?: Partial<ICookieOptions>): IHttpResponse;
    header(name: string, value: unknown): IHttpResponse;
    set(name: string, value: unknown): IHttpResponse;
    redirect(path: string): IHttpResponse;
    send(body: string): IHttpResponse;
    status(code: number): IHttpResponse;
}
