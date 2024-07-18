/**
 * Интерфейс для логгера. Для того что бы избавиться от IoC('ILogger').
 * IoC вызывает у нас много непонятных проблем с цикличной зависимостью.
 * @public
 * @author Санников К.А.
 */
export interface IConsole {
    /**
     * Задать уровень логирования
     * @param {Number} logLevel
     */
    setLogLevel(logLevel: number): void;
    /**
     * Получить уровень логирования
     * @return {Number} loglevel
     */
    getLogLevel(): number;
    /**
     * Вывести в консоль информацию
     * @param {*} args
     */
    info(...args: any): void;
    /**
     * Вывести в консоль данные
     * @param {*} args
     */
    log(...args: any): void;
    /**
     * Вывести в консоль предупреждение
     * @param {*} args
     */
    warn(...args: any): void;
    /**
     * Вывести в консоль ошибку
     * @param {*} args
     */
    error(...args: any): void;
}
