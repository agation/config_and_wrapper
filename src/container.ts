import 'reflect-metadata';
import getDecorators from 'inversify-inject-decorators';
import {Container} from "inversify";

const container = new Container();
const {lazyInject} = getDecorators(container);

export {container, lazyInject};