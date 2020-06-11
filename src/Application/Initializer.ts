/// <amd-module name="Application/Initializer" />
import { App } from 'Application/Env';
import { IEnv } from "Application/_Interface/IEnv";
import { ISerializableState } from 'Application/_Interface/ISerializableState';
import { IStateReceiver } from "Application/_Interface/IStateReceiver";
import { Config } from 'Application/Config';

export const startRequest = App.startRequest;
export const isInit = App.isInit;
export default function (cfg?: Record<string, any>, env?: IEnv, sr?: IStateReceiver) {
    if (isInit()) {
        // !FIXME
        App.startRequest(cfg, sr);
        return;
        // App.getRequest().console.warn(
        //     "Повторная инициализация Application!\n" +
        //     "Необходимо выписать задачу Ибрагимову А., приложить стек вызовов в debug режиме:\n" +
        //     new Error("Повторный вызов Application").stack
        // );
        // return;
    }
    //#region
    // !REMOVE
    if (env instanceof Function) {
        // @ts-ignore 
        new App(cfg, new env(new Config(cfg)), sr);
        return;
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
