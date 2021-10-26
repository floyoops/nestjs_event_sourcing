import { DiTokens } from '@infra/common/di-tokens';
import { FactoryProvider, Module } from '@nestjs/common';
import { CqrsModule, EventBus, EventPublisher } from '@nestjs/cqrs';
import { FEventBus } from './f-event-bus';

const FEventPublisherProvider: FactoryProvider = {
  provide: DiTokens.FEventBusPublisher,
  useFactory(fEventBus: EventBus): EventPublisher {
    return new EventPublisher(fEventBus);
  },
  inject: [FEventBus],
};

@Module({
  imports: [CqrsModule],
  providers: [FEventBus, FEventPublisherProvider],
  exports: [FEventPublisherProvider],
})
export class FEventBusModule {}
