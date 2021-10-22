import { EventInterface } from './event.interface';

export interface EventBusHandlerInterface {
  handle(event: EventInterface): Promise<any>;
}
