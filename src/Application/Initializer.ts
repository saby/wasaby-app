/// <amd-module name="Application/Initializer" />
import { App } from 'Application/Env';
import { IEnvFactory } from "Application/_Interface/IEnv";
import { ISerializableState } from 'Application/_Interface/ISerializableState';
import { IStateReceiver } from "Application/_Interface/IStateReceiver";
import { HashMap } from "Application/_Type";
import { Config } from "Application/Config";
import { EnvFactory, StateReceiver } from 'Application/Env';
import Request from 'Application/Request';

export default function init(
    data?: HashMap<string>,
    Env: IEnvFactory = EnvFactory,
    stateReceiver: IStateReceiver = new StateReceiver(),
): Request {
    // if (isInit()) {
    //     App.startRequest(data, stateReceiver);
    //     App.getRequest().console.warn(
    //         "Повторная инициализация Application!\n" +
    //         "Необходимо выписать задачу ответсвенному за Окружение (Application), приложить стек вызовов в debug режиме:\n" +
    //         new Error("Повторный старт Application").stack
    //     );
    //     return;
    // }
    // new App(data, Env.create(new Config(data)), stateReceiver);
    // if (typeof window === 'undefined') { return; }
    // App.getRequest().console.warn(
    //     "Эта функция браузера предназначена для разработчиков.\n" +
    //     "Если кто-то сказал вам скопировать и вставить что-то здесь, это мошенники.\n" +
    //     "Выполнив эти действия, вы предоставите им доступ к своему аккаунту.\n"
    // );
    //#region удалить после https://online.sbis.ru/opendoc.html?guid=59f87611-f87f-404e-bb27-06350248d6b2
    const config = new Config(data);
    stateReceiver.register(config.getUID(), config);
    const request = new Request(Env.create(config), config);
    request.setStateReceiver(stateReceiver);
    Request.setCurrent(request);

    return request;
    //#endregion
}

export function registerComponent(uid: string, component: ISerializableState) {
    Request.getCurrent().getStateReceiver().register(uid, component);
}

export function isInit(): boolean {
    return !! Request.getCurrent();
}
// export const isInit = App.isInit;
export const startRequest = App.startRequest;
