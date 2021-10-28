import { AggregateId, EventType, EventVersion } from '@domain/shared/type';
import { IEvent } from '@nestjs/cqrs'; // TODO remove from domain.

export abstract class DomainEvent<TData = unknown> implements IEvent {
  protected constructor(
    public readonly aggregateId: AggregateId,
    public readonly eventType: EventType,
    public readonly createdAt: Date,
    public readonly version: EventVersion,
    public readonly data: TData,
  ) {}
}
