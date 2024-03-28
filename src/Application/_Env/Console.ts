/* eslint-disable no-console */
/* eslint-disable no-console */
import type { IConsole } from 'Application/_Env/IConsole';

const checkConsoleMethod = (console, method: string) => {
    return console && typeof console[method] === 'function';
};

/**
 * Содержит константы уровня логирования - {@link LogLevel}
 * @class Application/Env/Console
 * @author Санников К.А.
 * @public
 */

/**
 * [typedef] Уровень логирования
 * @class
 * @private
 * @name Application/Env/Console/LogLevel
 * @author Санников К.А.
 * @todo Описать как typedef, когда это будет поддерживать автодока
 *
 */
export enum LogLevel {
    /**
     * @cfg info
     * @name Application/Env/Console/LogLevel#info
     */
    info = 0,
    /**
     * @cfg warning
     * @name Application/Env/Console/LogLevel#warning
     */
    warning = 1,
    /**
     * @cfg error
     * @name Application/Env/Console/LogLevel#error
     */
    error = 2,
}

/**
 * Класс Console
 * @implements Application/_Env/IConsole
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
        return level >= this.__logLevel;
    }

    /**
     * Задать уровень логирования
     * @param {LogLevel} mode
     */
    setLogLevel(mode: LogLevel) {
        this.__logLevel = mode;
    }
    /**
     * Получить уровень логирования
     * @return {LogLevel} loglevel
     */
    getLogLevel(): LogLevel {
        return this.__logLevel;
    }

    info() {
        if (
            this.isShow(LogLevel.info) &&
            checkConsoleMethod(this.__console, 'info')
        ) {
            console.info.apply(console, arguments);
        }
    }

    log() {
        if (
            this.isShow(LogLevel.info) &&
            checkConsoleMethod(this.__console, 'log')
        ) {
            console.log.apply(console, arguments);
        }
    }

    warn() {
        if (!this.isShow(LogLevel.warning)) {
            return;
        }
        if (checkConsoleMethod(this.__console, 'error')) {
            return console.warn.apply(console, arguments);
        }
        if (checkConsoleMethod(this.__console, 'log')) {
            return console.log.apply(console, arguments);
        }
    }

    error() {
        if (
            !this.isShow(LogLevel.error) ||
            !checkConsoleMethod(this.__console, 'error')
        ) {
            return;
        }
        console.error.apply(console, arguments);
    }
}
