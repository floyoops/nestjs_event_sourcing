import { EventBus, IEvent, IEventBus } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { MemoryStore } from '@infra/f-event-bus/store/memory.store';
import { FEvent, FStoreInterface } from '@infra/f-event-bus/type/f.type';

@Injectable()
export class FEventBus implements IEventBus {
  constructor(
    @Inject(EventBus) private readonly eventBus: EventBus,
    @Inject(MemoryStore) private readonly store: FStoreInterface,
  ) {}

  public async publish<T extends IEvent>(event: T & FEvent): Promise<any> {
    await this.saveOrException(event);
    return this.eventBus.publish(event);
  }

  public async publishAll(events: FEvent[]): Promise<any> {
    await Promise.all(events.map(event => this.saveOrException(event)));
    return this.eventBus.publishAll(events);
  }

  private async saveOrException(event: FEvent): Promise<void> {
    try {
      await this.store.save(event);
    } catch (err) {
      throw new Error('FEventBus error on store::save');
    }
  }
}
