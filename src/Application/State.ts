/**
 * Библиотека для работы с сериализованным состоянием.
 * @library Application/State
 * @public
 * @includes StateReceiver Application/_State/StateReceiver
 * @includes DisposeControl Application/_State/DisposeControl
 * @includes toMixDisposable Application/_State/DisposeControl#toMixDisposable
 * @author Санников К.А.
 */
export { StateReceiver, componentOptsReArray } from 'Application/_State/StateReceiver';
export { default as DisposeControl, toMixDisposable } from 'Application/_State/DisposeControl';
export {
    IResourceDisposable,
    ISerializableState,
    IStateReceiverMeta,
    IStateReceiver,
} from 'Application/_State/Interfaces';
