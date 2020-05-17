// @ts-ignore
import getCompositeSymbol from "composite-symbol";
import { log } from "./Logger";

export type SectorFunction<
    Domain extends {
        [index: string]: any | undefined;
    },
    State extends any
> = { get(): Domain; select(domain: Domain): State; onChange(changeHandler: () => void): void };

type InfraParameter = {
    [index: string]: any;
};
type DomainParameter = {
    [index: string]: any | undefined;
};
type StateParameter = any;
export type CreateSelect<
    Infra extends InfraParameter = any,
    Domain extends DomainParameter = any,
    State extends StateParameter = any
> = (infra: Infra) => SectorFunction<Domain, State>;

export const wrapPredableStore = <State extends StateParameter, Infra extends InfraParameter>(
    createSelect: CreateSelect<Infra>
) => {
    return (infra: Infra) => {
        const selector = createSelect(infra);
        // override select
        const originalSelect = selector.select;
        const cacheMap = new Map<symbol, ReturnType<typeof originalSelect>>();
        const select = (userSelector: (domain: DomainParameter, state?: State) => StateParameter): StateParameter => {
            const domainContainer = selector.get();
            const domainValues = Object.values(domainContainer);
            const cacheKey = getCompositeSymbol(...domainValues);
            if (cacheMap.has(cacheKey)) {
                log(`[${createSelect.name}] No update state`);
                return cacheMap.get(cacheKey) as StateParameter;
            }
            const selectedState = userSelector(domainContainer);
            log(`[${createSelect.name}] Update state`, selectedState);
            cacheMap.set(cacheKey, selectedState);
            return selectedState;
        };
        return {
            get: selector.get,
            onChange: selector.onChange,
            select,
        };
    };
};
