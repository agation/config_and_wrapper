import Configurator from "../configurator";

let config: any = {
    client: 'one plus one 4',
    connect: {
        limit: 10,
    }
};

let exportObject = new Configurator().clientConfig(config).exportObject();
export = exportObject;

