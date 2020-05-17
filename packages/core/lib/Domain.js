"use strict";
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Domain = exports.DomainId = void 0;
var DomainId = /** @class */ (function () {
    function DomainId(value) {
        this.value = value;
        this.type = "Domain";
    }
    return DomainId;
})();
exports.DomainId = DomainId;
var Domain = /** @class */ (function () {
    function Domain(props) {
        this.id = props.id;
        // other values
        this.data = props.data;
    }
    // domain logic
    Domain.prototype.work = function (data) {
        return new Domain(__assign(__assign({}, this), { data: data }));
    };
    return Domain;
})();
exports.Domain = Domain;
//# sourceMappingURL=Domain.js.map
