import { default as Request } from 'Application/_Request/Request';

/**
 * Библиотека c классами для работы с запросами и хранилищем
 * @library Application/Request
 * @includes Request Application/_Request/Request
 * @includes Store Application/_Request/Store
 * @public
 * @author Санников К.А.
 */

export default Request;
export { IStore, IStoreMap } from 'Application/_Request/IStore';
export { IRequest } from 'Application/_Request/IRequest';
export { default as Store } from 'Application/_Request/Store';
