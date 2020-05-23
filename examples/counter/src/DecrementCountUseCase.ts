import { counterRepository } from "./CounterRepository";
import { Counter, CounterId } from "./Counter";
import { wrapPredableUseCase } from "./frameworks/WrapPredableUseCase";

export function DecrementCountUseCase(infra = { counterRepository }) {
    return {
        execute() {
            const domain =
                infra.counterRepository.read() ??
                new Counter({
                    id: new CounterId("unique-id"),
                    count: 0,
                });
            // Domain works
            const newDomain = domain.decrement();
            // Domain works
            infra.counterRepository.write(newDomain);
        },
    };
}

export const decrementCountUseCase = wrapPredableUseCase(DecrementCountUseCase);
