import {IFullConfig} from "./IFullConfig";
import {IConnectConfig} from "./IConnectConfig";
import {IStorageConfig} from "./IStorageConfig";

// export const defaultConfig = {
//     connect: {
//         server: 'wss://server.com:8090/',
//         limit: 10,
//         timeout: 20,
//     },
//     storage: {
//         cleanupTimeout: 20,
//         borderTime: 20
//     }
// };

export class DefaultConfig implements IFullConfig {

    protected readonly defaultValues: IFullConfig = {
        clientId: null,
        connect: {
            server: 'wss://server.com:8090/',
            limit: 10,
            timeout: 20
        },
        storage: {
            type: 'memory',
            cleanupTimeout: 20,
            borderTime: 20
        }
    };

    public clientId: string;
    public connect: IConnectConfig;
    public storage: IStorageConfig;

    constructor() {
        DefaultConfig.merge(this, this.defaultValues);
    }

    protected static merge(destination: any, source: any) {
        for (var property in source) {
            let isObject = typeof source[property] === 'object';
            let destNoContain = destination[property] === undefined;

            if (isObject) {
                if (destNoContain) {
                    destination[property] = Object.create(null);
                }
                this.merge(destination[property], source[property]);
                continue;
            }

            if (destNoContain) {
                destination[property] = source[property];
            }
        }
    }
}