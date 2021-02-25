import { IHeadTagAttrs, IHeadTagEventHandlers, IHeadTagId, IInternalHead } from 'Application/_Interface/IHead';
import { IStore } from "Application/_Interface/IStore";

export type JSLinksTagId = string;
export interface IJSLinksTagAttrs extends  IHeadTagAttrs {}
export interface IJSLinksTagEventHandlers extends IHeadTagEventHandlers{}

/**
 * API для работы с JSLinks
 * @interface Application/_Interface/IJSLinks
 * @property {Function} createTag - добавит jslinks
 * @property {Function} getTag
 * переопределенный метод от Head, в котором параметр name всегда должен быть script.
 * Вернет описание тега(ов), если он есть по входным данным: имя тега script и аттрибуты
 * @property {Function} createComment - метод-заглушка для JSLinks отнаследованный от Head - делает ничего
 * @property {Function} createNoScript - метод-заглушка для JSLinks отнаследованный от Head - делает ничего
 * @public
 * @author Хамбелов М.И.
 */
export interface IJSLinksInternal extends IInternalHead {
    // tslint:disable-next-line:max-line-length
    createTag(name: 'script', attrs: IJSLinksTagAttrs, content?: string, eventHandlers?: IJSLinksTagEventHandlers): IHeadTagId;
    getTag(name?: 'script', attrs?: IJSLinksTagAttrs): JSLinksTagId | JSLinksTagId[] | null;
    createComment(): void;
    createNoScript(): void;
}

export interface IJSLinks extends IJSLinksInternal, IStore<IJSLinksInternal> {}
