/// <amd-module name="Application/Initializer" />
import { IEnvFactory } from "Application/_Interface/IEnv";
import { ISerializableState } from 'Application/_Interface/ISerializableState';
import { IStateReceiver } from "Application/_Interface/IStateReceiver";
import { HashMap } from "Application/_Type";
import { Config } from "Application/Config";
import { EnvBrowser, StateReceiver } from 'Application/Env';
import Request from 'Application/Request';

export default function init(
    defaultConfigData?: HashMap<string>,
    envFactory: IEnvFactory = EnvBrowser,
    stateReceiver: IStateReceiver = new StateReceiver(),
): Request {
    const config = new Config(defaultConfigData);
    stateReceiver.register(config.getUID(), config);
    const request = new Request(envFactory.create(config), config);
    request.setStateReceiver(stateReceiver);
    Request.setCurrent(request);

    return request;
}

export function registerComponent(uid: string, component: ISerializableState) {
    Request.getCurrent().getStateReceiver().register(uid, component);
}

export function isInit(): boolean {
    return !! Request.getCurrent();
}
