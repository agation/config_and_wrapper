import {DefaultConfig} from "../defaultConfig";
import {IConnectConfig} from "../IConnectConfig";

export class OneConfig extends DefaultConfig {

    public clientId: string = 'one to one';

    // public connect: IConnectConfig = {
    public connect: any = {
        server: 'wss://server.com:8401/',
        timeout: 50
    };

    public storage: any = {
        type: 'server'
    };

    constructor() {
        super();
        DefaultConfig.merge(this, this.defaultValues);
    }
}