"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getState = exports.useSelector = exports.createSelector = void 0;
const Repository_1 = require("./Repository");
exports.createSelector = (infra = { domainRepository: Repository_1.domainRepository }) => {
    return {
        // @Cost: middle
        select(selector) {
            return selector({ domain: infra.domainRepository.read() });
        },
    };
};
// @Cost: low
exports.useSelector = exports.createSelector({ domainRepository: Repository_1.domainRepository });
// State
const initialData = {
    initial: true,
};
// @Cost: high
exports.getState = () => {
    return {
        data: exports.useSelector.select(({ domain }) => {
            var _a;
            return (_a = domain === null || domain === void 0 ? void 0 : domain.data) !== null && _a !== void 0
                ? _a
                : initialData;
        }),
    };
};
//# sourceMappingURL=State.js.map
