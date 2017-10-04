import {inject, injectable, postConstruct} from "inversify";
import {types} from "./types";

type Config = {cleanupTimeout: number};

@injectable()
export default class Storage {

    @inject(types.config.storage)
    private config: any;

    private data = [];

    @postConstruct()
    onInit() {
        console.log('storage created with config', this.config);
    }

    add(data) {
        this.data.push(data);
    }

    getAll() {
        return Promise.resolve(this.data);
    }

}