/// <amd-module name="Application/Config" />
import Request from "Application/Request";

/**
 * Библиотека Config
 * @library Application/Config
 * @includes Config Application/_Config/Config
 * @public
 * @author Санников К.А.
 */

export { default as Config } from 'Application/_Config/Config'

export function get(key: string) {
    return Request.getCurrent().getConfig().get(key);
}
