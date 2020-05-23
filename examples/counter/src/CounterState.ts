import { counterRepository } from "./CounterRepository";
import { memorizePredableStore } from "./frameworks/MemorizePredableStore";

export const createCounterStore = (infra = { counterRepository }) => {
    const get = () => {
        return { counter: infra.counterRepository.read() };
    };
    const select = <R>(selector: (domains: ReturnType<typeof get>) => R): R => {
        return selector(get());
    };
    const onChange = (changeHandler: () => void) => {
        const unListenHandlers = Object.values(infra).map((repository) => {
            return repository.onChange(changeHandler);
        });
        return () => {
            unListenHandlers.forEach((unListen) => unListen());
        };
    };
    return {
        name: "CounterStore",
        // @Cost: middle
        get,
        // @Cost: middle
        select,
        // @Cost, middle
        onChange,
    };
};
// @Cost: low
export const store = memorizePredableStore(createCounterStore());
// @Cost: high
export const getState = () => {
    return {
        count: store.select(({ counter }) => counter?.count ?? 0),
    };
};
export const onChange = store.onChange;
