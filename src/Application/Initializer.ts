/// <amd-module name="Application/Initializer" />
import { App } from 'Application/Env';
import { IEnv } from "Application/_Interface/IEnv";
import { ISerializableState } from 'Application/_Interface/ISerializableState';
import { IStateReceiver } from "Application/_Interface/IStateReceiver";

export const startRequest = App.startRequest;
export const isInit = App.isInit;
const init = (cfg?: Record<string, any>, env?: IEnv, sr?: IStateReceiver) => {
    if (isInit()) { return; }
    new App(cfg, env, sr);
};
export default init;

export const registerComponent = (uid: string, component: ISerializableState) => {
    App.getRequest().getStateReceiver().register(uid, component);
};
