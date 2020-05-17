import { Domain } from "./Domain";
export declare const createSelector: (infra?: {
    domainRepository: import("./Repository").DomainMap<
        import("./Domain").DomainId,
        Domain<import("./Domain").DomainId>
    >;
}) => {
    select<R>(selector: ({ domain }: { domain?: Domain<any> | undefined }) => R): R;
};
export declare const useSelector: {
    select<R>(selector: ({ domain }: { domain?: Domain<any> | undefined }) => R): R;
};
export declare const getState: () => {
    data: any;
};
