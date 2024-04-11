import { ISerializableState, IStateReceiver } from 'Application/State';
import App from './App';

/**
 * Метод, возвращающий {@link Application/State:StateReceiver компонент для восстановления состояний компонентов}.
 * @name Application/Env#getStateReceiver
 * @return {Application/State:StateReceiver}
 *
 * @see Application/State:StateReceiver
 */
export function getStateReceiver(): IStateReceiver {
    return App.getRequest().getStateReceiver();
}

/**
 * Метод-хелпер для работы со {@link Application/State:StateReceiver StateReceiver} в окружении без Wasaby-контрола
 * @param data                  данные, которые на СП необходимо положить в {@link Application/State:StateReceiver StateReceiver} и получить на клиенте
 * @param stateReceiverName     уникальный идентификатор данных в {@link Application/State:StateReceiver StateReceiver},
 *                              он должен быть уникальным в рамках всей страницы
 *
 * @see Application/State:StateReceiver
 */
export function getStateReceiverData<T = unknown>(data: T, stateReceiverName: string): T {
    const receivedData = new StateReceiverData<T>();
    getStateReceiver().register(stateReceiverName, receivedData);

    let result: T;
    if (typeof window === 'undefined') {
        result = data;
        receivedData.setState(data);
    } else {
        result = receivedData.getState();
    }
    return result;
}

class StateReceiverData<T> implements ISerializableState {
    private _state: T;
    getState(): T {
        return this._state;
    }
    setState(data: T): void {
        this._state = data;
    }
}
