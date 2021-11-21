import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { MemoryStore } from '@infra/f-event-sourcing/store/memory.store';
import { FEventStorePublisher } from '@infra/f-event-sourcing/f-event-store-publisher';

@Module({
  imports: [CqrsModule],
  providers: [MemoryStore, FEventStorePublisher],
  exports: [MemoryStore],
})
export class FEventSourcingModule implements OnModuleInit {
  constructor(private readonly eventBus: EventBus, private readonly eventStorePublisher: FEventStorePublisher) {}

  onModuleInit() {
    this.eventBus.publisher = this.eventStorePublisher;
  }
}
