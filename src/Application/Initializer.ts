/// <amd-module name="Application/Initializer" />
import { App } from 'Application/Env';
import { IEnv } from "Application/_Interface/IEnv";
import { ISerializableState } from 'Application/_Interface/ISerializableState';
import { IStateReceiver } from "Application/_Interface/IStateReceiver";

export const startRequest = App.startRequest;
export const isInit = App.isInit;
export default function (cfg?: Record<string, any>, env?: IEnv, sr?: IStateReceiver, force: boolean = false) {
    if (isInit()) {
        //#region
        // !REMOVE
        if (env instanceof Function) {
            App.getRequest().console.warn(
                new Error(
                    "Вместо экземпляра окружения передана EnvFactory!\n" +
                    "Необходимо выписать задачу ответсвенному за Окружение (Application), приложить стек вызовов в debug режиме:\n"
                ).stack
            );
        }
        //#endregion
        App.getRequest().console.warn(
            new Error(
                "Повторная инициализация Application!\n" +
                "Необходимо выписать задачу ответсвенному за Окружение (Application), приложить стек вызовов в debug режиме:\n"
            ).stack
        );
        //#region
        // !REMOVE
        force && App.startRequest(cfg, sr);
        //#endregion
        return;
    }
    //#region
    // !REMOVE
    if (env instanceof Function) {
        // @ts-ignore
        env = new env(cfg);
    }
    //#endregion
    new App(cfg, env, sr);
    if (typeof window === 'undefined') { return; }
    App.getRequest().console.warn(
        "Эта функция браузера предназначена для разработчиков.\n" +
        "Если кто-то сказал вам скопировать и вставить что-то здесь, это мошенники.\n" +
        "Выполнив эти действия, вы предоставите им доступ к своему аккаунту.\n"
    );
};

export const registerComponent = (uid: string, component: ISerializableState) => {
    App.getRequest().getStateReceiver().register(uid, component);
};
