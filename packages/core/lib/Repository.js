"use strict";
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
Object.defineProperty(exports, "__esModule", { value: true });
exports.domainRepository = exports.createDomainRepository = exports.DomainMap = void 0;
var DomainMap = /** @class */ (function (_super) {
    __extends(DomainMap, _super);
    function DomainMap() {
        return (_super !== null && _super.apply(this, arguments)) || this;
    }
    DomainMap.prototype.read = function () {
        return this.__last__value__;
    };
    DomainMap.prototype.write = function (entity) {
        return this.set(entity.id, entity);
    };
    DomainMap.prototype.set = function (key, value) {
        _super.prototype.set.call(this, key, value);
        this.__last__value__ = value;
        return this;
    };
    return DomainMap;
})(Map);
exports.DomainMap = DomainMap;
exports.createDomainRepository = function () {
    return new DomainMap();
};
exports.domainRepository = exports.createDomainRepository();
//# sourceMappingURL=Repository.js.map
