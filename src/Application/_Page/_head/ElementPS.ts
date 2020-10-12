import { IHeadTag, IHeadTagAttrs, IHeadTagEventHandlers, JML } from 'Application/_Interface/IHead';

/**
 * Класс HTML элемента для вставки в head.
 * На сервисе представления(СП) необходим в качестве хранения данных.
 * Будет рендериться только на клиенте, используя дочерний класс Element
 * @author Хамбелов М.И.
 */

export default class ElementPS {
    protected _name: string;
    protected _attrs: IHeadTagAttrs;
    protected _content: string;
    protected _eventHandlers: IHeadTagEventHandlers;

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
        const result: JML = ElementPS.generateTag({
            name: this._name,
            attrs: this._attrs,
            content: this._content,
            eventHandlers: this._eventHandlers
        });
        return result;
    }

    /** Определяем одинаковый ли элемент или нет. Сравниваем по свойствам класса */
    isEqual(name: string,
            attrs: IHeadTagAttrs,
            content?: string,
            eventHandlers?: IHeadTagEventHandlers): boolean{
        return false;
    }

    /** Отрисовка элемента в head. Не будет иметь реализации на СП */
    // tslint:disable-next-line:no-empty
    private _render(): void {

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
