import {defaultConfig} from "./defaultConfig";
import ConfigBuilder from "./configBuilder";
import NiceWrapper from "../NiceWrapper";
import CoolWrapper from "../CoolWrapper";
import SimpleWrapper from "../SimpleWrapper";
import {bindDependencies} from "../ioc";

export default class Configurator {

    private config;

    constructor() {
        this.config = this.merge({}, defaultConfig);
    }

    public clientConfig(config) {
        this.config = this.merge(this.config, config);
        return this;
    }

    public exportObject() {
        let exportObj = Object.create(null);

        Object.defineProperty(exportObj, "config", {
            writable: false,
            value: userConfig => {
                this.config = this.merge(this.config, userConfig);
                return exportObj;
            }
        });

        Object.defineProperty(exportObj, "builder", {
            writable: false,
            value: () => new ConfigBuilder(this.config, () => exportObj)
        });

        Object.defineProperty(exportObj, "simpleWrapper", {
            writable: false,
            // value: nice => new SimpleWrapper(this.config)
            value: () => this.createWrapper(SimpleWrapper)
        });

        Object.defineProperty(exportObj, "niceWrapper", {
            writable: false,
            // value: nice => new NiceWrapper(this.config, nice)
            value: nice => this.createWrapper(NiceWrapper, nice)
        });

        Object.defineProperty(exportObj, "coolWrapper", {
            writable: false,
            // value: cool => new CoolWrapper(this.config, cool)
            value: cool => this.createWrapper(CoolWrapper, cool)
        });

        return exportObj;
    }

    private createWrapper(wrapperClass, ...args) {
        let config = this.merge({}, this.config);
        bindDependencies(config);
        return new wrapperClass(...args);
    }

    private merge(destination, ...sources): any {
        for (var i in sources) {
            let source = sources[i];
            if (!source) {
                break;
            }

            for (var property in source) {
                if (typeof source[property] === 'object' && source[property] !== null) {
                    if (!destination[property]) {
                        destination[property] = Object.create(null);
                    }
                    this.merge(destination[property], source[property]);
                } else {
                    destination[property] = source[property];
                }
            }
        }

        return destination;
    }
}