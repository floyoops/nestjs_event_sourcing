import { FEvent, FStoreInterface } from '@infra/f-event-sourcing/type/f.type';
import { Injectable } from '@nestjs/common';
import { AggregateId } from '@domain/shared/type';
import { DomainEvent } from '@domain/shared/bus/domain.event';

@Injectable()
export class MemoryStore implements FStoreInterface {
  private _store: DomainEvent[] = [];

  public save(event: DomainEvent): Promise<void> {
    this._store.push(event);
    return Promise.resolve();
  }

  public findByAggregateId(id: AggregateId): Promise<FEvent[]> {
    return Promise.resolve(this._store.filter(message => message.aggregateId === id));
  }

  findAll(): Promise<FEvent[]> {
    return Promise.resolve([]);
  }
}
