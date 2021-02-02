/// <amd-module name="Application/_State/DisposeControl" />
import { IResourceDisposable } from 'Application/_State/Interfaces';

/**
 * Класс, который отвечает за сохрание и открытие ресурсов и их освобождение
 */
export default class DisposeControl {
    private _totalResources: IResourceDisposable[] = [];
    constructor(private _owner: unknown) {}

    /** Сохранение и открытие ресурса */
    track(resource: IResourceDisposable): void {
        this._totalResources.push(resource);
        resource.enter(this._owner);
    }

    /** Освобождение всех ресурсов */
    dispose(): void {
        this._totalResources.forEach((res) => res.dispose(this._owner));
        this._totalResources = [];
    }
}
