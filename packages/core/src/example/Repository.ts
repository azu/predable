import { EventEmitter } from "events";
import { Domain, DomainId } from "./Domain";

export class DomainMap<K extends DomainId, V extends Domain<K>> extends Map<K, V> {
    private __last__value__: undefined | V;
    private events = new EventEmitter();

    read(): undefined | V {
        return this.__last__value__;
    }

    write(entity: V): this {
        return this.set(entity.id, entity);
    }

    set(key: K, value: V): this {
        super.set(key, value);
        this.__last__value__ = value;
        this.events.emit("change");
        return this;
    }

    onChange(changeHandler: () => void): () => void {
        this.events.addListener("change", changeHandler);
        return () => {
            this.events.removeListener("change", changeHandler);
        };
    }
}

export const createDomainRepository = <T extends Domain<DomainId>>() => {
    return new DomainMap<T["id"], T>();
};

export const domainRepository = createDomainRepository();
