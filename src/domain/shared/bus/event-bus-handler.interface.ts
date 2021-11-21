import { DomainEvent } from '@domain/shared/bus/domain.event';

export interface EventBusHandlerInterface {
  handle(event: DomainEvent): Promise<any>;
}
