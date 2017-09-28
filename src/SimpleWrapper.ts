import {Landy} from "./landy";
import {types} from "./types";
import {lazyInject} from "./container";

export default class SimpleWrapper {

    @lazyInject(types.config.all)
    private config;

    private landy: Landy;

    constructor() {
        console.log('SimpleWrapper constructor', arguments);
        this.landy = new Landy();
    }

    public open(data) {
        console.log('simple open data', data);
        this.landy.setData(data);
        let storedData = this.landy.getData();
        console.log('all stored data:', storedData);
        this.config.requireCallback()
    }

    public getConfig() {
        return this.config;
    }
}