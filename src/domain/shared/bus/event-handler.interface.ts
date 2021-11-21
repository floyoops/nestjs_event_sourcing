import { DomainEvent } from '@domain/shared/bus/domain.event';

export interface EventHandlerInterface {
  handle(event: DomainEvent): Promise<any>;
}
