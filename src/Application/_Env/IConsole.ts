/**
 * Интерфейс для логгера. Для того что бы избавиться от IoC('ILogger').
 * IoC вызывает у нас много непонятных проблем с цикличной зависимостью.
 * @public
 * @author Санников К.А.
 */
export interface IConsole {
    /**
     * Задать уровень логирования
     */
    setLogLevel(logLevel: number): void;
    /**
     * Получить уровень логирования
     */
    getLogLevel(): number;
    /**
     * Вывести в консоль информацию
     */
    info(...args: any): void;
    /**
     * Вывести в консоль данные
     */
    log(...args: any): void;
    /**
     * Вывести в консоль предупреждение
     */
    warn(...args: any): void;
    /**
     * Вывести в консоль ошибку
     */
    error(...args: any): void;
}
