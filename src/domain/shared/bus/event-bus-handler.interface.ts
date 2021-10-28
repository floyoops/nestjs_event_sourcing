import { DomainEvent } from './event.interface';

export interface EventBusHandlerInterface {
  handle(event: DomainEvent): Promise<any>;
}
