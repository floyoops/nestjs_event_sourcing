import { IEvent } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { EventToMessageAdapter } from '@infra/f-event-bus/store/event-to-message.adapter';

export interface FMessageInterface {
  aggregateId: number;
  payload: IEvent;
}

export interface FStoreInterface {
  save(event: IEvent, aggregateId: number): Promise<void>;
  findByAggregateId(id: number): IEvent[];
  findAll(): IEvent[];
}

@Injectable()
export class MemoryStore implements FStoreInterface {
  private _store: FMessageInterface[] = [];

  public save(event: IEvent, aggregateId: number): Promise<void> {
    console.log('MemoryStore::save id:'+aggregateId);
    this._store.push(EventToMessageAdapter.toMessage(event, aggregateId));
    return Promise.resolve();
  }

  public findByAggregateId(id: number): IEvent[] {
    return this._store.filter(message => message.aggregateId === id).map(message => message.payload);
  }

  public findAll(): IEvent[] {
    return this._store.map(message => message.payload);
  }
}
