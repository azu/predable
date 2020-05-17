import { domainRepository } from "./Repository";
import { Domain, DomainId } from "./Domain";
import { wrapPredableUseCase } from "../frameworks/WrapPredableUseCase";

export class Payload {}
export const createAction = wrapPredableUseCase(function DebuggableUseCaseName(infra = { domainRepository }) {
    return {
        execute(payload: Payload) {
            const domain =
                infra.domainRepository.read() ??
                new Domain({
                    id: new DomainId("unique-id"),
                    data: {},
                });
            // Domain works
            const newDomain = domain.eatData(payload);
            // Domain works
            infra.domainRepository.write(newDomain);
        },
    };
});
