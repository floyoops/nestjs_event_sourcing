import { IEvent } from '@nestjs/cqrs';
import { AggregateId } from '@domain/shared/type';

export interface FStoreInterface {
  save(event: IEvent): Promise<void>;
  findByAggregateId(id: AggregateId): IEvent[];
  findAll(): IEvent[];
}
