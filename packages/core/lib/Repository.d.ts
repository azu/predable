import { Domain, DomainId } from "./Domain";
export declare class DomainMap<K extends DomainId, V extends Domain<K>> extends Map<K, V> {
    private __last__value__;
    read(): undefined | V;
    write(entity: V): this;
    set(key: K, value: V): this;
}
export declare const createDomainRepository: <T extends Domain<DomainId>>() => DomainMap<T["id"], T>;
export declare const domainRepository: DomainMap<DomainId, Domain<DomainId>>;
