import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { FEventStorePublisher } from '@infra/f-event-sourcing/f-event-store-publisher';
import { PrismaStore } from '@infra/f-event-sourcing/store/prisma.store';
import { PrismaModule } from '@infra/prisma/prisma.module';

@Module({
  imports: [CqrsModule, PrismaModule],
  providers: [PrismaStore, FEventStorePublisher],
  exports: [PrismaStore],
})
export class FEventSourcingModule implements OnModuleInit {
  constructor(private readonly eventBus: EventBus, private readonly eventStorePublisher: FEventStorePublisher) {}

  onModuleInit() {
    this.eventBus.publisher = this.eventStorePublisher;
  }
}
