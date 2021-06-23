/// <amd-module name="Application/_Page/_head/IHead" />

import type { IStore } from 'Application/_Request/IStore';

/**
 * Интерфейс объекта, описывающего аттрибуты тега для API Head
 * @interface Application/_Page/_head/IHeadTagAttrs
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
 * @interface Application/_Page/_head/IHeadTagEventHandlers
 * @public
 * @author Печеркин С.В.
 */
export interface IHeadTagEventHandlers {
    load?: Function;
    error?: Function;
}

/**
 * Интерфейс одного тега для API Head
 * @interface Application/_Page/_head/IHeadTag
 * @property {string} name - имя тега (title, meta, script)
 * @property {IHeadTagAttrs} attrs - дополнительные аттрибуты для тега
 * @property {string} content - содержимое тега. Актульано, например, для тега script
 * @public
 * @author Печеркин С.В.
 */
export interface IHeadTag {
    name: string;
    attrs: IHeadTagAttrs;
    content?: string;
    eventHandlers?: IHeadTagEventHandlers;
}
/** Технический интерфейс для разрешения циклических определений в типе JML */
// tslint:disable-next-line:no-empty-interface
interface JsonML extends JML {}
/**
 * Структура, которая однозначно описывает 1 тег первого уровня внутри head страницы
 * @interface Application/_Page/_head/IHeadTagId
 * @public
 */
export type IHeadTagId = string;
/**
 * Тип для описания верстки, прнятый как стандарт в СБИС
 * https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
 */
export type JML = [string, (object | JsonML | string)?, (JsonML | string)?];

/**
 * API для работы с <head> страницы.
 * Внутренний интерфейс IHead, содержит весь основной функционал
 * @interface Application/_Page/_head/IInternalHead
 * @see https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
 * @public
 * @author Печеркин С.В.
 */
export interface IInternalHead {
    /**
     * добавит строку с комментарием внутрь тега <head>
     * @name Application/_Page/_head/IInternalHead#createComment
     */
    createComment(text: string): void;
    /**
     * добавит конструкцию noscript с указанным URL
     * @name Application/_Page/_head/IInternalHead#createNoScript
     */
    createNoScript(URL: string): void;
    /**
     * добавит тег внутрь <head>. Если такой тег уже есть - перерисует его
     * @name Application/_Page/_head/IInternalHead#createTag
     */
    createTag(name: string, attrs: IHeadTagAttrs, content?: string, eventHandlers?: IHeadTagEventHandlers): IHeadTagId;
    /**
     * удалит тег из <head>, если он есть
     * @name Application/_Page/_head/IInternalHead#deleteTag
     */
    deleteTag(id: IHeadTagId): void;
    /**
     * вернет текущее состояние тегов с учетом их добавления/удаления в формате JsonML
     * @name Application/_Page/_head/IInternalHead#getData
     */
    getData(id?: IHeadTagId): JML[] | JML;
    /**
     * вернет все зарегистрированные комментарии в виде строк без <!-- --> (wrap)
     * @name Application/_Page/_head/IInternalHead#getComments
     */
    getComments(wrap?: boolean): string[];
    /**
     * очистит внутреннее состояние. Имеет смысл вызывать только на ПП
     * @name Application/_Page/_head/IInternalHead#clear
     */
    clear(): void;
    /**
     * вернет аттрибуты тега
     * @name Application/_Page/_head/IInternalHead#getAttrs
     */
    getAttrs(tagId: IHeadTagId): IHeadTagAttrs | null;
    /**
     * сменит параметры тега
     * @name Application/_Page/_head/IInternalHead#changeTag
     */
    changeTag(tagId: IHeadTagId, attrs: IHeadTagAttrs): void;
}

export type KeyInternalHead = keyof IInternalHead;
/**
 * API для работы с <head> страницы.
 * @interface Application/_Page/_head/IHead
 * @see https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
 * @public
 * @remark
 * Данный интерфейс является наследником от внутреннего интерфейса.
 * Необходимость во внутреннем интерфейсе обусловенно тем, что
 * IHead наследуется от IStore, в Generic которого пробрасывается IInternalHead.
 * Typescript не позволяет наследоваться от интерфейса с дженериком собственной сущности.
 * @author Печеркин С.В.
 */
export interface IHead extends IStore<IInternalHead>, IInternalHead {}

/**
 * Интерфейс для аргумента tagPrior в функции "проверки идентичности аттрибутов" (isEqualAttributes) в head/ElementPS
 * @interface Application/_Page/_head/ITagPrior
 * @public
 */
export interface ITagPrior {
    name: string;
    attrsPrior: string[];
}
