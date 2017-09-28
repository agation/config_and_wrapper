export const defaultConfig = {
    requireCallback: () => {},
    connect: {
        server: 'wss://server.com:8090/',
        limit: 10,
        timeout: 20,
    },
    storage: {
        cleanupTimeout: 20,
        borderTime: 20
    },
    manager: {
        idleTimeout: 30
    }
};
