import {types} from "./types";
import {Landy} from "./landy";
import {lazyInject} from "./container";

export default class NiceWrapper {

    @lazyInject(types.config.all)
    private config;

    private landy: Landy;

    constructor(nice) {
        console.log('NiceWrapper constructor', arguments);
        this.landy = new Landy();
    }

    public open(data) {
        console.log('nice wrapper open data', data);
        this.landy.setData(data);
        let storedData = this.landy.getData();
        console.log('all stored data:', storedData);
        this.config.requireCallback()
    }

    public getConfig() {
        return this.config;
    }
}