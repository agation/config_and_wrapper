import {injectable} from "inversify";
import {types} from "./types";
import {lazyInject} from "./container";

@injectable()
class Storage {

    @lazyInject(types.config.storage)
    private config: any;

    private data = [];

    constructor() {
        console.log('storage created with config', this.config);
    }

    add(data) {
        this.data.push(data);
    }

    getAll() {
        return this.data;
    }

}

export default Storage;