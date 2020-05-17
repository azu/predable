"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainRepository = exports.createDomainRepository = exports.DomainMap = void 0;
class DomainMap extends Map {
    read() {
        return this.__last__value__;
    }
    write(entity) {
        return this.set(entity.id, entity);
    }
    set(key, value) {
        super.set(key, value);
        this.__last__value__ = value;
        return this;
    }
}
exports.DomainMap = DomainMap;
exports.createDomainRepository = () => {
    return new DomainMap();
};
exports.domainRepository = exports.createDomainRepository();
//# sourceMappingURL=Repository.js.map
