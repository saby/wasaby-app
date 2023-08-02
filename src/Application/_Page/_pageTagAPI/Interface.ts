import { IStore } from 'Application/_Request/IStore';

export const SERVER_ID_FIELD = 'sid';

/**
 * Интерфейс объекта, описывающего аттрибуты тега для API Head
 * @interface Application/_Page/_head/IPageTagAttrs
 * @public
 * @author Печеркин С.В.
 */
export interface IPageTagAttrs {
    charset?: string;
    class?: string;
    content?: string;
    'css-theme'?: string;
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
    disabled?: string;
    title?: string;
    media?: string;
    onerror?: string;
    onload?: string;
    [SERVER_ID_FIELD]?: IPageTagId;
    sizes?: string;
    as?: string;
    important?: string;
    crossorigin?: string;
}

/** Аттрибуты тега meta */
export type TMetaAttrs = Pick<
    IPageTagAttrs,
    'name' | 'URL' | 'content' | 'charset' | 'class' | 'property' | 'http-equiv'
>;

/** Аттрибуты HttpEquiv - являются аттрибутами мета, кроме name, который не должен оказаться в HttpEquiv */
export type THttpEquivAttrs = Omit<TMetaAttrs, 'name'>;

/** Аттрибуты тега script */
export type TScriptAttrs = Pick<
    IPageTagAttrs,
    'src' | 'type' | 'key' | 'defer'
>;

/** Аттрибуты favicon */
export type TFaviconAttrs = Pick<
    IPageTagAttrs,
    'href' | 'rel' | 'type' | 'sizes'
>;

/** Аттрибуты шрифтов */
export type TFontAttrs = Pick<IPageTagAttrs, 'href' | 'rel' | 'type' | 'as'>;
/**
 * Интерфейс объекта, описывающего обработчики событий тега для API Head
 * @interface Application/_Page/_head/IPageTagEventHandlers
 * @public
 * @author Печеркин С.В.
 */
export interface IPageTagEventHandlers {
    load?: Function;
    error?: Function;
}

/**
 * Интерфейс одного тега для API Head
 * @interface Application/_Page/_head/IPageTag
 * @property {string} name - имя тега (title, meta, script)
 * @property {IPageTagAttrs} attrs - дополнительные аттрибуты для тега
 * @property {string} content - содержимое тега. Актульано, например, для тега script
 * @public
 * @author Печеркин С.В.
 */
export interface IPageTag {
    name: string;
    attrs: IPageTagAttrs;
    content?: string;
    eventHandlers?: IPageTagEventHandlers;
}
/** Технический интерфейс для разрешения циклических определений в типе JML * @private
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface JsonML extends JML {}
/**
 * Интерфейс для аргумента tagPrior в функции "проверки идентичности аттрибутов" (isEqualAttributes) в head/ElementPS
 * @interface Application/_Page/_head/ITagPrior
 * @public
 */
export interface ITagPrior {
    name: string;
    attrsPrior: string[];
}
/**
 * Структура, которая однозначно описывает 1 тег первого уровня внутри head страницы
 * @interface Application/_Page/_head/IPageTagId
 * @public
 */
export type IPageTagId = string;
/**
 * Тип для описания верстки, прнятый как стандарт в СБИС
 * https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
 */
export type JML = [string, (object | JsonML | string)?, (JsonML | string)?];

/**
 * @interface IPageTagElement класс HTML элемента для вставки в верстку (head, например)
 * @private
 * @property {Function} getData - возвращаем элемент в формате JML, предварительно сгенерировав его
 * @property {Function} getUniqueKey - возвращаем вид уникальности. Если не вернул ничего - не уникален.
 * @property {Function} toPageTag - преобразует текущий Element к формату IPageTag
 * @property {Function} clear - удаляет информацию из свойств класса
 * @property {Function} isEqual - определяем одинаковый ли элемент или нет. Сравниваем по свойствам класса
 * @property {Function} isFit - определяет подходит ли элемент под описание: сходится ли тег и атрибуты
 * @property {Function} isImportant - определяет является ли тег приоритетным и нужно ли его указывать как можно раньше
 * @property {Function} getAttrs - возвращаем аттрибуты элемента
 * @property {Function} setAttrs - устанавливаем атрибуты элемента
 * @property {Function} changeTag - меняет атрибуты элемента
 */
export interface IPageTagElement {
    getData(): JML;
    getUniqueKey(): boolean | string;
    toPageTag(): IPageTag;
    clear(): void;
    isEqual(
        name: string,
        attrs: IPageTagAttrs,
        content?: string,
        eventHandlers?: IPageTagEventHandlers
    ): boolean;
    isFit(name?: string, attrs?: IPageTagAttrs): boolean;
    isImportant(): boolean;
    getAttrs(): IPageTagAttrs;
    setAttrs(attrs: IPageTagAttrs): void;
    changeTag(attrsChange: IPageTagAttrs): void;
}

/**
 * @interface IPageTagAPIAspect - интерфейс аспектов для PageTagAPI
 * @private
 * В объектах, имплементирующих этот интерфейс будет описано то, что отделяет Head API от JSLinks API, например
 * Функционально пересекается с интерфейсом IPageTagAPI. Различающиеся методы описаны отдельно.
 * @see Interface
 */
export interface IPageTagAPIAspect {
    createComment(text: string): void;
    createNoScript(URL: string): void;
    createTag(
        name: string,
        attrs: IPageTagAttrs,
        content: string,
        eventHandlers: IPageTagEventHandlers,
        elements: { [propName: string]: IPageTagElement }
    ): IPageTagElement;
    createMergeTag(name: string, attrs: IPageTagAttrs, content: string): void;
    getComments(wrap?: boolean): string[];
    getData(elements: { [propName: string]: IPageTagElement }): JML[];
    clear(): void;

    /**
     * Генератор уникального идентификатора для каждого тега
     */
    generateGuid(): IPageTagId;
}

/**
 * Внутренний интерфейс IPageTagAPI, содержит весь основной функционал
 * @interface Application/_Page/_pageTagAPI/IPageTagAPIInternal
 * @see https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
 * @private
 * @author Печеркин С.В.
 */
export interface IPageTagAPIInternal {
    /**
     * добавит строку с комментарием внутрь тега <head>
     * @name Application/_Page/_pageTagAPI/IPageTagAPIInternal#createComment
     */
    createComment(text: string): void;
    /**
     * добавит конструкцию noscript с указанным URL
     * @name Application/_Page/_pageTagAPI/IPageTagAPIInternal#createNoScript
     */
    createNoScript(URL: string): void;
    /**
     * добавит тег внутрь <head>. Если такой тег уже есть - перерисует его
     * @name Application/_Page/_pageTagAPI/IPageTagAPIInternal#createTag
     */
    createTag(
        name: string,
        attrs: IPageTagAttrs,
        content?: string,
        eventHandlers?: IPageTagEventHandlers
    ): IPageTagId;
    /**
     * удалит тег из <head>, если он есть
     * @name Application/_Page/_pageTagAPI/IPageTagAPIInternal#deleteTag
     */
    deleteTag(id: IPageTagId): void;
    /**
     * Добавит в спец. очередь данные о теге script.
     * При вставке такого тега в <head>, объединит все данные из очереди в один общий тег.
     * Актуально только на СП.
     * @name Application/_Page/_pageTagAPI/IPageTagAPIInternal#createMergeTag
     */
    createMergeTag(name: string, attrs: IPageTagAttrs, content: string): void;
    /**
     * вернет текущее состояние тегов с учетом их добавления/удаления в формате JsonML
     * @name Application/_Page/_pageTagAPI/IPageTagAPIInternal#getData
     */
    getData(id?: IPageTagId): JML[] | JML;
    /**
     * вернет все зарегистрированные комментарии в виде строк без <!-- --> (wrap)
     * @name Application/_Page/_pageTagAPI/IPageTagAPIInternal#getComments
     */
    getComments(wrap?: boolean): string[];
    /**
     * очистит внутреннее состояние. Имеет смысл вызывать только на ПП
     * @name Application/_Page/_pageTagAPI/IPageTagAPIInternal#clear
     */
    clear(): void;
    /**
     * вернет аттрибуты тега
     * @name Application/_Page/_pageTagAPI/IPageTagAPIInternal#getAttrs
     */
    getAttrs(tagId: IPageTagId): IPageTagAttrs | null;
    /**
     * сменит параметры тега
     * @name Application/_Page/_pageTagAPI/IPageTagAPIInternal#changeTag
     */
    changeTag(tagId: IPageTagId, attrs: IPageTagAttrs): void;
}

export type KeyInternalPageTagAPI = keyof IPageTagAPIInternal;

/**
 * @interface Application/_Page/_pageTagAPI/Interface
 * @see https://wi.sbis.ru/doc/platform/developmentapl/service-development/service-contract/logic/json-markup-language/
 * @public
 * @remark
 * Данный интерфейс является наследником от внутреннего интерфейса.
 * Необходимость во внутреннем интерфейсе обусловенно тем, что
 * IPageTagAPI наследуется от IStore, в Generic которого пробрасывается IPageTagAPIInternal.
 * Typescript не позволяет наследоваться от интерфейса с дженериком собственной сущности.
 * @author Печеркин С.В.
 */
export interface IPageTagAPI
    extends IStore<IPageTagAPIInternal>,
        IPageTagAPIInternal {}
