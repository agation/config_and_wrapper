import 'reflect-metadata';
import {types} from "../types";
import {Container, interfaces} from "inversify";
import {IFullConfig} from "./IFullConfig";
import Storage from "../storage";
import {Landy} from "../landy";
import ServerStorage from "../serverStorage";
import ServerConnect from "../serverConnect";

export class DefaultContainer extends Container {

    constructor() {
        super();
        this.declareDependencies();
    }

    public bindConfig(config: IFullConfig) {
        this.bind(types.config.all).toConstantValue(config);
        this.bind(types.config.connect).toConstantValue(config.connect);
        this.bind(types.config.storage).toConstantValue(config.storage);
        this.bindTypesByConfig(config);
    }

    protected declareDependencies() {
        this.bind(types.storage).to(Storage).inSingletonScope();
        this.bind(types.landy).to(Landy).inSingletonScope();
    }

    protected bindTypesByConfig(config: IFullConfig) {

        if (config.storage.type === 'server') {
            this.rebind(types.storage).to(ServerStorage).inSingletonScope();

            this.bind(types.serverConnect).to(ServerConnect);
            this.bind(types.fakeServerList).toConstantValue([]);

            this.bind(types.serverConnectFactory).toFactory((context: interfaces.Context) =>
                () => context.container.get(types.serverConnect));
        }
    }
}