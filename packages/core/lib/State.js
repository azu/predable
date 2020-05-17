"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getState = exports.useSelector = exports.createSelector = void 0;
var Repository_1 = require("./Repository");
exports.createSelector = function (infra) {
    if (infra === void 0) {
        infra = { domainRepository: Repository_1.domainRepository };
    }
    return {
        select: function (selector) {
            return selector({ domain: infra.domainRepository.read() });
        },
    };
};
exports.useSelector = exports.createSelector({ domainRepository: Repository_1.domainRepository });
// State
var initialData = {
    initial: true,
};
exports.getState = function () {
    return {
        data: exports.useSelector.select(function (_a) {
            var _b;
            var domain = _a.domain;
            return (_b = domain === null || domain === void 0 ? void 0 : domain.data) !== null && _b !== void 0
                ? _b
                : initialData;
        }),
    };
};
//# sourceMappingURL=State.js.map
