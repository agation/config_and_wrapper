import {container} from "./container";
import {types} from "./types";
import Storage from "./storage";

function bindDependencies(config) {
    container.unbindAll();

    container.bind(types.storage).to(Storage).inSingletonScope();

    container.bind(types.config.all).toConstantValue(config);
    container.bind(types.config.connect).toConstantValue(config.connect);
    container.bind(types.config.storage).toConstantValue(config.storage);

    return container;
}

export {bindDependencies};



