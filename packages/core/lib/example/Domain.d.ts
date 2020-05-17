export declare class DomainId {
    readonly value: string;
    type: string;
    constructor(value: string);
}
export declare type DomainProps<Id extends DomainId> = {
    id: Id;
    data: any;
};
export declare class Domain<Id extends DomainId> {
    id: Id;
    data: any;
    constructor(props: DomainProps<Id>);
    work(data: any): Domain<Id>;
}
