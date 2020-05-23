import { getState, onChange } from "./CounterState";
import { decrementCountUseCase } from "./DecrementCountUseCase";
import { incrementCountUseCase } from "./IncrementCountUseCase";

const countLabel = document.getElementById("js-count") as HTMLSpanElement;
const incrementButton = document.getElementById("js-increment") as HTMLButtonElement;
const decrementButton = document.getElementById("js-decrement") as HTMLButtonElement;
incrementButton.addEventListener("click", () => {
    incrementCountUseCase().execute();
});
decrementButton.addEventListener("click", () => {
    decrementCountUseCase().execute();
});
const update = () => {
    const state = getState();

    countLabel.textContent = `${state.count}`;
};
onChange(update);
update();
