/* eslint-disable-next-line */
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/SerializerDemo/SyncSerializerRequire';
import { Control, TemplateFunction } from 'UI/Base';
interface IReceivedStateSerializer {
    checkString: string;
}
/**
 * Демка для проверки сериализации на сервере в синхронном beforeMount
 */
export default class SyncSerializerRequire extends Control<
    {},
    IReceivedStateSerializer
> {
    _template: TemplateFunction = template;
    status: string = 'fail';

    _beforeMount(
        _o?: {},
        _c?: {},
        receivedState?: IReceivedStateSerializer
    ): IReceivedStateSerializer {
        // Если объект успешно сериализовался, его можно использовать на клиенте.
        // В зависимости от того, выполнено это условие или нет, в шаблоне отрисуется "success" или "fail".
        if (receivedState?.checkString === 'result') {
            this.status = 'success';
            return;
        }
        return { checkString: 'result' };
    }
}
