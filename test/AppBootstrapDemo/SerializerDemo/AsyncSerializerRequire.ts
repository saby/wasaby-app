/* eslint-disable-next-line */
// @ts-ignore
import * as template from 'wml!AppBootstrapDemo/SerializerDemo/AsyncSerializerRequire';
import { Control, TemplateFunction } from 'UI/Base';

interface IReceivedStateSerializer {
    checkFunction?: () => string;
}

/**
 * Демка для проверки сериализации функции на сервере, которую мы получаем через require другого модуля
 * И возвращаем на клиент в receivedState через промис асинхронно
 */
export default class AsyncSerializerRequire extends Control<{}, IReceivedStateSerializer> {
    _template: TemplateFunction = template;
    status: string = 'fail';
    _beforeMount(
        _o?: {},
        _c?: {},
        receivedState?: IReceivedStateSerializer
    ): Promise<IReceivedStateSerializer> {
        // Если функция успешно сериализовалась, её можно использовать на клиенте.
        // В зависимости от того, выполнено это условие или нет, в шаблоне отрисуется "success" или "fail".
        if (receivedState?.checkFunction() === 'result') {
            this.status = 'success';
            return;
        }
        // при работе с wasaby-cli и локальном развороте теста - requirejsloader не патчится нужным функционалом:
        // перестает работать сериализация функции, что и проверяет данный тест.
        // поэтому вручную запатчим requirejsloader
        if (!requirejs.defined('RequireJsLoader/autoload')) {
            requirejs(['RequireJsLoader/autoload']);
        }
        return new Promise((resolve) => {
            // Выполним на сервере асинхронный require модуля,
            // генерирующий объект, который содержит функцию
            requirejs(['AppBootstrapDemo/SerializerDemo/ModuleToRequire'], (result) => {
                // Объект, переданный в resolve в _beforeMount на сервере, сериализуется и приходит в
                // _beforeMount на клиенте как receivedState (то есть третьим аргументом).
                resolve({ checkFunction: result.customFunction });
            });
        });
    }
}
