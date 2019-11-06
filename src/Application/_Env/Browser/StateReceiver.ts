/// <amd-module name="Application/_Env/Browser/StateReceiver" />
import { HashMap, Native } from "Application/_Type";
import { IConsole, ISerializableState, IStateReceiver } from "Application/Interface";

type StateMap = HashMap<HashMap<Native>>;

/**
 * @typedef {Object} StateReceiverConfig
 * @property {StateMap} [states] states
 * @property {Application/_Interface/IConsole} [console] console
 */
export type StateReceiverConfig = {
    states?: StateMap,
    console?: IConsole
}

/**
 * Класс, реализующий интерфейс {@link Application/_Interface/IStateReceiver},
 * позволяющий сохранять состояние компонентов
 *
 * @class Application/_Env/Browser/StateReceiver
 * @implements Application/_Interface/IStateReceiver
 * @author Заляев А.В
 * @public
 */
// tslint:disable-next-line
export default class StateReceiver implements IStateReceiver {
    private __states: StateMap;
    private __components: HashMap<ISerializableState> = Object.create(null);
    private readonly __console: IConsole;
    constructor(
        states = Object.create(null),
        console?: IConsole
    ) {
        this.__states = states;
        this.__console = console;
    }
    /**
     * Получеие сериализованного состояния всех зарегестрированных компонент
     * @function
     * @name Application/_Env/Browser/StateReceiver#serialize
     * @return {String}
     */
    serialize(): string {
        let states: StateMap = Object.create(null);
        for (let uid in this.__components) {
            states[uid] = this.__components[uid].getState();
        }
        return JSON.stringify(states);
    };

    /**
     * Метод, устанавливающий состояние всем зарегестрированным компонентам.
     * @function
     * @name Application/_Env/Browser/StateReceiver#deserialize
     * @param {String} data
     */
    deserialize(data: string): void {
        try {
            this.__states = JSON.parse(data);
            this.__updateState();
        } catch (error) {
            this.__console && this.__console.error(error);
        }
    };

    /**
     * Регистрация компонентов, состояние которыех необходимо сохранить.
     * @function
     * @name Application/_Env/Browser/StateReceiver#register
     * @param {String} uid идентификатор инстанса, для идентификации сохраненного для него состояния
     * @param {Core/Request/ISerializableState} component Сериализируемый компонент
     */
    register(uid: string, component: ISerializableState): void {
        if (this.__components[uid]) {
            throw new Error('exist'); // TODO fix error message
        }
        this.__components[uid] = component;
        if (this.__states[uid]) {
            this.__setComponentState(uid);
        }
    };
    /**
     * @function
     * @name Application/_Env/Browser/StateReceiver#unregister
     */
    unregister(uid: string) {
        delete this.__components[uid];
    }
    private __updateState() {
        for (let uid in this.__states) {
            this.__setComponentState(uid);
        }
    }
    private __setComponentState(uid: string) {
        let serializableState = this.__components[uid];
        if (serializableState || serializableState.setState) {
            serializableState.setState(this.__states[uid]);
            // После того как отдали состояние компоненту, чистим дубли в себе
            delete this.__states[uid];
        }
    }
}
