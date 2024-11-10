/* eslint-disable no-console */
/* eslint-disable no-console */
import type { IConsole } from 'Application/_Env/IConsole';

const checkConsoleMethod = (console: Console, method: string) => {
    return console && typeof console[method as keyof typeof console] === 'function';
};

/**
 * Уровень логирования
 * @public
 * @author Санников К.А.
 *
 */
export enum LogLevel {
    /**
     *
     */
    info = 0,
    /**
     *
     */
    warning = 1,
    /**
     * 
     */
    error = 2,
}

/**
 * Класс Console
 * @author Санников К.А.
 * @private
 */
export default class Console implements IConsole {
    private __logLevel: LogLevel;
    private __console;
    constructor(console: Console) {
        this.__logLevel = LogLevel.info;
        this.__console = console;
    }

    private isShow(level: LogLevel): boolean {
        return level >= this.__logLevel;
    }

    /**
     * Задать уровень логирования
     * @param mode
     */
    setLogLevel(mode: LogLevel) {
        this.__logLevel = mode;
    }
    /**
     * Получить уровень логирования
     * @return loglevel
     */
    getLogLevel(): LogLevel {
        return this.__logLevel;
    }

    info() {
        if (this.isShow(LogLevel.info) && checkConsoleMethod(this.__console, 'info')) {
            console.info.apply(console, arguments as any);
        }
    }

    log() {
        if (this.isShow(LogLevel.info) && checkConsoleMethod(this.__console, 'log')) {
            console.log.apply(console, arguments as any);
        }
    }

    warn() {
        if (!this.isShow(LogLevel.warning)) {
            return;
        }
        if (checkConsoleMethod(this.__console, 'error')) {
            return console.warn.apply(console, arguments as any);
        }
        if (checkConsoleMethod(this.__console, 'log')) {
            return console.log.apply(console, arguments as any);
        }
    }

    error() {
        if (!this.isShow(LogLevel.error) || !checkConsoleMethod(this.__console, 'error')) {
            return;
        }
        console.error.apply(console, arguments as any);
    }
}
