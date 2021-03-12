/// <amd-module name="Application/_State/StateReceiver" />
import { IStateReceiver, IStateReceiverMeta } from 'Application/Interface';
import { IConsole } from 'Application/_Interface/IConsole';

/**
 * @author Санников К.
 */

interface ISerializedType {
    serialized: string;
    additionalDeps: { [depPath: string]: boolean; };
}

function getDepsFromSerializer(slr: any): any {
    let moduleInfo;
    const deps = {};
    const modules = slr._linksStorage;
    let parts;
    for (const key in modules) {
        if (modules.hasOwnProperty(key)) {
            moduleInfo = modules[key];
            if (moduleInfo.module) {
                parts = slr.constructor.parseDeclaration(moduleInfo.module);
                deps[parts.name] = true;
            }
        }
    }

    const addDeps = slr._depsStorage || {};
    for (const j in addDeps) {
        if (addDeps.hasOwnProperty(j)) {
            deps[j] = true;
        }
    }
    return deps;
}

/** класс заглушка в случае,
 * если не был передан конструктор UI/_state/Serializer,
 * при создании текущего класса StateReceiver.
 */
class Serializer {
    _linksStorage = {};
    _depsStorage = {};
    deserialize = undefined;
    serializeStrict = undefined;
    static componentOptsReArray: any[] = [
        {
            toFind: /\\/g, // экранируем слеш первым
            toReplace: '\\\\'
        },
        {
            toFind: /<\/(script)/gi,
            toReplace: '<\\/$1'
        },
        {
            toFind: /<!--/g,
            toReplace: '<\\!--'
        },
        {
            toFind: /'/g,
            toReplace: '\\u0027'
        },
        {
            toFind: /\u2028/g,
            toReplace: '\\u000a'
        },
        {
            toFind: /\u2029/g,
            toReplace: '\\u000a'
        },
        {
            toFind: /\n/g,
            toReplace: '\\u000a'
        },
        {
            toFind: /\r/g,
            toReplace: '\\u000d'
        },
        {
            toFind: /[^\\]\\u000a/g,
            toReplace: '\\\\u000a'
        }
    ];

    static parseDeclaration(module: any): { name: string } {
        return {
            name: module
        };
    }
}

/** объект-заглушка
 *  в случае, если не был передан реальный логгер
 */
const logger: IConsole = {

    /** вероятно, в getLogLevel возвращать 0 - плохая идея,
     * но возвращать число требует интерфейс IConsole
     */
    getLogLevel(): number {
        return 0;
    },

    info(...args: any): void {
    },

    log(...args: any): void {
    },

    setLogLevel(logLevel: number): void {
    },

    error(...args: any): void {
    },

    warn(...args: any): void {
    },
};

interface IReceivedStateData {
    /**
     * В общем случае в поле meta.moduleName лежит название модуля, из которого зарегистрировали StateReceiver
     */
    meta: IStateReceiverMeta;
    data: any;
}

export class StateReceiver implements IStateReceiver {
    private receivedStateObjectsArray: Record<string, IReceivedStateData> = {};
    private deserialized: any = {};
    private __serializer;
    private _logger: IConsole;
    constructor(private _constructorSerializer = Serializer) {
    }

    setLogger(Logger: IConsole): void {
        this._logger = Logger;
    }

    private _getLogger(): IConsole {
        if (this._logger) {
            return this._logger;
        }
        this._logger = logger;
        return this._logger;
    }

    private __getSerializer() {
        if (this.__serializer) {
            return this.__serializer;
        }
        this.__serializer = new this._constructorSerializer();
        return this.__serializer;
    }

    serialize(): ISerializedType {
        const slr = this.__getSerializer();
        /**
         * Сериалайзер в своей памяти учитывает предыдущие результаты и может выдать ссылку на объект,
         * если его 2 раза прогнать через один инстанс. Поэтому для проверки один сериалайзер, а для итога другой.
         */
        const slrForCheck = new this._constructorSerializer();
        const serializedMap = {};
        const allAdditionalDeps = {};
        const allRecStates = this.receivedStateObjectsArray;
        Object.keys(allRecStates).forEach((key) => {
            const receivedState = allRecStates[key].data.getState();
            if (!receivedState) { return; }
            try {
                /**
                 * Если удалось сериализовать отдельное состояние, то можно его добавить в общий несериализованный словарь
                 * Раньше в этот словарь добавлялось уже сериализованное значение. И потом словарь еще раз сериализовывался.
                 * Результат: экранирование тремя слешами
                 * https://online.sbis.ru/opendoc.html?guid=3b1fffe6-6f75-411f-989d-f0f90ec2ec46
                 */
                if (JSON.stringify(receivedState, slrForCheck.serializeStrict)) {
                    serializedMap[key] = receivedState;
                }
            } catch (e) {
                let serializedFieldError = '';
                if (typeof(serializedMap[key]) === 'object') {
                    serializedFieldError = `${key}: ${typeof(serializedMap[key])}`;
                } else {
                    serializedFieldError = `${key}: ${serializedMap[key]}`;
                }
                const meta: IStateReceiverMeta = allRecStates[key].meta;
                this._getLogger().error(`${meta?.moduleName || key}, ${serializedFieldError} несериализуемое состояние : ${e}` );
                delete serializedMap[key];
            }
        });
        let serializedState = JSON.stringify(serializedMap, slr.serializeStrict);
        Serializer.componentOptsReArray.forEach(
            (re): void => {
                serializedState = serializedState.replace(re.toFind, re.toReplace);
            }
        );
        const addDeps = getDepsFromSerializer(slr);
        for (const dep in addDeps) {
            if (addDeps.hasOwnProperty(dep)) {
                allAdditionalDeps[dep] = true;
            }
        }

        return {
            serialized: serializedState,
            additionalDeps: allAdditionalDeps
        };
    }

    deserialize(str: string | undefined): void {
        if (!str) { return; }
        const slr = this.__getSerializer();
        try {
            this.deserialized = JSON.parse(str, slr.deserialize);
        } catch (error) {
            this._getLogger().error(`Ошибка десериализации ${str}`, null, error);
        }
    }

    register(meta: string | IStateReceiverMeta, inst: any): void {
        if (typeof meta === 'string') {
            meta = { ulid: meta}
        }
        const key: string = meta.ulid;
        if (this.deserialized[key]) {
            inst.setState(this.deserialized[key]);
            delete this.deserialized[key];
        }
        // todo проверка на сервис представления
        if (typeof process !== 'undefined' && !process.versions) {
            if (typeof this.receivedStateObjectsArray[key] !== 'undefined') {
                const message = '[Application/_State/StateReceiver:register] - Try to register instance more than once ' +
                    `or duplication of keys happened; current key is ${key}`;
                this._getLogger().warn(message, inst);
            }
        }
        this.receivedStateObjectsArray[key] = {meta, data: inst};
    }

    unregister(key: string): void {
        delete this.receivedStateObjectsArray[key];
    }
}
