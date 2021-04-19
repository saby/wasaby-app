///// <amd-module name="Application/_Page/_head/ElementPS" />

import { IHeadTag, IHeadTagAttrs, IHeadTagEventHandlers, ITagPrior, JML } from 'Application/_Interface/IHead';
import { IElementRestoredData } from "Application/_Page/_head/Element";

/**
 * Класс HTML элемента для вставки в head.
 * На сервисе представления(СП) необходим в качестве хранения данных.
 * Будет рендериться только на клиенте, используя дочерний класс Element
 * @author Хамбелов М.И.
 */

/**
 * шаблон, в котором содержится список тегов и приоритетные аттрибуты,
 * по последним будем проходить при сравнении (использование метода isEqual),
 * для того, чтобы не сравнивать все аттрибуты.
 */
const TAGS_PRIOR = [
    {name: 'link', attrsPrior: ['href']},
    {name: 'title', attrsPrior: [] },
    {name: 'script', attrsPrior: ['src', 'data-require-module']},
    {name: 'meta', attrsPrior: ['name', 'content']}
];

/**
 * @interface IHeadElementType описание предназначения сущности типа IHeadElement
 * @property {boolean} isServer - описывает тег на сервере?
 * @property {boolean} isTitle - описывает тег title?
 * @property {boolean} isViewPort - описывает тег meta с параметрами для viewport?
 */
export interface IHeadElementType {
    isServer: boolean;
    isTitle: boolean;
    isViewPort: boolean;
}

/**
 * @interface IHeadElement класс HTML элемента для вставки в head
 * @property {Function} getType - везвращает описание предназначения для инстанса
 * @property {Function} getData - возвращаем элемент в формате JML, предварительно сгенерировав его
 * @property {Function} clear - удаляет информацию из свойств класса
 * @property {Function} isEqual - определяем одинаковый ли элемент или нет. Сравниваем по свойствам класса
 * @property {Function} isFit - определяет подходит ли элемент под описание: сходится ли тег и атрибуты
 * @property {Function} getAttrs - возвращаем аттрибуты элемента
 * @property {Function} setAttrs - устанавливаем атрибуты элемента
 * @property {Function} changeTag - меняет атрибуты элемента
 * @property {Function} isViewPort - описывает ли текущий элемент тег meta с параметрами для viewport?
 * @property {Function} isTitle - описывает ли текущий элемент тег title?
 */
export interface IHeadElement {
    getType(): IHeadElementType;
    getData(): JML;
    clear(): void;
    isEqual(name: string, attrs: IHeadTagAttrs, content?: string, eventHandlers?: IHeadTagEventHandlers): boolean;
    isFit(name?: string, attrs?: IHeadTagAttrs): boolean;
    getAttrs(): IHeadTagAttrs;
    setAttrs(attrs: IHeadTagAttrs): void;
    changeTag(attrsChange: IHeadTagAttrs): void;
    isViewPort(): boolean;
    isTitle(): boolean;
}

export default class ElementPS implements IHeadElement{
    protected _name: string;
    protected _attrs: IHeadTagAttrs;
    protected _content: string;
    protected _eventHandlers: IHeadTagEventHandlers;
    protected _element: HTMLElement;
    constructor(name: string,
                attrs: IHeadTagAttrs,
                content?: string,
                eventHandlers?: IHeadTagEventHandlers,
                element?: HTMLElement) {
        this._name = name;
        this._attrs = {...attrs};
        this._content = content ? String(content) : null;
        this._eventHandlers = eventHandlers;
        this._element = element;
        this._render();
    }

    getType(): IHeadElementType {
        return ElementPS.type;
    }

    getData(): JML {
        return ElementPS.generateTag({
            name: this._name,
            attrs: this._attrs,
            content: this._content,
            eventHandlers: this._eventHandlers
        });
    }

    clear(): void {
        delete this._attrs;
        delete this._content;
        delete this._eventHandlers;
        delete this._name;
        this._removeElement();
    }

    /** удаляет элемент из DOM дерева. Нет реализации в ElementPS */
    // tslint:disable-next-line:no-empty
    protected _removeElement(): void {
    }

    isEqual(name: string,
            attrs: IHeadTagAttrs,
            content?: string,
            eventHandlers?: IHeadTagEventHandlers): boolean {
        // tslint:disable-next-line:triple-equals
        if (content != this._content || name.toLowerCase() !== this._name.toLowerCase()) {
            return false;
        }
        /**
         * найдем в списке тэгов с приоритетным аттрибутами нужный нам тэг.
         * сравнивается только имя в TAGS_PRIOR с именем полученным из вне.
         * имя которое записано в классе сравнивалось с именем из вне ранее.
         */
        const foundTagPrior = TAGS_PRIOR.find(item => item.name === name);
        return isEqualAttributes(attrs, this._attrs, foundTagPrior);
    }

    isFit(name?: string, attrs?: IHeadTagAttrs): boolean {
        if (name && name !== this._name) {
            return false;
        }
        for (const key in attrs) {
            if (attrs[key] !== this._attrs[key]) {
                return false;
            }
        }
        return true;
    }

    getAttrs(): IHeadTagAttrs {
        const attrs = { ...this._attrs };
        // TODO: убрать после реалзации старта от div
        delete attrs['data-vdomignore'];
        return attrs;
    }

    /**
     * @param attrs {IHeadTagAttrs} Объект атрибутов элемента
     */
    setAttrs(attrs: IHeadTagAttrs): void {
        this._attrs = attrs;
    }

    /**
     * @param attrsChange {IHeadTagAttrs} Атрибуты для замены
     */
    changeTag(attrsChange: IHeadTagAttrs): void {
        this.setAttrs(attrsChange);
    }

    isViewPort(): boolean {
        return false;
    }

    isTitle(): boolean {
        return false;
    }

    /** Отрисовка элемента в head. */
    protected _render(): void {
        this._startEvents();
    }

    /** работа с событиями для тега */
    protected _startEvents(): void {
        this._eventHandlers?.load();
    }

    /**
     * Применение атрибутов на DOM элемент
     * @param element
     * @protected
     */
    protected _applyAttrs(element: HTMLElement): void {
        for (const [key, value] of Object.entries(this._attrs)) {
            element.setAttribute(key, value);
        }
        // TODO: убрать после реалзации старта от div
        element.setAttribute('data-vdomignore', 'true');
    }

    static type: IHeadElementType = {
        isServer: true,
        isTitle: false,
        isViewPort: false
    }

    /** генерируется тэг в формате JML */
    static generateTag(data: IHeadTag): JML {
        const result: JML = [data.name];
        // TODO: убрать после реалзации старта от div
        data.attrs['data-vdomignore'] = true;
        if (Object.keys(data.attrs).length) {
            result.push(data.attrs);
        }
        if (data.content) {
            result.push(data.content);
        }
        return result;
    }

    /**
     * Есть 2 путя создать инстанс класса Element:
     * Из мета информации или из реального DOM элемента.
     * Еси из реального элемента, надо восстановить мета информацию.
     * Когда это используется? При оживлении страницы, чтобы Head API собрал информацию, вставленную на серваке.
     * @private
     */
    protected static _restoreElement(element?: HTMLElement): IElementRestoredData {
        const result: IElementRestoredData = {
            name: '',
            attrs: null,
            content: '',
            element
        };

        if (element) {
            result.attrs = {};
            result.name = element.tagName.toLowerCase();
            result.attrs = {};
            Array.prototype.slice.call(element.attributes).forEach((attr) => {
                result.attrs[attr.name] = attr.value;
            });
            result.content = element.innerText;
        }

        return result;
    }
}

/**
 * сравнивает на идентичность аттрибутов
 */
function isEqualAttributes(attrs: IHeadTagAttrs, attrsOrigin: IHeadTagAttrs, tagPrior: ITagPrior): boolean {
    /**
     * проверка пришёл ли объект tagPrior и пустоту массива с приоритетными аттрибутами.
     *  Проверять пустой массив необходимо, т.к. метод every при пустом массиве всегда возвращает true.
     */
    if (tagPrior && tagPrior.attrsPrior.length) {
        /**
         * сравним каждый элемент из списка приоритетных аттрибутов (tagPrior)
         * с аттрибутами, которые пришли из вне.
         * если ключ и значение аттрибутов совпадают, в таком случае
         * возвращаем из функции true и не делаем обход по всем аттрибутам
         */
        const areEqualPriorTags = tagPrior.attrsPrior.every(attrsPriorKey => {
            /**
             * проверим ключ аттрибутов внешних и ключ из шаблона приоритетных аттрибутов,
             * значение аттрибутов внешних и значение из записанных аттрибутов класса
             */
            return Object.keys(attrs).some(key => key === attrsPriorKey && attrs[key] === attrsOrigin[key]);
        });
        if (areEqualPriorTags) {
            return true;
        }
    }
    /**
     * если приоритетные ключи и значения не найдены или различны,
     * в таком случае сравниваем все аттрибуты
     */
    return Object.keys(attrs).every((key) => {
        return Object.keys(attrsOrigin).some(keyOrigin => keyOrigin === key && attrsOrigin[keyOrigin] === attrs[key]);
    });
}
