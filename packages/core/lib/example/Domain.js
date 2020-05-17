"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domain = exports.DomainId = void 0;
class DomainId {
    constructor(value) {
        this.value = value;
        this.type = "Domain";
    }
}
exports.DomainId = DomainId;
// @Cost: low
class Domain {
    constructor(props) {
        this.id = props.id;
        // other values
        this.data = props.data;
    }
    // domain logic
    work(data) {
        return new Domain(Object.assign(Object.assign({}, this), { data }));
    }
}
exports.Domain = Domain;
//# sourceMappingURL=Domain.js.map
