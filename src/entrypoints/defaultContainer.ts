import 'reflect-metadata';
import {types} from "../types";
import {Container} from "inversify";
import {IFullConfig} from "./IFullConfig";
import Storage from "../storage";
import {Landy} from "../landy";

export class DefaultContainer extends Container {

    constructor() {
        super();
        this.declareDependencies();
    }

    public bindConfig(config: IFullConfig) {
        this.bind(types.config.all).toConstantValue(config);
        this.bind(types.config.connect).toConstantValue(config.connect);
        this.bind(types.config.storage).toConstantValue(config.storage);
    }

    protected declareDependencies() {
        this.bind(types.storage).to(Storage).inSingletonScope();
        this.bind(types.landy).to(Landy).inSingletonScope();
    }
}