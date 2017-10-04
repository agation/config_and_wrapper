import {inject, injectable, postConstruct} from "inversify";
import {types} from "./types";
import ServerConnect from "./serverConnect";

type Config = {
    cleanupTimeout: number;
    borderTime: number;
};

@injectable()
export default class ServerStorage {

    @inject(types.config.storage)
    private config: Config;

    @inject(types.serverConnectFactory)
    private  serverConnFactory;

    private data = [];

    @postConstruct()
    onInit() {
        console.log('server storage created with config', this.config);
    }

    add(data) {
        let serverConn: ServerConnect = this.serverConnFactory();
        serverConn.store(data).then(res => {
            res === 'success' ? console.log(data, 'success stored') : 0;
        })
    }

    getAll() {
        let serverConn: ServerConnect = this.serverConnFactory();
        return serverConn.getAllStored();
    }
}