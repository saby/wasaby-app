/// <amd-module name="Application/_Interface/IMemoize" />

/**
 * Интерфейс объекта, описывающего Memoize
 * @interface Application/_Interface/IMemoize
 * @public
 * @author Новолокова Н.О.
 */
export interface IMemoize {
    /**
     *  Возвращает функцию, запоминающую результат первого вызова оборачиваемого метода объекта.
     *  При повторных вызовах возвращает единожды вычисленный результат.
     * @param original {Function} Кэшируемая функция
     * @returns Результат выполнения функции
     */
    add(original: Function): Function;

    /**
     * Уничтожает кэшированные данные переданной функции
     * @param original {Function} Кэшируемая функция
     */
    clear(original: Function): void;

    /**
     * Обновляет данные в кэше
     * @param original {Function} Кэшируемая функция
     * @param key {string} Ключ изменяемой записи
     * @param value {string} Новое значение
     */
    refresh(original: Function, key: string, value: string): void;

    /**
     * Удаляет значение из заданной кэшируемой функции
     * @param original {Function} Кэшируемая функция
     * @param key {string} Ключ удаляемой записи
     */
    remove(original: Function, key: string): void
}
