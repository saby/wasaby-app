// import type { IHeadTagAttrs, IHeadTagEventHandlers, IHeadTagId, IInternalHead, JML } from 'Application/_Page/_head/IHead';
// import type { IStore } from 'Application/_Request/IStore';
//
// export type JSLinksTagId = string;
//
// /**
//  * API для работы с JSLinks
//  * @interface Application/_Interface/IJSLinks
//  * @property {Function} createTag - добавит jslinks
//  * @property {Function} getTag
//  * переопределенный метод от Head, в котором параметр name всегда должен быть script.
//  * Вернет описание тега(ов), если он есть по входным данным: имя тега script и аттрибуты
//  * @property {Function} getData - вернет текущее состояние тегов в формате JsonML
//  * @public
//  * @author Хамбелов М.И.
//  */
// export interface IJSLinksInternal extends IInternalHead {
//     // tslint:disable-next-line:max-line-length
//     createTag(name: 'script', attrs: IHeadTagAttrs, content?: string, eventHandlers?: IHeadTagEventHandlers): IHeadTagId;
//     getTag(name?: 'script', attrs?: IHeadTagAttrs): JSLinksTagId | JSLinksTagId[] | null;
//     getData(id?: IHeadTagId): JML[] | JML;
// }
// export type KeyJSLinksInternal = keyof IJSLinksInternal;
//
// export interface IJSLinks extends IJSLinksInternal, IStore<IJSLinksInternal> {}
