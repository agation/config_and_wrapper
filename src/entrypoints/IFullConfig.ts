import {IConnectConfig} from "./IConnectConfig";
import {IStorageConfig} from "./IStorageConfig";

export interface IFullConfig {
    clientId: string;
    connect: IConnectConfig;
    storage: IStorageConfig;
}