import Storage from "./storage";
import {types} from "./types";
import {inject, injectable, postConstruct} from "inversify";

@injectable()
export class Landy {

    @inject(types.storage)
    private storage;

    @inject(types.config.connect)
    private config;

    @postConstruct()
    onInit() {
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