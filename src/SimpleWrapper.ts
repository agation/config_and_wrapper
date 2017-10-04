import {IFullConfig} from "./entrypoints/IFullConfig";
import {DefaultContainer} from "./entrypoints/defaultContainer";
import {Landy} from "./landy";
import {types} from "./types";

export default class SimpleWrapper {

    private config;

    private landy: Landy;

    constructor(container: DefaultContainer) {
        console.log('SimpleWrapper constructor', arguments);

        this.config = container.get<IFullConfig>(types.config.all);
        this.landy = container.get<Landy>(types.landy);
    }

    public open(data) {
        console.log('simple open data', data);
        this.landy.setData(data);
        this.landy.getData().then(storedData => console.log('all stored data:', storedData));
    }

    public getConfig() {
        return this.config;
    }
}