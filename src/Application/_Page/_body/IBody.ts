import type { IStore } from 'Application/_Request/IStore';

/**
 * Внутренний интерфейс IInternalBody, содержит весь основной функционал
 * @private
 */
export interface IInternalBody {
    /**
     * аналогичен методу add для свойства classList на элементе <body>
     */
    addClass(...tokens: string[]): void;
    /**
     * аналогичен методу remove для свойства classList на элементе <body>
     */
    removeClass(...tokens: string[]): void;
    /**
     * заменит классы на <body> из массива removeList на классы из массива addList
     */
    replaceClasses(removeList: string[], addList: string[]): void;
    /**
     * аналогичен методу toggle для свойства classList на элементе <body>
     */
    toggleClass(token: string, force?: boolean): boolean;
    /**
     * аналогичен методу contains для свойства classList на элементе <body>
     */
    containsClass(token: string): boolean;
    /**
     * аналогичен методу toString для свойства classList на элементе <body>
     */
    getClassString(): string;
    /**
     * изоморфная установка аттрибута dir на document.body
     */
    setDir(value: string): void;
    /**
     * получение выставленного значения аттрибута dir из document.body
     */
    getDir(): string;
}

export type KeyInternalBody = keyof IInternalBody;
/**
 * API для работы с <body> страницы
 * @public
 * @author Печеркин С.В.
 * @see https://developer.mozilla.org/ru/docs/Web/API/Element/classList
 */
export interface IBody extends IStore<IInternalBody>, IInternalBody {}
