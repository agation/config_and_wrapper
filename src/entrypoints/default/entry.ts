import {DefaultConfig} from "../defaultConfig";
import {ExportObject} from "../exportObject";
import {DefaultContainer} from "../defaultContainer";

// maybe resolve client here

let exportObject = new ExportObject(new DefaultConfig(), DefaultContainer);

export = exportObject;

