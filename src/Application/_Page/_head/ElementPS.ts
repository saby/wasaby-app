import { IHeadTag, IHeadTagAttrs, IHeadTagEventHandlers, JML } from 'Application/_Interface/IHead';

/**
 * Класс HTML элемента для вставки в head.
 * На сервисе представления(СП) необходим в качестве хранения данных.
 * Будет рендериться только на клиенте, используя дочерний класс Element
 * @author Хамбелов М.И.
 */

/**  шаблон, в котором содержится список тегов и приоритетные аттрибуты,
 * по последним будем проходить при сравнении (использование метода isEqual),
 * для того, чтобы не сравнивать все аттрибуты.
 */
const TAGS_PRIOR = [
    {name: 'link', attrsPrior: ['href']},
    {name: 'title', attrsPrior: [] },
    {name: 'script', attrsPrior: ['src', 'data-require-module']},
    {name: 'meta', attrsPrior: ['name', 'content']},
];

export default class ElementPS {
    protected _name: string;
    protected _attrs: IHeadTagAttrs;
    protected _content: string;
    protected _eventHandlers: IHeadTagEventHandlers;
    protected _element: HTMLElement;
    constructor(name: string,
                attrs: IHeadTagAttrs,
                content?: string,
                eventHandlers?: IHeadTagEventHandlers) {
        this._name = name;
        this._attrs = attrs;
        this._content = content;
        this._eventHandlers = eventHandlers;
        this._render();
    }

    /** Возвращаем элемент в формате JML, предварительно сгенерировав его */
    getData(): JML {
        return ElementPS.generateTag({
            name: this._name,
            attrs: this._attrs,
            content: this._content,
            eventHandlers: this._eventHandlers
        });
    }
    // tslint:disable-next-line:no-empty
    clear(): void{
    }
    // tslint:disable-next-line:no-empty
    _removeElement(): void{
    }
    /** Определяем одинаковый ли элемент или нет. Сравниваем по свойствам класса */
    isEqual(name: string,
            attrs: IHeadTagAttrs,
            content?: string,
            eventHandlers?: IHeadTagEventHandlers): boolean{
        if (!isEqualAttributes(attrs, this._attrs, name) || content !== this._content || name !== this._name) {
            return false;
        }
        return true;
    }

    /** Отрисовка элемента в head. Не будет иметь реализации на СП */
    // tslint:disable-next-line:no-empty
    protected _render(): void {

    }

    /** Определяем одинаковый ли элемент или нет. Сравниваем по свойствам класса */
    public static generateTag(data: IHeadTag): JML {
        const result: JML = [data.name];
        if (Object.keys(data.attrs).length) {
            result.push(data.attrs);
        }
        if (data.content) {
            result.push(data.content);
        }
        return result;
    }
}

function isEqualAttributes(attrsOut, attrsOrigin, tagName){

    /** сравним каждый элемент из списка шаблона приоритетных аттрибутов (TAGS_PRIOR)
     * с аттрибутами, которые пришли из вне.
     * если ключ и значение аттрибутов совпадают, в таком случае
     * возвращаем из функции true и не делаем обход по всем аттрибутам
     */
    const foundTagPrior = TAGS_PRIOR.find(item => item.name === tagName);
    if (foundTagPrior !== -1) {
        const areEqualPriorTags = foundTagPrior.attrsPrior.every(attrsPriorKey => {
            return Object.keys(attrsOut).some(keyOut => {
                /** проверим ключ аттрибутов внешних и ключ из шаблона приоритетных аттрибутов
                 *  значение аттр внешних и значение из записанных аттр класса
                 */
                if (keyOut === attrsPriorKey && attrsOut[keyOut] === attrsOrigin[keyOut]) {
                    return true;
                }
            })
        });
        if (areEqualPriorTags) {
            return true
        }
    }
    /** если приоритетные ключи и значения не найдены или различны,
     * в таком случае сравниваем все аттрибуты
     */
    return Object.keys(attrsOut).every((key) => {
        return Object.keys(attrsOrigin).some(keyOrigin => keyOrigin === key && attrsOrigin[keyOrigin] === attrsOut[key])
    });
}
