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
