import {
    IPageTag,
    IPageTagAttrs,
    IPageTagElement,
    IPageTagEventHandlers,
    ITagPrior,
    JML,
} from 'Application/_Page/_pageTagAPI/Interface';

/**
 * Базовый класс HTML элемента для вставки в верстку (head, например).
 * @author Печеркин С.В.
 */

/**
 * Шаблон, в котором содержится список тегов и приоритетные аттрибуты,
 * по последним будем проходить при сравнении (использование метода isEqual),
 * для того, чтобы не сравнивать все аттрибуты.
 */
const TAGS_PRIOR = [
    { name: 'link', attrsPrior: ['href'] },
    { name: 'title', attrsPrior: [] },
    { name: 'script', attrsPrior: ['src', 'data-require-module'] },
    { name: 'meta', attrsPrior: ['name', 'content'] },
    { name: 'style', attrsPrior: [] },
];

/**
 * @interface IPageTagElementAspect аспект поведения для 1 элемента
 * @private
 * Например, с какой точки зрения он уникален или как его воткнуть в DOM
 * @property {Function} getUniqueKey - возвращаем вид уникальности. Если не вернул ничего - не уникален.
 * @property {Function} isEqual - определяем одинаковый ли элемент или нет. Сравниваем по свойствам класса
 * @property {Function} getDOMElement - генератор DOM элемента для клиента
 * @property {Function} appendDomElement - метод непосредственного внедрения DOM элемента в DOM дерево
 * @property {Function} removeDOMElement - метод непосредственного удаления DOM элемента из DOM дерева
 * @property {Function} getData - метод генерации JML данных из одного элемента
 */
export interface IPageTagElementAspect {
    getUniqueKey(): boolean | string;
    isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean;
    getDOMElement({ name }: IPageTag): undefined | HTMLElement;
    appendDomElement(element: HTMLElement): void;
    removeDOMElement(element: HTMLElement): void;
    getData({ name, attrs, content, eventHandlers }: IPageTag): JML;
}

export class DefaultAspect implements IPageTagElementAspect {
    getUniqueKey(): boolean | string {
        return false;
    }
    isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean {
        return BaseElement.isEqual(thisTag, otherTag);
    }
    getDOMElement({ name }: IPageTag): undefined | HTMLElement {
        return document.createElement(name);
    }
    appendDomElement(element: HTMLElement): void {
        document.head.appendChild(element);
    }
    removeDOMElement(element: HTMLElement): void {
        document.head.removeChild(element);
    }
    getData({ name, attrs, content, eventHandlers }: IPageTag): JML {
        return BaseElement.generateTag({ name, attrs, content, eventHandlers });
    }
}

export default abstract class BaseElement implements IPageTagElement {
    protected _name: string;
    protected _attrs: IPageTagAttrs;
    protected _content: string;
    protected _eventHandlers: IPageTagEventHandlers;
    protected _element: HTMLElement;
    protected _hydratedElement: HTMLElement;
    protected _aspect: IPageTagElementAspect;
    constructor(
        name: string,
        attrs: IPageTagAttrs,
        content?: string,
        eventHandlers?: IPageTagEventHandlers,
        aspect: IPageTagElementAspect = new DefaultAspect(),
        hydratedElement?: HTMLElement
    ) {
        this._name = name;
        this._attrs = { ...attrs };
        this._content = content ? String(content) : null;
        this._eventHandlers = eventHandlers;
        this._hydratedElement = hydratedElement;
        this._aspect = aspect;
        this._render();
    }

    getUniqueKey(): boolean | string {
        return this._aspect.getUniqueKey();
    }

    getData(): JML {
        return this._aspect.getData(this.toPageTag());
    }

    toPageTag(): IPageTag {
        return {
            name: this._name,
            attrs: this._attrs,
            content: this._content,
            eventHandlers: this._eventHandlers,
        };
    }

    clear(): void {
        delete this._attrs;
        delete this._content;
        delete this._eventHandlers;
        delete this._name;
        this._removeElement();
    }

    /** удаляет элемент из DOM дерева. */
    protected abstract _removeElement(): void;

    isEqual(name: string, attrs: IPageTagAttrs, content?: string): boolean {
        return this._aspect.isEqual(
            {
                name: this._name,
                attrs: this._attrs,
                content: this._content,
            },
            {
                name,
                attrs,
                content,
            }
        );
    }

    isFit(name?: string, attrs?: IPageTagAttrs): boolean {
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

    isImportant(): boolean {
        return false;
    }

    getAttrs(): IPageTagAttrs {
        const attrs = { ...this._attrs };
        return attrs;
    }

    /**
     * @param attrs {IPageTagAttrs} Объект атрибутов элемента
     */
    setAttrs(attrs: IPageTagAttrs): void {
        this._attrs = attrs;
    }

    /**
     * @param attrsChange {IPageTagAttrs} Атрибуты для замены
     */
    abstract changeTag(attrsChange: IPageTagAttrs): void;

    /** Отрисовка элемента в head. */
    protected abstract _render(): void;

    /** генерируется тэг в формате JML */
    static generateTag(data: IPageTag): JML {
        const result: JML = [data.name];
        if (Object.keys(data.attrs).length) {
            result.push(data.attrs);
        }
        if (data.content) {
            result.push(data.content);
        }
        return result;
    }

    static isEqual(thisTag: IPageTag, otherTag: IPageTag): boolean {
        if (
            // eslint-disable-next-line eqeqeq
            otherTag.content != thisTag.content ||
            otherTag.name.toLowerCase() !== thisTag.name.toLowerCase()
        ) {
            return false;
        }
        /**
         * найдем в списке тэгов с приоритетным аттрибутами нужный нам тэг.
         * сравнивается только имя в TAGS_PRIOR с именем полученным из вне.
         * имя которое записано в классе сравнивалось с именем из вне ранее.
         */
        const foundTagPrior = TAGS_PRIOR.find((item) => {
            return item.name === otherTag.name;
        });
        return isEqualAttributes(otherTag.attrs, thisTag.attrs, foundTagPrior);
    }

    static isServer: boolean = typeof window === 'undefined';
}

/**
 * сравнивает на идентичность аттрибутов
 */
function isEqualAttributes(
    attrs: IPageTagAttrs,
    attrsOrigin: IPageTagAttrs,
    tagPrior: ITagPrior
): boolean {
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
        const areEqualPriorTags = tagPrior.attrsPrior.every((attrsPriorKey) => {
            /**
             * проверим ключ аттрибутов внешних и ключ из шаблона приоритетных аттрибутов,
             * значение аттрибутов внешних и значение из записанных аттрибутов класса
             */
            return Object.keys(attrs).some((key) => {
                return key === attrsPriorKey && attrs[key] === attrsOrigin[key];
            });
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
        return Object.keys(attrsOrigin).some((keyOrigin) => {
            return keyOrigin === key && attrsOrigin[keyOrigin] === attrs[key];
        });
    });
}
