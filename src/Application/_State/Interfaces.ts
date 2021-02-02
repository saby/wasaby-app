/**
 * Интерфейс ресурса
 */
export interface IResourceDisposable {
    /** Открыть ресурс */
    enter(owner: unknown): void;
    /** Освободить ресурс */
    dispose(owner: unknown): void;
}
