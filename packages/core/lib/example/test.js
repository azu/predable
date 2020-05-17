"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UseCase_1 = require("./UseCase");
const State_1 = require("./State");
console.log("initial state", State_1.getState());
UseCase_1.createAction().execute({
    value: "new value",
});
console.log("updated state", State_1.getState());
//# sourceMappingURL=test.js.map
