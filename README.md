# Predable

Predable is type only state management framework.

You can use the framework without framework.

## Concepts

- Work code without a Framework
- Opt-in framework
- Framework help you to debug/develop
- Domain Driven Development(DDD) friendly 

This concept is similar with [Almin.js](https://github.com/almin/almin) and Predable less framework codes.

## Implementations

See Implementations

- Application Code: [packages/core/src/example](packages/core/src/example)
- Framework Code: [packages/core/src/frameworks](packages/core/src/frameworks)

## Architectures

### Domains

Domain has logic. It is just pure JavaScript.

```ts
export class DomainId {
    type = "Domain";

    constructor(public readonly value: string) {}
}

export type DomainProps<Id extends DomainId> = {
    id: Id; // nominal id
    // other values
    data: any;
};
// @Cost: low
export class Domain<Id extends DomainId> {
    id: Id;
    // other values
    data: any;

    constructor(props: DomainProps<Id>) {
        this.id = props.id;
        // other values
        this.data = props.data;
    }

    // domain logic
    eatData(data: any) {
        return new Domain({
            ...this,
            data,
        });
    }
}
```

### Repository

A Repository store a domain instance eventually.
Repositories use Key-Value map object in memory or Database.

```ts
import { Domain, DomainId } from "./Domain";

export class DomainMap<K extends DomainId, V extends Domain<K>> extends Map<K, V> {
    private __last__value__: undefined | V;

    read(): undefined | V {
        return this.__last__value__;
    }

    write(entity: V): this {
        return this.set(entity.id, entity);
    }

    set(key: K, value: V): this {
        super.set(key, value);
        this.__last__value__ = value;
        return this;
    }
}

export const createDomainRepository = <T extends Domain<DomainId>>() => {
    return new DomainMap<T["id"], T>();
};

export const domainRepository = createDomainRepository();
```

### UseCase

UseCase is a procedure that use Domain.
Read a data from repository, Domain work something, and store the domain to repostiory.

```ts
import { domainRepository } from "./Repository";
import { Domain, DomainId } from "./Domain";

export class Payload {}
export const createAction = (infra = { domainRepository }) => {
    return {
        execute(payload: Payload) {
            const domain =
                infra.domainRepository.read() ??
                new Domain({
                    id: new DomainId("unique-id"),
                    data: {},
                });
            // Domain works
            const newDomain = domain.eatData(payload);
            // Domain works
            infra.domainRepository.write(newDomain);
        },
    };
};
``` 

### State

State represent a data for UI-specific.
Domain represent a data for Application.

In sometimes, State and Domain is same value, but a state is beging mapped value from a domain.

```ts
import { domainRepository } from "./Repository";

export const createStore = (infra = { domainRepository }) => {
    const get = () => {
        return { domain: infra.domainRepository.read() };
    };
    const select = <R>(selector: ({ domain }: ReturnType<typeof get>) => R) => {
        return selector(get());
    };
    return {
        // @Cost: middle
        get,
        // @Cost: middle
        select,
    };
};
// @Cost: low
export const store = createStore({ domainRepository });
// State
const initialData = {
    initial: true,
};
// @Cost: high
export const getState = () => {
    return {
        data: store.select(({ domain }) => domain?.data ?? initialData),
    };
};
```

### Entry

There no framework code.

These code can be used as follows.

```ts
import { createAction } from "./UseCase";
import { getState } from "./State";

console.log("initial state", getState()); // { data: { initial: true } }
createAction().execute({
    value: "new value",
});
console.log("updated state", getState()); // { data: { value: 'new value' } }
```

### Opt-in Framework

You can opt-in Predable framework by following changes.

UseCase: 

```diff
+ import { wrapPredableUseCase } from "../frameworks/WrapPredableUseCase";

- export const createAction = (infra = { domainRepository }) => {
+ export const createAction = wrapPredableUseCase(function DebuggableUseCaseName(infra = { domainRepository }) {
```

State:

```diff
+ import { wrapPredableStore } from "../frameworks/PredableState";

- export const createStore = (infra = { domainRepository }) => {
+ export const createStore = wrapPredableStore(function DebuggableSelectorName(infra = { domainRepository }) {
```

This does not change interface, It just wraps your implementations!

Predable framework provide these feature

- Logging: Update State, Call UseCase
- Performance: Memorize state updates

## Changelog

See [Releases page](https://github.com/azu/predable/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/predable/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
