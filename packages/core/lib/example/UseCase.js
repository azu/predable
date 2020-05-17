"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAction = exports.Payload = void 0;
const Repository_1 = require("./Repository");
const Domain_1 = require("./Domain");
class Payload {}
exports.Payload = Payload;
exports.createAction = (infra = { domainRepository: Repository_1.domainRepository }) => {
    return {
        execute(payload) {
            var _a;
            const domain =
                (_a = infra.domainRepository.read()) !== null && _a !== void 0
                    ? _a
                    : new Domain_1.Domain({
                          id: new Domain_1.DomainId("unique-id"),
                          data: {},
                      });
            // Domain works
            const newDomain = domain.work(payload);
            // Domain works
            infra.domainRepository.write(newDomain);
        },
    };
};
//# sourceMappingURL=UseCase.js.map
