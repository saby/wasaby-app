/**
 * Эмуляция любого Storage браузера
 * @private
 */
export class FakeWebStorage implements Storage {
    private __data: { [key: string]: string } = {};

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

    getKeys(): string[] {
        return Object.keys(this.__data);
    }

    key(index: number) {
        return Object.keys(this.__data)[index];
    }

    clear() {
        this.__data = {};
    }
}
