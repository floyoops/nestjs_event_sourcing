import { IEvent } from '@nestjs/cqrs';
import { AggregateId } from '@domain/shared/type';
import { DomainEvent } from '@domain/shared/bus/domain.event';

export type FEvent<TData = unknown> = IEvent & DomainEvent<TData>;

export interface FStoreInterface {
  save(event: IEvent): Promise<void>;
  findByAggregateId(id: AggregateId): Promise<FEvent[]>;
  findAll(): Promise<FEvent[]>;
}

export interface DataTransformer<T1, T2> {
  transform(data: T1): T2;
  reverseTransform(data: T2): T1;
}
