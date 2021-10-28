import { AggregateId, Uuid } from '@domain/shared/type';

export interface EventInterface {
  readonly uuid: Uuid;
  readonly aggregateId: AggregateId;
  readonly version: number;
}
