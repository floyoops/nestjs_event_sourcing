import { EventBus, IEvent, IEventBus } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FEventBus implements IEventBus {
  constructor(@Inject(EventBus) private readonly eventBus: EventBus) {}

  publish<T extends IEvent>(event: T): any {
    // Store event here.
    console.log('FEventBus::publish');
    return this.eventBus.publish(event);
  }

  publishAll(events: IEvent[]): any {
    // Store event here.
    console.log('FEventBus::publishAll');
    return this.eventBus.publishAll(events);
  }
}
