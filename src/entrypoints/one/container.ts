import {DefaultContainer} from "../defaultContainer";
import {types} from "../../types";
import ServerStorage from "../../serverStorage";
import ServerConnect from "../../serverConnect";
import {interfaces} from "inversify";

export class OneContainer extends DefaultContainer {

    protected declareDependencies() {
        super.declareDependencies();

        this.rebind(types.storage).to(ServerStorage).inSingletonScope();

        this.bind(types.serverConnect).to(ServerConnect);
        this.bind(types.fakeServerList).toConstantValue([]);

        this.bind(types.serverConnectFactory).toFactory((context: interfaces.Context) =>
            () => context.container.get(types.serverConnect));
    }
}
