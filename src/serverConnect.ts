import {inject, injectable} from "inversify";
import {types} from "./types";
import {setTimeout} from "timers";

@injectable()
export default class ServerConnect {

    @inject(types.config.connect)
    private config;

    @inject(types.fakeServerList)
    private serverList;

    public store(data): Promise<any> {
        return this.connect()
            .then(() => {
                return new Promise((res, rej) => {
                    this.serverList.push(data);
                    res('success');
                })
            });
    }

    public getAllStored() {
        return this.connect()
            .then(() => {
                return new Promise((res, rej) => {
                    res(this.serverList.slice());
                })
            });
    }

    private connect(): Promise<any[]> {
        return new Promise((res, rej) => {
            setTimeout(() => {
                console.log('success connect', this.config.server);
                res();
            }, 1000);
        });
    }
}