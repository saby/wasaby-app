///// <amd-module name="Application/_Page/_head/ElementPS" />

import { IHeadTag, IHeadTagAttrs, IHeadTagEventHandlers, JML } from 'Application/_Interface/IHead';

/**
 * Класс HTML элемента для вставки в head.
 * На сервисе представления(СП) необходим в качестве хранения данных.
 * Будет рендериться только на клиенте, используя дочерний класс Element
 * @author Хамбелов М.И.
 */

/** шаблон, в котором содержится список тегов и приоритетные аттрибуты,
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
        this._content = content ? String(content) : null;
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
    /** удаляет информацию из свойств класса */
    clear(): void{
        if (!this._isTitle()) {
            delete this._attrs;
            delete this._content;
            delete this._eventHandlers;
            delete this._name;
            this._removeElement();
        }
        else{
            delete this._content;
            this._removeElement();
        }
    }
    /** удаляет элемент из DOM дерева. Нет реализации в ElementPS */
    // tslint:disable-next-line:no-empty
    protected _removeElement(): void{
    }
    /** Определяем одинаковый ли элемент или нет. Сравниваем по свойствам класса */
    isEqual(name: string,
            attrs: IHeadTagAttrs,
            content?: string,
            eventHandlers?: IHeadTagEventHandlers): boolean{
        if (content != this._content || name !== this._name) {
            return false;
        }
        /** найдем в списке тэгов с приоритетным аттрибутами нужный нам тэг.
         * сравнивается только имя в TAGS_PRIOR с именем полученным из вне.
         * имя которое записано в классе сравнивалось с именем из вне ранее.
         */
        const foundTagPrior = TAGS_PRIOR.find(item => item.name === name);
        if (!isEqualAttributes(attrs, this._attrs, foundTagPrior)){
            return false;
        }
        return true;
    }
    /** Определяет подходит ли элемент под описание: сходится ли тег и атрибуты */
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
    _isTitle(): boolean {
        return this._name === 'title';
    }

    /** Отрисовка элемента в head. */
    protected _render(): void {
        this._eventHandlers?.load()
    }

    /** генерируется тэг в формате JML */
    public static generateTag(data: IHeadTag): JML {
        // TODO: Убрать этот патчинг в конце проекта. Ради избавления от data-vdomignore все и затевалось.
        data.attrs['data-vdomignore'] = true;
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

/** сравнивает на идентичность аттрибутов */
function isEqualAttributes(attrs, attrsOrigin, tagPrior){
    /** проверка пришёл ли объект tagPrior и пустоту массива с приоритетными аттрибутами.
     *  При вызове в пустом массиве метода every, результат всегда будет true.
     */
    if (tagPrior && tagPrior.attrsPrior.length) {
        /** сравним каждый элемент из списка приоритетных аттрибутов (tagPrior)
         * с аттрибутами, которые пришли из вне.
         * если ключ и значение аттрибутов совпадают, в таком случае
         * возвращаем из функции true и не делаем обход по всем аттрибутам
         */
        const areEqualPriorTags = tagPrior.attrsPrior.every(attrsPriorKey => {
            /** проверим ключ аттрибутов внешних и ключ из шаблона приоритетных аттрибутов,
             *  значение аттрибутов внешних и значение из записанных аттрибутов класса
             */
            return Object.keys(attrs).some(key => key === attrsPriorKey && attrs[key] === attrsOrigin[key]);
            })
        if (areEqualPriorTags) {
            return true
        }
    }
    /** если приоритетные ключи и значения не найдены или различны,
     * в таком случае сравниваем все аттрибуты
     */
    return Object.keys(attrs).every((key) => {
        return Object.keys(attrsOrigin).some(keyOrigin => keyOrigin === key && attrsOrigin[keyOrigin] === attrs[key])
    });
}
