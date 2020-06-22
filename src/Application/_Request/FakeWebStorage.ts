/// <amd-module name="Application/_Request/FakeWebStorage" />

/**
 * Эмуляция любого Storage браузера
 */
export class FakeWebStorage implements Storage {
    private __data = {};

    // @TODO можно оптимизировать
    get length(): number {
        return Object.keys(this.__data).length;
    }

    getItem(key: string) {
        return this.__data[key];
    }

    setItem(key: string, value: string) {
        this.__data[key] = value;
        return true;
    }

    removeItem(key: string) {
        delete this.__data[key];
    }

    key(index: number) {
        return Object.keys(this.__data)[index];
    }

    clear() {
        this.__data = {};
    }
}