import Storage from "./storage";
import {lazyInject} from "./container";
import {types} from "./types";

export class Landy {

    @lazyInject(types.storage)
    private storage: Storage;

    @lazyInject(types.config.connect)
    private config;

    constructor() {
        console.log('landy created with config.connect', this.config)
    }

    setData(data) {
        this.storage.add(data);
    }

    getData() {
        return this.storage.getAll();
    }

    destroy() {
        console.log('destroy');
    }
}