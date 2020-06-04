/// <amd-module name="Application/_Env/App" />
import { Config } from "Application/Config";
import EnvBrowser from "Application/_Env/Browser/Env";
import EnvNodeJS from "Application/_Env/NodeJS/Env";
import StateReceiver from "Application/_Env/Browser/StateReceiver";
import { IEnv } from "Application/_Interface/IEnv";
import { IRequest } from 'Application/_Interface/IRequest';
import { IStateReceiver } from "Application/_Interface/IStateReceiver";

const Env = (typeof window === 'undefined') ? EnvNodeJS : EnvBrowser;

export default class App {

    constructor (
        cfg?: Record<string, any>,
        private env: IEnv = new Env(new Config(cfg)),
        stateReceiver: IStateReceiver = new StateReceiver(),
    ) {
        App.instance = this;
        if (env.initRequest) {
            App.startRequest(cfg, stateReceiver);
        }
    }

    static getRequest(): IRequest {
        return App.getInstance().env.getRequest();
    }

    static startRequest(cfg?: Record<string, any>, stateReceiver: IStateReceiver = new StateReceiver()) {
        const config = new Config(cfg);
        stateReceiver.register(config.getUID(), config);
        App.getInstance().env
            .createRequest(config)
            .setStateReceiver(stateReceiver);
    }

    private static instance: App;
    static isInit(): boolean {
        // return !!App.instance;
        // ! удалить после вливания 
        // ! https://online.sbis.ru/opendoc.html?guid=216bcddc-39f2-464a-9480-3a641b454a96
        return !!App.instance?.env.getRequest();
    }
    static getInstance(): App | never {
        if (App.instance) {
            return App.instance;
        }
        const e = new Error("Application isn't initialized!");
        throw new Error(e.stack);
    }
}