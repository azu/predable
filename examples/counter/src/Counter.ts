export class CounterId {
    type = "counter";

    constructor(public readonly value: string) {}
}

export type CounterProps<Id extends CounterId> = {
    id: Id; // nominal id
    count: number;
};

// @Cost: low
export class Counter<Id extends CounterId> {
    id: Id;
    count: number;

    constructor(props: CounterProps<Id>) {
        this.id = props.id;
        this.count = props.count;
    }

    increment() {
        return new Counter({
            ...this,
            count: this.count + 1,
        });
    }

    decrement() {
        return new Counter({
            ...this,
            count: this.count - 1,
        });
    }

    reset() {
        return new Counter({
            ...this,
            count: 0,
        });
    }
}
