import { Config } from 'Application/Config';
import { StateReceiver } from 'Application/State';
import EnvBrowser from 'Application/_Env/Browser/Env';
import type { IEnv } from 'Application/_Env/IEnv';
import type { IHttpRequest } from 'Application/_Env/IHttpRequest';
import type { IHttpResponse } from 'Application/_Env/IHttpResponse';
import EnvNodeJS from 'Application/_Env/NodeJS/Env';
import type { IRequest } from 'Application/_Request/IRequest';
import type {
    ISerializableState,
    IStateReceiver,
} from 'Application/_State/Interfaces';

const Env = typeof window === 'undefined' ? EnvNodeJS : EnvBrowser;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TConfig = Record<string, any>;

export default class App {
    constructor(
        cfg?: TConfig,
        private env: IEnv = new Env(cfg),
        stateReceiver: IStateReceiver = new StateReceiver()
    ) {
        App.instance = this;
        if (env.initRequest) {
            App.startRequest(cfg, stateReceiver);
        }
    }

    private static instance: App;
    private static singletonCrossEnv: Map<string, ISerializableState> =
        new Map();

    static getRequest(): IRequest {
        return App.getInstance().env.getRequest();
    }

    static startRequest(
        cfg: TConfig,
        stateReceiver: IStateReceiver = new StateReceiver(),
        requestGetter?: () => IHttpRequest,
        responseGetter?: () => IHttpResponse
    ): void {
        const requestConfig = new Config(cfg);
        stateReceiver.register(requestConfig.getUID(), requestConfig);
        const iterator = App.singletonCrossEnv.entries();
        let entry = iterator.next();
        while (!entry.done) {
            stateReceiver.register(entry.value[0], entry.value[1]);
            entry = iterator.next();
        }

        stateReceiver.setLogger(App.getInstance().env.console);
        App.getInstance()
            .env.createRequest(requestConfig, requestGetter, responseGetter)
            .setStateReceiver(stateReceiver);
    }

    /**
     * Метод, для регистрации одиночки, который должен восстанавливать своё состояние на клиенте.
     * @param uid {String} Уникальный идентификатор одиночки.
     * @param component {Application/_State.ISerializableState} Экземпляр одиночки.
     */
    static registerSingleton(uid: string, component: ISerializableState): void {
        App.singletonCrossEnv.set(uid, component);
        const request = App.getRequest();
        if (request) {
            request.getStateReceiver().register(uid, component);
        }
    }

    /**
     * Получить инстанс текущего инициализированного окружения
     */
    static getEnv(): IEnv {
        return App.getInstance().env;
    }

    static isInit(): boolean {
        return !!App.instance;
    }

    static getInstance(): App | never {
        if (App.instance) {
            return App.instance;
        }
        const e = new Error(
            'Application не инициализирован!' +
                '\n\tСкорее всего идет вызов прямо из тела модуля.' +
                '\n\tНеобходимо подниматься по стеку ошибки и смотреть откуда произоеш вызов.' +
                '\n\tСпособы исправления:' +
                '\n\t\t - если результат вызова подставляется в переменную, то просто заменить использование переменной на вызов' +
                '\n\t\t - если результат вызова помещается в поле объекта и этот код не выполняется на СП,' +
                ' то можно определить это свойство динмаческим с помощью Object.defineProperty'
        );
        throw new Error(e.stack);
    }
}
