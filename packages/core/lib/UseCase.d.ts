import { Domain, DomainId } from "./Domain";
export declare class Payload {}
export declare const createAction: (infra?: {
    domainRepository: import("./Repository").DomainMap<DomainId, Domain<DomainId>>;
}) => {
    execute(payload: Payload): void;
};
