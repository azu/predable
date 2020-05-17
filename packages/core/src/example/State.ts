import { domainRepository } from "./Repository";
import { PredableSelector } from "../frame/PredableState";

export const createSelector = PredableSelector(function DebuggableSelectorName(infra = { domainRepository }) {
    const get = () => {
        return { domain: infra.domainRepository.read() };
    };
    const select = <R>(selector: ({ domain }: ReturnType<typeof get>) => R) => {
        return selector(get());
    };
    return {
        // @Cost: middle
        get,
        // @Cost: middle
        select,
    };
});
// @Cost: low
export const useSelector = createSelector({ domainRepository });
// State
const initialData = {
    initial: true,
};
// @Cost: high
export const getState = () => {
    return {
        data: useSelector.select(({ domain }) => domain?.data ?? initialData),
    };
};
