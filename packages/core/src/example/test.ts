import { createAction } from "./UseCase";
import { getState } from "./State";

console.log("initial state", getState());
createAction().execute({
    value: "new value",
});
console.time("start");
console.log("updated state", getState());
console.log("updated state", getState());
console.log("updated state", getState());
console.log("updated state", getState());
console.timeLog("start");
