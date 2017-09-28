import Configurator from "../configurator";

let config: any = {
    client: 'two',
    connect: {
        limit: 5,
    }
};

let exportObject = new Configurator().clientConfig(config).exportObject();
export = exportObject;

