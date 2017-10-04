import {OneConfig} from "./config";
import {ExportObject} from "../exportObject";
import {OneContainer} from "./container";

let exportObject = new ExportObject(new OneConfig(), OneContainer);

export = exportObject;

