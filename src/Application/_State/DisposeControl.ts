import { IResourceDisposable } from 'Application/_State/Interfaces';

/**
 * Класс, который отвечает за сохранение и открытие ресурсов и их освобождение
 * Данный класс необходим для того, чтобы следить за всеми ресурсами.
 * Под ресурсами может подразумеваться подписки, метаданные и т.д.
 * Например, в случае если разработчик при удалении какого-либо контрола забудет удалить все подписки,
 * в таком случае данный класс может помочь ему решить данную проблему - т.к.
 * он имеет все информацию на все ресурсы и при удалении контрола он освободит все ресурсы.
 * @example
 * <pre>
 *      // создадим условный класс ресурса, который реализует интерфейс IResourceDisposable
 *      class CustomResource implements IResourceDisposable {
 *           // параметр owner подразумевает из себя какой-либо контрол
 *           enter(owner: CustomClass): void {
 *               owner.setValue();
 *           }
 *           dispose(owner: CustomClass): void {
 *               owner.clearValue();
 *           }
 *           getValue(owner: CustomClass): boolean {
 *               return owner.getValue();
 *           }
 *      }
 *      // создаем DisposeControl и условный ресурс
 *      const resources = new DisposeControl(class1);
 *      // сохраним и откроем два ресурса
 *      resources.track(new CustomResource());
 *      // после этого вызовем метод dispose, который освободит все ресурсы
 *      resources.dispose();
 * </pre>
 * @author Хамбелов М.И.
 * @public
 */
export default class DisposeControl {
    /**
     * @cfg {IResourceDisposable[]} хранит в себе ресурсы
     * @remark
     * Ресурсы в дальнейшем могут быть открыты или освобождены.
     * Примерами ресурсов могут быть:
     * Подписки(ResourceSubscription), метаданные(ResourceMeta), диалоговые окна
     * @see IResourceDisposable
     * @see ResourceSubscription
     * @see ResourceMeta
     */
    private _totalResources: IResourceDisposable[] = [];
    constructor(private _owner: unknown) {}

    /**
     * Сохраняет и открывает ресурс.
     * @param {IResourceDisposable} resource Ресурс.
     */
    track(resource: IResourceDisposable): void {
        this._totalResources.push(resource);
        resource.enter(this._owner);
    }

    /** Освобождение всех ресурсов */
    dispose(): void {
        this._totalResources.forEach((res) => {
            return res.dispose(this._owner);
        });
        this._totalResources = [];
    }
}
/**
 * Тип класса, который может быть создан через new (создан через конструктор).
 * Необходим для миксин-функции toMixDisposable.
 */
type Constructor = new (...args: any[]) => {};

/**
 * функция, которая возвращает класс с примесью для прикрепления и освобождения ресурсов
 * @function
 * @name Application/_State/DisposeControl#toMixDisposable
 * @example
 * <pre>
 *     import { Component } from 'react';
 *     const ReactControl = toMixDisposable<Component>(Component);
 *     const DisposableControl = new ReactControl({}, {readOnly: false, theme: 'default'});
 * </pre>
 * @param Base класс, к которому будут примешиваться методы
 * @return {Application/_State/DisposeControl/ControlDisposable}
 * класс, возвращаемый из миксина, в который примешиваются методы для очистки ресурсов.
 * @public
 */
export function toMixDisposable<TBase extends Constructor>(Base: TBase): TBase {
    /**
     * класс, возвращаемый из миксина, в который примешиваются методы для очистки ресурсов.
     * @class Application/_State/DisposeControl/ControlDisposable
     * @public
     */
    return class ControlDisposable extends Base {
        /**
         * ресурсы контрола, за которыми можно следить и при удалении этого контрола все ресурсы освобождаются
         */
        private _resources = new DisposeControl(Base);
        /**
         * прикрепить ресурс, за которым будет происходить слежка
         * @param {IResourceDisposable} resource ресурс
         */
        protected attach(resource: IResourceDisposable): void {
            this._resources.track(resource);
        }
        /**
         * Освободить все ресурсы
         */
        protected unleash(): void {
            this._resources.dispose();
        }
    };
}
