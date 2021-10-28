import { DomainEvent } from './event.interface';

export interface EventHandlerInterface {
  handle(event: DomainEvent): Promise<any>;
}
