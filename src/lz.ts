function makePropertyInjectDecorator(container) {
    return function(serviceIdentifier) {
        return function(proto: any, key: string): void {

            let resolve = () => {
                return container.get(serviceIdentifier);
            };

            // _proxyGetter(proto, key, resolve);

            Object.defineProperty(proto, key, {
                configurable: true,
                enumerable: true,
                get: function getter() {

                    if (!Reflect.hasMetadata('INJECTION', this, key)) {
                        Reflect.defineMetadata('INJECTION', resolve(), this, key);
                    }
                    return Reflect.getMetadata('INJECTION', this, key);
                },
                set: function setter(newVal: any) {
                    Reflect.defineMetadata('INJECTION', newVal, this, key);
                }
            });

        };
    };
}