export default class ConfigBuilder {
    constructor(private config, private buildCallback) {

    }

    public requireCallback(callback) {
        this.config.requireCallback = callback;
        return this;
    }

    public server(server) {
        this.config.connect.server = server;
        return this;
    }

    public connectLimit(limit) {
        this.config.connect.limit = limit;
        return this;
    }

    public connectTimeout(timeout) {
        this.config.connect.timeout = timeout;
        return this;
    }

    build() {
        if (this.config.requireCallback === undefined || typeof this.config.requireCallback !== "function") {
            throw 'requireCallback is empty or not function';
        }

        return this.buildCallback();
    }
}
