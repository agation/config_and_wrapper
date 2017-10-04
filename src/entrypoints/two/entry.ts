import {ExportObject} from "../exportObject";
import {TwoConfig} from "./config";
import {DefaultContainer} from "../defaultContainer";


let exportObject = new ExportObject(new TwoConfig(), DefaultContainer);
export = exportObject;

