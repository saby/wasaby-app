/**
 * Библиотека для работы с сериализованным состоянием.
 * @library
 * @public
 * @author Санников К.А.
 * @module
 */
export { StateReceiver, componentOptsReArray } from 'Application/_State/StateReceiver';
export { default as DisposeControl, toMixDisposable, Constructor } from 'Application/_State/DisposeControl';
export {
    IResourceDisposable,
    ISerializableState,
    IStateReceiverMeta,
    IStateReceiver,
} from 'Application/_State/Interfaces';
