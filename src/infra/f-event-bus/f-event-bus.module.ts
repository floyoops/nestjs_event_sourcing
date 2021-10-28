import { DiTokens } from '@infra/common/di-tokens';
import { FactoryProvider, Module } from '@nestjs/common';
import { CqrsModule, EventBus, EventPublisher } from '@nestjs/cqrs';
import { FEventBus } from './f-event-bus';
import { MemoryStore } from '@infra/f-event-bus/store/memory.store';

const FEventPublisherProvider: FactoryProvider = {
  provide: DiTokens.FEventBusPublisher,
  useFactory(fEventBus: EventBus): EventPublisher {
    return new EventPublisher(fEventBus);
  },
  inject: [FEventBus],
};

@Module({
  imports: [CqrsModule],
  providers: [MemoryStore, FEventBus, FEventPublisherProvider],
  exports: [FEventPublisherProvider, MemoryStore],
})
export class FEventBusModule {}
