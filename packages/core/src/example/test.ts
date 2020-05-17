import { createAction } from "./UseCase";
import { getState } from "./State";

console.log("initial state", getState()); // { data: { initial: true } }
createAction().execute({
    value: "new value",
});
console.log("updated state", getState()); // { data: { value: 'new value' } }
