/**
 * Интерфейс ресурса
 * @interface Application/_State/IResourceDisposable
 * @public
 * @author Хамбелов М.И.
 */

export interface IResourceDisposable {
    /**
     * открывает ресурс
     * @param {unknown} owner контрол, которому принадлежит ресурс
     */
    enter(owner: unknown): void;
    /**
     * закрывает ресурс
     * @param {unknown} owner контрол, которому принадлежит ресурс
     */
    dispose(owner: unknown): void;
}
