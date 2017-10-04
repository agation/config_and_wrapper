import {DefaultContainer} from "./defaultContainer";
import {IFullConfig} from "./IFullConfig";
import SimpleWrapper from "../SimpleWrapper";
import NiceWrapper from "../NiceWrapper";
import CoolWrapper from "../CoolWrapper";

type Container = new() => DefaultContainer;

type Wrapper<T> = new(container: DefaultContainer, ...args: any[]) => T;

export class ExportObject {

    public config: IFullConfig;

    private containerType: Container;

    constructor(config: IFullConfig, containerType: Container) {
        this.config = config;
        this.containerType = containerType;
    }

    public simpleWrapper(): SimpleWrapper {
        return ExportObject.createWrapper(SimpleWrapper, this.config, this.containerType);
    }

    public niceWrapper(nice: any): NiceWrapper {
        return ExportObject.createWrapper(NiceWrapper, this.config, this.containerType, nice);
    }

    public coolWrapper(cool: any): CoolWrapper {
        return ExportObject.createWrapper(CoolWrapper, this.config, this.containerType, cool);
    }

    private static createWrapper<T>(wrapperType: Wrapper<T>, config: IFullConfig, containerType: Container, ...args: any[]): T {
        let container = new containerType();
        container.bindConfig(config);
        return new wrapperType(container, ...args);
    }
}
