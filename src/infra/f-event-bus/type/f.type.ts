import { IEvent } from '@nestjs/cqrs';
import { AggregateId, NameEvent } from '@domain/shared/type';
import { DomainEvent } from '@domain/shared/bus/event.interface';

export type FEvent = DomainEvent & IEvent;

export interface FMessageInterface {
  aggregateId: AggregateId;
  name: NameEvent;
  payload: FEvent;
}
export interface FStoreInterface {
  save(event: IEvent): Promise<void>;
  findByAggregateId(id: AggregateId): IEvent[];
  findAll(): IEvent[];
}
