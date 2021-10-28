import { EventBus, IEventPublisher } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { MemoryStore } from '@infra/f-event-bus/store/memory.store';
import { FStoreInterface } from '@infra/f-event-bus/type/f.type';

@Injectable()
export class FEventStorePublisher implements IEventPublisher {
  constructor(
    @Inject(EventBus) private readonly eventBus: EventBus,
    @Inject(MemoryStore) private readonly store: FStoreInterface,
  ) {}

  publish(event) {
    this.eventBus.subject$.next(event);
  }
}
