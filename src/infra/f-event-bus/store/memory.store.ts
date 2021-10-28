import { FEvent, FMessageInterface, FStoreInterface } from '@infra/f-event-bus/type/f.type';
import { Injectable } from '@nestjs/common';
import { EventToMessageAdapter } from '@infra/f-event-bus/store/event-to-message.adapter';
import { AggregateId, NameEvent } from '@domain/shared/type';

@Injectable()
export class MemoryStore implements FStoreInterface {
  private _store: FMessageInterface[] = [];

  public save(event: FEvent): Promise<void> {
    const name = event.constructor.name as NameEvent;
    console.log('MemoryStore::save id:' + event.aggregateId + 'name: ' + name);
    this._store.push(EventToMessageAdapter.toMessage(event, name));
    return Promise.resolve();
  }

  public findByAggregateId(id: AggregateId): FEvent[] {
    return this._store.filter(message => message.aggregateId === id).map(message => message.payload);
  }

  public findAll(): FEvent[] {
    return this._store.map(message => {
      const n = message.name;
      return message.payload;
    });
  }
}
