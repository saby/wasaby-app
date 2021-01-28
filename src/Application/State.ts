/**
 * Библиотека для работы с сериализованным состоянием.
 * @library Application/State
 * @includes StateReceiver Application/_State/StateReceiver
 * @includes DisposeControl Application/_State/DisposeControl
 * @author Санников К.А.
 */
export { StateReceiver } from 'Application/_State/StateReceiver';
export { default as DisposeControl, IResourceDisposable } from 'Application/_State/DisposeControl';
