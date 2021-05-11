/// <amd-module name="Application/_Interface/IBody" />

import type { IStore } from 'Application/_Request/IStore';

/**
 * API для работы с <body> страницы
 * @interface Application/_Interface/IBody
 * @property {Function} addClass - аналогичен методу add для свойства classList на элементе <body>
 * @property {Function} removeClass - аналогичен методу remove для свойства classList на элементе <body>
 * @property {Function} replaceClasses - заменит классы на <body> из массива removeList на классы из массива addList
 * @property {Function} toggleClass - аналогичен методу toggle для свойства classList на элементе <body>
 * @property {Function} containsClass - аналогичен методу contains для свойства classList на элементе <body>
 * @property {Function} getClassString - аналогичен методу toString для свойства classList на элементе <body>
 * @see https://developer.mozilla.org/ru/docs/Web/API/Element/classList
 */
export interface IInternalBody {
    addClass(...tokens: string[]): void;
    removeClass(...tokens: string[]): void;
    replaceClasses(removeList: string[], addList: string[]): void;
    toggleClass(token: string, force?: boolean): boolean;
    containsClass(token: string): boolean;
    getClassString(): string;
}

export type KeyInternalBody = keyof IInternalBody;
export interface IBody extends IStore<IInternalBody>, IInternalBody {}
