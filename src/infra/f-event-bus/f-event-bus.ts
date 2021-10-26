import { EventBus, IEvent, IEventBus } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { FStoreInterface, MemoryStore } from '@infra/f-event-bus/store/memory.store';

@Injectable()
export class FEventBus implements IEventBus {
  constructor(
    @Inject(EventBus) private readonly eventBus: EventBus,
    @Inject(MemoryStore) private readonly store: FStoreInterface,
  ) {}

  public async publish<T extends IEvent>(event: T): Promise<any> {
    await this.saveOrException(event, 1);
    return this.eventBus.publish(event);
  }

  public async publishAll(events: IEvent[]): Promise<any> {
    await Promise.all(events.map(event => this.saveOrException(event, 1)));
    return this.eventBus.publishAll(events);
  }

  private async saveOrException(event: IEvent, aggregateId: number): Promise<void> {
    try {
      await this.store.save(event, aggregateId);
    } catch (err) {
      throw new Error('FEventBus error on store::save');
    }
  }
}
