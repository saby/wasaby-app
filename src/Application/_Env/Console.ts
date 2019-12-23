/// <amd-module name='Application/_Env/Console' />
/* tslint:disable:no-console */
/* eslint-disable no-console */
import { IConsole } from 'Application/_Interface/IConsole';

const checkConsoleMethod = (console, method: string) => console && (typeof console[method] === 'function');

/**
 * @module
 * @name Application/_Env/Console
 * @author Санников К.А.
 */

 /**
  * Уровень логирования
  * @typedef {Object} LogLevel
  * @property {Number} [info=0] info
  * @property {Number} [warning=1] warning
  * @property {Number} [error=2] error
  */
export enum LogLevel {
    info = 0,
    warning = 1,
    error = 2
}

/**
 * Класс Console
 * @class Application/_Env/Console/Console
 * @implements Application/_Interface/IConsole
 * @author Санников К.А.
 * @private
 * @see {@link LogLevel}
 */
export default class Console implements IConsole {
    private __logLevel: LogLevel;
    private __console;
    constructor(console) {
        this.__logLevel = LogLevel.info;
        this.__console = console;
    }

    private isShow(level: LogLevel): boolean {
        return level >=  this.__logLevel;
    }

    /**
     * Задать уровень логирования
     * @param {LogLevel} mode
     */
    setLogLevel(mode: LogLevel) {
        this.__logLevel = mode;
    };
    /**
     * Получить уровень логирования
     * @return {LogLevel} loglevel
     */
    getLogLevel(): LogLevel {
        return this.__logLevel;
    };

    info() {
        if (this.isShow(LogLevel.info) && checkConsoleMethod(this.__console, 'info')) {
            console.info.apply(undefined, arguments);
        }
    };

    log() {
        if (this.isShow(LogLevel.info) && checkConsoleMethod(this.__console, 'log')) {
            console.log.apply(undefined, arguments);
        }
    };

    warn() {
        if (!this.isShow(LogLevel.warning)) {
            return;
        }
        if (checkConsoleMethod(this.__console, 'error')) {
            return console.warn.apply(undefined, arguments);
        }
        if (checkConsoleMethod(this.__console, 'log')) {
            return console.log.apply(undefined, arguments);
        }
    };

    error() {
        if (!this.isShow(LogLevel.error) || !checkConsoleMethod(this.__console, 'error')) {
            return;
        }
        console.error.apply(undefined, arguments);
    };
}
