/// <amd-module name="Application/Initializer" />
import { App } from 'Application/Env';
import { IEnv } from 'Application/_Interface/IEnv';
import { ISerializableState } from 'Application/_Interface/ISerializableState';
import { IStateReceiver } from 'Application/_Interface/IStateReceiver';

export const startRequest = App.startRequest;
export const isInit = App.isInit;
export default function (cfg?: Record<string, unknown>, env?: IEnv, sr?: IStateReceiver): void {
    if (isInit()) {
        App.getRequest().console.warn(
            new Error(
                'Повторная инициализация Application!\n' +
                'Необходимо выписать задачу ответсвенному за Окружение (Application), приложить стек вызовов в debug режиме:\n'
            ).stack
        );
        return;
    }
    // tslint:disable-next-line: no-unused-expression
    new App(cfg, env, sr);
    if (typeof window === 'undefined') { return; }
    App.getRequest().console.log(
        '%c\tЭта функция браузера предназначена для разработчиков.\t\n' +
        '\tЕсли кто-то сказал вам скопировать и вставить что-то здесь, это мошенники.\t\n' +
        '\tВыполнив эти действия, вы предоставите им доступ к своему аккаунту.\t\n',
        'background: red; color: white; font-size: 22px; font-weight: bolder; text-shadow: 1px 1px 2px black;'
    );
};

export const registerComponent = (uid: string, component: ISerializableState) => {
    App.registerSingleton(uid, component);
};
