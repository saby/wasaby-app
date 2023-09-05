import type { IConsole } from 'Application/_Env/IConsole';
import type {
    ISerializableState,
    IStateReceiver,
    IStateReceiverMeta,
} from 'Application/_State/Interfaces';

const WAIT_BEFORE_MOUNT_TIMEOUT = 5000;

/**
 * @author Санников К.
 * @private
 */

interface ISerializedType {
    serialized: string;
    additionalDeps: { [depPath: string]: boolean };
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

/**
 * Пакет правил для замены при сериализации
 */
export const componentOptsReArray = [
    {
        toFind: /\\/g, // экранируем слеш первым
        toReplace: '\\\\',
    },
    {
        toFind: /<\/(script)/gi,
        toReplace: '<\\/$1',
    },
    {
        toFind: /<!--/g,
        toReplace: '<\\!--',
    },
    {
        toFind: /'/g,
        toReplace: '\\u0027',
    },
    {
        toFind: /\u2028/g,
        toReplace: '\\u000a',
    },
    {
        toFind: /\u2029/g,
        toReplace: '\\u000a',
    },
    {
        toFind: /\n/g,
        toReplace: '\\u000a',
    },
    {
        toFind: /\r/g,
        toReplace: '\\u000d',
    },
    {
        toFind: /[^\\"]\\u000a/g,
        toReplace: '\\\\u000a',
    },
    {
        toFind: /"\\u000a"/g, // если к нам прилетел JML с пустым контентом, он будет содержать "\u000a"
        toReplace: '"\\\\u000a"',
    },
];

/** класс заглушка в случае,
 * если не был передан конструктор UI/_state/Serializer,
 * при создании текущего класса StateReceiver.
 * @private
 */
class Serializer {
    _linksStorage = {};
    _depsStorage = {};
    deserialize = undefined;
    serializeStrict = undefined;

    static parseDeclaration(module: any): { name: string } {
        return {
            name: module,
        };
    }
}

/** объект-заглушка
 *  в случае, если не был передан реальный логгер
 */
const logger: IConsole = {
    /** вероятно, в getLogLevel возвращать 0 - плохая идея,
     * но возвращать число требует интерфейс IConsole
     * @private
     */
    getLogLevel(): number {
        return 0;
    },

    info(...args: any): void {},

    log(...args: any): void {},

    setLogLevel(logLevel: number): void {},

    error(...args: any): void {},

    warn(...args: any): void {},
};

interface IReceivedStateData {
    /**
     * В общем случае в поле meta.moduleName лежит название модуля, из которого зарегистрировали StateReceiver
     */
    meta: IStateReceiverMeta;
    data: any;
}

export class StateReceiver implements IStateReceiver {
    private _receivedStateObjectsArray: Record<string, IReceivedStateData> = {};
    private _receivedStatePromisesArray: Record<
        string,
        Promise<IReceivedStateData | void>
    > = {};
    private _deserialized: any = {};
    private _serialized: ISerializedType;
    private __serializer;
    private _logger: IConsole;
    constructor(private _constructorSerializer = Serializer) {}

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

    waitBeforeMounts(): Promise<unknown> {
        if (!Object.keys(this._receivedStatePromisesArray).length) {
            return Promise.resolve();
        }

        // Promise для ограничения по времени вызов метода ожидания
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(reject, WAIT_BEFORE_MOUNT_TIMEOUT);
        });

        return Promise.race([
            timeoutPromise,
            Promise.all(
                Object.keys(this._receivedStatePromisesArray).map((key) => {
                    return this._receivedStatePromisesArray[key];
                })
            ),
        ]).catch(() => {
            return void 0;
        });
    }

    serialize(): ISerializedType {
        if (this._serialized) {
            const e = new Error(
                'Application/_State/StateReceiver повторный вызов метода serialize'
            );
            this._getLogger().error(e.stack);

            return this._serialized;
        }

        const slr = this.__getSerializer();
        /**
         * Сериалайзер в своей памяти учитывает предыдущие результаты и может выдать ссылку на объект,
         * если его 2 раза прогнать через один инстанс. Поэтому для проверки один сериалайзер, а для итога другой.
         */
        const slrForCheck = new this._constructorSerializer();
        const serializedMap = {};
        const allAdditionalDeps = {};
        const allRecStates = this._receivedStateObjectsArray;
        Object.keys(allRecStates).forEach((key) => {
            const receivedState = allRecStates[key].data.getState();
            if (!receivedState) {
                return;
            }
            try {
                /**
                 * Если удалось сериализовать отдельное состояние, то можно его добавить в общий несериализованный словарь
                 * Раньше в этот словарь добавлялось уже сериализованное значение. И потом словарь еще раз сериализовывался.
                 * Результат: экранирование тремя слешами
                 * https://online.sbis.ru/opendoc.html?guid=3b1fffe6-6f75-411f-989d-f0f90ec2ec46
                 */
                /**
                 * Проверяется возможность сериализации serializedMap[key],
                 * но при этом serializedMap[key] в catch всегда будет равняться undefined
                 * Раньше предполагалось выводить значение, отличное от undefined
                 * https://online.sbis.ru/opendoc.html?guid=1e8f98ea-9c98-4f7c-9376-4e16b24281ab
                 */
                if (
                    JSON.stringify(receivedState, slrForCheck.serializeStrict)
                ) {
                    serializedMap[key] = receivedState;
                }
            } catch (e) {
                const meta: IStateReceiverMeta = allRecStates[key].meta;
                this._getLogger().error(
                    getSerializeError(meta?.moduleName, key, e)
                );
                delete serializedMap[key];
            }
        });
        /** сериализация словаря */
        let serializedState = JSON.stringify(
            serializedMap,
            slr.serializeStrict
        );
        componentOptsReArray.forEach((re): void => {
            serializedState = serializedState.replace(re.toFind, re.toReplace);
        });
        const addDeps = getDepsFromSerializer(slr);
        for (const dep in addDeps) {
            if (addDeps.hasOwnProperty(dep)) {
                allAdditionalDeps[dep] = true;
            }
        }

        this._serialized = {
            serialized: serializedState,
            additionalDeps: allAdditionalDeps,
        };
        return this._serialized;
    }

    deserialize(str: string | undefined): void {
        if (!str) {
            return;
        }
        const slr = this.__getSerializer();
        try {
            this._deserialized = JSON.parse(str, slr.deserialize);
        } catch (error) {
            this._getLogger().error(
                `Ошибка десериализации ${str}`,
                null,
                error
            );
        }
    }

    register(
        meta: string | IStateReceiverMeta,
        data: ISerializableState | Promise<ISerializableState>
    ): void {
        if (data instanceof Promise) {
            return this._registerPromise(
                meta,
                data as Promise<ISerializableState>
            );
        }

        this._registerInst(meta, data as ISerializableState);
    }

    _registerPromise(
        meta: string | IStateReceiverMeta,
        data: Promise<ISerializableState>
    ): void {
        const metaObject: IStateReceiverMeta =
            typeof meta === 'string' ? { ulid: meta } : meta;
        const key: string = metaObject.ulid;

        this._receivedStatePromisesArray[key] = data
            .then((receivedState) => {
                if (!receivedState) {
                    return;
                }

                this._registerInst(meta, {
                    getState: () => {
                        return receivedState as Record<string, any>;
                    },
                    setState: () => {
                        return void 0;
                    },
                });
            })
            .catch((error) => {
                this._getLogger().warn(
                    `${key} ошибка при ожидании результата асинхроного _beforeMount: ${error.message}`
                );
            });
    }

    _registerInst(
        meta: string | IStateReceiverMeta,
        inst: ISerializableState
    ): void {
        const metaObject: IStateReceiverMeta =
            typeof meta === 'string' ? { ulid: meta } : meta;
        const key: string = metaObject.ulid;
        if (this._deserialized[key]) {
            inst.setState(this._deserialized[key]);
            delete this._deserialized[key];
        }
        if (typeof window === 'undefined') {
            if (typeof this._receivedStateObjectsArray[key] !== 'undefined') {
                const message =
                    '[Application/_State/StateReceiver:register]' +
                    ' - Try to register instance more than once ' +
                    `or duplication of keys happened; current key is ${key}`;
                this._getLogger().warn(message, inst);
            }
        }
        this._receivedStateObjectsArray[key] = { meta: metaObject, data: inst };
    }

    unregister(key: string): void {
        delete this._receivedStateObjectsArray[key];
    }
}

function getSerializeError(
    moduleName: string,
    field: string,
    error: Error
): string {
    const reason: string = `${field} несериализуемое состояние: ${error}`;

    if (!moduleName) {
        return `Невозможно выполнить вызванную в прикладном коде сериализацию объекта по причине: ${reason}`;
    }

    return `_beforeMount контрола ${moduleName} вернул объект, который невозможно сериализовать по причине: ${reason}`;
}
