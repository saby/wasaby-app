// tslint:disable:max-line-length

import type { IHeadTagAttrs, IHeadTagEventHandlers, IHeadTagId, IInternalHead, JML } from 'Application/_Page/_head/IHead';
import type { IStore } from 'Application/_Request/IStore';

export type JSLinksTagId = string;
/**
 * Внутренний интерфейс IJSLinks, содержит весь основной функционал
 * @private
 * @author Хамбелов М.И.
 */
export interface IJSLinksInternal extends IInternalHead {
    /** Добавит jslinks  */
    createTag(name: 'script', attrs: IHeadTagAttrs, content?: string, eventHandlers?: IHeadTagEventHandlers): IHeadTagId;
    /**
     * Переопределенный метод от Head, в котором параметр name всегда должен быть script.
     * Вернет описание тега(ов), если он есть по входным данным: имя тега script и аттрибуты
     */
    getTag(name?: 'script', attrs?: IHeadTagAttrs): JSLinksTagId | JSLinksTagId[] | null;
    /** Вернет текущее состояние тегов в формате JsonML */
    getData(id?: IHeadTagId): JML[] | JML;
}
export type KeyJSLinksInternal = keyof IJSLinksInternal;
/**
 * API для работы с JSLinks
 * @public
 * @author Хамбелов М.И.
 */
export interface IJSLinks extends IJSLinksInternal, IStore<IJSLinksInternal> {}
