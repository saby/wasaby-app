import type { IConsole } from 'Application/_Env/IConsole';
/* eslint-disable no-console */
/**
 * Уровень логирования.
 * https://wi.sbis.ru/docs/py/sbis/LogLevel/
 */
export enum LogLevel {
    llDISABLED,
    llMINIMAL,
    llSTANDARD,
    llEXTENDED,
    llDEBUG,
}

/**
 * Функция для отображения значения в консоли при отладке
 */
function globalConsole(level: string, args: any[]) {
    if (typeof console !== 'object' || typeof console[level] !== 'function') {
        return;
    }
    console[level].apply(undefined, args);
}

export default class Console implements IConsole {
    private __logLevel: LogLevel;

    constructor() {
        this.__logLevel = LogLevel.llSTANDARD;
    }

    setLogLevel(mode: number) {
        this.__logLevel = <LogLevel>mode;
    }

    getLogLevel(): number {
        return this.__logLevel;
    }

    info(...args: string[]) {
        globalConsole('info', args);
    }

    log(...args: string[]) {
        globalConsole('log', args);
    }

    warn(...args: string[]) {
        globalConsole('warn', args);
    }

    error(...args: string[]) {
        globalConsole('error', args);
    }
}
