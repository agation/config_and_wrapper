import {DefaultConfig} from "../defaultConfig";

export class TwoConfig extends DefaultConfig {

    public clientId: string = 'two';

    constructor() {
        super();
        DefaultConfig.merge(this, this.defaultValues);
    }
}