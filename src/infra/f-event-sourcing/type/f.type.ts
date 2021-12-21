import { IEvent } from '@nestjs/cqrs';
import { AggregateId } from '@domain/shared/type';
import {DomainEvent} from "@domain/shared/bus/domain.event";

export type FEvent = IEvent & DomainEvent;

export interface FStoreInterface {
  save(event: IEvent): Promise<void>;
  findByAggregateId(id: AggregateId): Promise<FEvent[]>;
}
