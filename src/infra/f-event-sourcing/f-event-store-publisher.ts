import { EventBus, IEventPublisher } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { FStoreInterface } from '@infra/f-event-sourcing/type/f.type';
import { PrismaStore } from '@infra/f-event-sourcing/store/prisma.store';

@Injectable()
export class FEventStorePublisher implements IEventPublisher {
  constructor(
    @Inject(EventBus) private readonly eventBus: EventBus,
    @Inject(PrismaStore) private readonly store: FStoreInterface,
  ) {}

  publish(event) {
    this.store.save(event);
    this.eventBus.subject$.next(event);
  }
}
