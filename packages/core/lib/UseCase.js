"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAction = exports.Payload = void 0;
var Repository_1 = require("./Repository");
var Domain_1 = require("./Domain");
var Payload = /** @class */ (function () {
    function Payload() {}
    return Payload;
})();
exports.Payload = Payload;
exports.createAction = function (infra) {
    if (infra === void 0) {
        infra = { domainRepository: Repository_1.domainRepository };
    }
    return {
        execute: function (payload) {
            var _a;
            var domain =
                (_a = infra.domainRepository.read()) !== null && _a !== void 0
                    ? _a
                    : new Domain_1.Domain({
                          id: new Domain_1.DomainId("unique-id"),
                          data: {},
                      });
            // Domain works
            var newDomain = domain.work(payload);
            // Domain works
            infra.domainRepository.write(newDomain);
        },
    };
};
//# sourceMappingURL=UseCase.js.map
