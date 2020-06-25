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

export default class NodeConsole implements IConsole {
    private _logLevel: LogLevel;

    constructor() {
        this._logLevel = LogLevel.llSTANDARD;
    }

    setLogLevel(level: LogLevel): void {
        this._logLevel = level;
    };

    getLogLevel(): number {
        return this._logLevel;
    };

    info(...args: string[]): void {
        console.info(...args);
    };

    log(...args: string[]): void {
        console.log(...args);
    };

    warn(...args: string[]): void {
        console.warn(...args);
    };

    error(...args: string[]): void {
        console.error(...args);
    };
}
