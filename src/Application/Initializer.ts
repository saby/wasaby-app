/// <amd-module name="Application/Initializer" />
import { App } from 'Application/Env';
import { IEnv } from "Application/_Interface/IEnv";
import { ISerializableState } from 'Application/_Interface/ISerializableState';
import { IStateReceiver } from "Application/_Interface/IStateReceiver";

export const startRequest = App.startRequest;
export const isInit = App.isInit;
const init = (cfg?: Record<string, any>, env?: IEnv, sr?: IStateReceiver) => {
    if (isInit()) {
        App.getRequest().console.warn(
            "Повторная инициализация Application!" +
            "Необходимо выписать задачу Ибрагимову А.А., приложить стек вызовов" +
            new Error("Повторный вызов Application").stack
        );
        return;
    }
    //#region
    // ! маленький компромисс, чтобы прошли тесты
    // ! удалить после вливания 
    // ! https://online.sbis.ru/opendoc.html?guid=216bcddc-39f2-464a-9480-3a641b454a96
    if (env instanceof Function) {
        // @ts-ignore 
        new App(cfg, new env(), sr);
        return;
    }
    //#endregion
    new App(cfg, env, sr);
};
export default init;

export const registerComponent = (uid: string, component: ISerializableState) => {
    App.getRequest().getStateReceiver().register(uid, component);
};
