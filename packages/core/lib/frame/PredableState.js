"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = require("../example/Repository");
const createSelect = (infra = { domainRepository: Repository_1.domainRepository }) => {
    const get = () => {
        return { domain: infra.domainRepository.read() };
    };
    const select = (selector) => {
        return selector(get());
    };
    return {
        get,
        select,
    };
};
const PredableSelector = (createSelect) => {
    return (infra) => {
        const selector = createSelect(infra);
        // override select
        const originalSelect = selector.select;
        const cacheMap = new Map();
        selector.select = (userSelector) => {
            const domains = selector.get();
            const selectedState = userSelector(domains);
            cacheMap.set(domains, selectedState);
            return selectedState;
        };
    };
};
//# sourceMappingURL=PredableState.js.map
