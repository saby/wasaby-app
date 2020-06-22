/// <amd-module name='Application/_Env/NodeJS/Console' />
import { IConsole } from 'Application/Interface';
/* eslint-disable */
enum LogLevel {
    llDISABLED,
    llMINIMAL,
    llSTANDARD,
    llEXTENDED,
    llDEBUG
}
// declare function warningMsg(...args: string[]);
// declare function errorMsg(...args: string[]);

/**
 * Функция для отображения значения в консоле chrome-devtool при отладке
 */
function globalConsole(level: string, args: any[]) {
    if (typeof console !== 'object') {
        return;
    }
    if (typeof console[level] !== 'function') {
        return;
    }

    console[level].apply(undefined, args);
}

export default class Console implements IConsole {
    private __logLevel: LogLevel;

    constructor() {
        this.__logLevel = 2;  // пока не реализовано в СП: LogLevel.llSTANDARD;

    }

    setLogLevel(mode: number) {
        this.__logLevel = <LogLevel> mode;
    };

    getLogLevel(): number {
        return this.__logLevel;
    };

    info(...args: string[]) {
        globalConsole('info', args);
    };

    log(...args: string[]) {
        globalConsole('log', args);
    };

    warn(...args: string[]) {
        globalConsole('warn', args);
    };

    error(...args: string[]) {
        globalConsole('error', args);
    };
}
