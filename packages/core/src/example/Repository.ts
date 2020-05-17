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
