/// <amd-module name="Application/_Env/App" />
import { Config } from 'Application/Config';
import { StateReceiver } from 'Application/State';
import EnvBrowser from 'Application/_Env/Browser/Env';
import EnvNodeJS from 'Application/_Env/NodeJS/Env';
import { IEnv } from 'Application/_Interface/IEnv';
import { IRequest } from 'Application/_Interface/IRequest';
import { IStateReceiver } from 'Application/_Interface/IStateReceiver';
import { ISerializableState } from 'Application/_Interface/ISerializableState';

const Env = (typeof window === 'undefined') ? EnvNodeJS : EnvBrowser;
// tslint:disable-next-line: no-any
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
    private static singletonCrossEnv: Map<string, ISerializableState> = new Map();

    static getRequest(): IRequest {
        return App.getInstance().env.getRequest();
    }

    static startRequest(cfg?: TConfig, stateReceiver: IStateReceiver = new StateReceiver()): void {
        const config = new Config(cfg);
        stateReceiver.register(config.getUID(), config);
        const iterator = App.singletonCrossEnv.entries();
        let entry = iterator.next();
        while (!entry.done) {
            stateReceiver.register(entry.value[0], entry.value[1]);
            entry = iterator.next();
        }

        App.getInstance().env
            .createRequest(config)
            .setStateReceiver(stateReceiver);
    }

    /**
     * Метод, для регистрации одиночки, который должен восстанавливать своё состояние на клиенте.
     * @param uid {String} Уникальный идентификатор одиночки.
     * @param component {Application/Interface.ISerializableState} Экземпляр одиночки.
     */
    static registerSingleton(uid: string, component: ISerializableState): void {
        App.singletonCrossEnv.set(uid, component);
        const request = App.getRequest();
        if (request) {
            request.getStateReceiver().register(uid, component);
        }
    }


    static isInit(): boolean {
        return !!App.instance;
    }

    static getInstance(): App | never {
        if (App.instance) {
            return App.instance;
        }
        const e = new Error('Application не инициализирован!' +
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
