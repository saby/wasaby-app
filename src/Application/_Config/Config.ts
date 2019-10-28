/// <amd-module name="Application/_Config/Config" />
import { ISerializableState } from "Application/_Interface/ISerializableState";
import { HashMap, Native } from 'Application/_Type';

/**
 * @class Application/_Config/Config
 * @public
 * @implements Application/Interface/ISerializableState
 * @author Санников К.А.
 */
export default class Config implements ISerializableState {
    constructor(private data: HashMap<Native> = {}, private __uid: string = 'appConfig') {
    }
    /**
     * @param {String} key
     * @return {Native}
     */
    get(key: string): Native {
        return this.data[key];
    }
    /**
     * @return HashMap<Native>
     */
    getState(): HashMap<Native> {
        return this.data;
    }
    /**
     * @param {HashMap<Native>} data
     */
    setState(data: HashMap<Native>) {
        if (!data) {
            return;
        }
        this.data = data;
    }
    /**
     * @return {String}
     */
    getUID() {
        return this.__uid;
    }
}
