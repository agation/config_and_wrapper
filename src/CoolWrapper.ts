import {types} from "./types";
import {Landy} from "./landy";
import {lazyInject} from "./container";


export default class CoolWrapper {

    @lazyInject(types.config.all)
    private config;

    private landy: Landy;

    constructor(cool) {
        console.log('CoolWrapper constructor', arguments);
        this.landy = new Landy();
    }

    public open(data) {
        console.log('cool wrapper open data', data);
        this.landy.setData(data);
        let storedData = this.landy.getData();
        console.log('all stored data:', storedData);
        this.config.requireCallback()
    }

    public getConfig() {
        return this.config;
    }
}