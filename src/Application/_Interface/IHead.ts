/// <amd-module name="Application/_Interface/IHead" />

import { IStore } from 'Application/_Interface/IStore';

/**
 * Интерфейс объекта, описывающего аттрибуты тега для API Head
 * @interface Application/_Interface/IHeadTagAttrs
 * @public
 * @author Печеркин С.В.
 */
export interface IHeadTagAttrs {
    charset?: string;
    class?: string;
    content?: string;
    'css-entity-name'?: string;
    'css-entity-theme'?: string;
    defer?: string;
    href?: string;
    'http-equiv'?: string;
    key?: string;
    name?: string;
    property?: string;
    rel?: string;
    src?: string;
    'theme-type'?: string;
    type?: string;
    URL?: string;
}

/**
 * Интерфейс объекта, описывающего обработчики событий тега для API Head
 * @interface Application/_Interface/IHeadTagEventHandlers
 * @public
 * @author Печеркин С.В.
 */
export interface IHeadTagEventHandlers {
    load?: Function;
    error?: Function;
}

/**
 * Интерфейс одного тега для API Head
 * @interface Application/_Interface/IHeadTag
 * @property {string} name - имя тега (title, meta, script)
 * @property {IHeadTagAttrs} attrs - дополнительные аттрибуты для тега
 * @property {string} content - содержимое тега. Актульано, например, для тега script
 * @author Печеркин С.В.
 */
export interface IHeadTag {
    name: string;
    attrs: IHeadTagAttrs;
    content?: string;
    eventHandlers?: IHeadTagEventHandlers;
}
/** Технический интерфейс для разрешения циклических определений в типе JML */
interface JsonML extends JML {}
/** Структура, которая однозначно описывает 1 тег первого уровня внутри head страницы */
export type IHeadTagId = string;
/**
 * Тип для описания верстки, прнятый как стандарт в СБИС
 * https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
 */
export type JML = [string, (object | JsonML | string)?, (JsonML | string)?];

/**
 * API для работы с <head> страницы
 * @interface Application/_Interface/IHead
 * @property {Function} createComment - добавит строку с комментарием внутрь тега <head>
 * @property {Function} createNoScript - добавит конструкцию noscript с указанным URL
 * @property {Function} createTag - добавит тег внутрь <head>. Если такой тег уже есть - перерисует его
 * @property {Function} getTag - вернет описание тега(ов), если он есть по входным данным: имя тега и какие-то аттрибуты
 * @property {Function} deleteTag - удалит тег из <head>, если он есть
 * @property {Function} getData - вернет текущее состояние тегов с учетом их добавления/удаления в формате JsonML
 * @property {Function} getComments - вернет все зарегистрированные комментарии в виде строк без <!-- --> (wrap)
 * @property {Function} clear - очистит внутреннее состояние. Имеет смысл вызывать только на ПП
 * @property {Function} changeTag - сменит параметры тега
 * @property {Function} getAttrs - вернет аттрибуты тега
 * @see https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
 * @public
 * @author Печеркин С.В.
 */
export interface IInternalHead {
    createComment(text: string): void;
    createNoScript(URL): void;
    createTag(name: string, attrs: IHeadTagAttrs, content?: string, eventHandlers?: IHeadTagEventHandlers): IHeadTagId;
    deleteTag(id: IHeadTagId): void;
    getTag(name?: string, attrs?: IHeadTagAttrs): IHeadTagId | IHeadTagId[] | null;
    getData(id?: IHeadTagId): Array<JML> | JML;
    getComments(wrap?: boolean): string[];
    clear();
    getAttrs(tagId: IHeadTagId): IHeadTagAttrs | void;
    changeTag(tagId: IHeadTagId, attrs: IHeadTagAttrs): void;
}

export interface IHead extends IStore<IInternalHead>, IInternalHead {}
