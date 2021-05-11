/// <amd-module name="Application/Initializer" />
import { App, logger } from 'Application/Env';
import { IEnv } from 'Application/_Interface/IEnv';
import type { ISerializableState } from 'Application/_State/ISerializableState';
import { IStateReceiver } from 'Application/_Interface/IStateReceiver';

export const startRequest = App.startRequest;
export const isInit = App.isInit;

let onInitResolve: Function;
const onInintPomise: Promise<void> = new Promise((res) => {
    onInitResolve = res;
});

export default function (cfg?: Record<string, unknown>, env?: IEnv, sr?: IStateReceiver): void {
    if (isInit()) {
        logger.warn(
            new Error(
                'Повторная инициализация Application!\n' +
                'Необходимо выписать задачу ответственному за Окружение (Application), приложить стек вызовов в debug режиме:\n'
            ).stack
        );
        return;
    }
    // tslint:disable-next-line: no-unused-expression
    new App(cfg, env, sr);
    onInitResolve();

    if (typeof window === 'undefined') { return; }
}

export function registerComponent(uid: string, component: ISerializableState): void {
    App.registerSingleton(uid, component);
}

/**
 * Обещание сообщить об инициализации приложения
 * @param callback Function
 * @private
 */
export function then<T = unknown>(callback: () => T): Promise<T> {
    return onInintPomise.then<T>(callback);
}
