/**
 * Библиотека для работы с сериализованным состоянием.
 * @library Application/State
 * @includes StateReceiver Application/_State/StateReceiver
 * @includes DisposeControl Application/_State/DisposeControl
 * @includes toMixDisposable Application/_State/DisposeControl#toMixDisposable
 * @author Санников К.А.
 */
export { StateReceiver } from 'Application/_State/StateReceiver';
export { default as DisposeControl, toMixDisposable } from 'Application/_State/DisposeControl';
export { IResourceDisposable } from 'Application/_State/Interfaces';
export { Memoize } from 'Application/_State/memoize';
