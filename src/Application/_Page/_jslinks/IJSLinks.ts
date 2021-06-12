import type { IHeadTagAttrs, IHeadTagEventHandlers, IHeadTagId, IInternalHead, JML } from 'Application/_Page/_head/IHead';
import type { IStore } from 'Application/_Request/IStore';

export type JSLinksTagId = string;

/**
 * API для работы с JSLinks
 * @interface Application/_Page/_jslinks/IJSLinks
 * @property {Function} createTag - добавит jslinks
 * @property {Function} getData - вернет текущее состояние тегов в формате JsonML
 * @public
 * @author Хамбелов М.И.
 */
export interface IJSLinksInternal extends IInternalHead {
    // tslint:disable-next-line:max-line-length
    createTag(name: 'script', attrs: IHeadTagAttrs, content?: string, eventHandlers?: IHeadTagEventHandlers): IHeadTagId;
    getData(id?: IHeadTagId): JML[] | JML;
}
export type KeyJSLinksInternal = keyof IJSLinksInternal;

export interface IJSLinks extends IJSLinksInternal, IStore<IJSLinksInternal> {}
