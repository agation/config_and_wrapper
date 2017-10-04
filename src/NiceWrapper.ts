import {types} from "./types";
import {Landy} from "./landy";
import {IFullConfig} from "./entrypoints/IFullConfig";
import {DefaultContainer} from "./entrypoints/defaultContainer";

export default class NiceWrapper {

    private config;

    private landy: Landy;

    constructor(container: DefaultContainer, nice) {
        console.log('NiceWrapper constructor', arguments);

        this.config = container.get<IFullConfig>(types.config.all);
        this.landy = container.get<Landy>(types.landy);
    }

    public open(data) {
        console.log('nice wrapper open data', data);
        this.landy.setData(data);
        this.landy.getData().then(storedData => console.log('all stored data:', storedData));
    }

    public getConfig() {
        return this.config;
    }
}