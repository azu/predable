import { domainRepository } from "./Repository";
import { wrapPredableStore } from "../frameworks/PredableState";

type State = {};
export const createStore = wrapPredableStore(function DebuggableSelectorName(infra = { domainRepository }) {
    let currentState: State | undefined;
    const get = () => {
        return { domain: infra.domainRepository.read() };
    };
    const select = (selector: ({ domain }: ReturnType<typeof get>, prevState?: State) => State) => {
        currentState = selector(get(), currentState);
        return currentState;
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
        // @Cost: middle
        get,
        // @Cost: middle
        select,
        // @Cost, middle
        onChange,
    };
});
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
export const onChange = store.onChange;
