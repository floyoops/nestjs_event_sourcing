import { EventBus, IEventPublisher } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { MemoryStore } from '@infra/f-event-sourcing/store/memory.store';
import { FStoreInterface } from '@infra/f-event-sourcing/type/f.type';

@Injectable()
export class FEventStorePublisher implements IEventPublisher {
  constructor(
    @Inject(EventBus) private readonly eventBus: EventBus,
    @Inject(MemoryStore) private readonly store: FStoreInterface,
  ) {}

  publish(event) {
    this.store.save(event);
    this.eventBus.subject$.next(event);
  }
}
