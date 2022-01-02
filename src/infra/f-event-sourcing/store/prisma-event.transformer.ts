import { DataTransformer, FEvent } from '@infra/f-event-sourcing/type/f.type';
import { Event as EventPrisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

/**
 * FEvent has an alias of DomainEvent.
 * DomainEvent is the interface compatible to domain app.
 *
 * This transformer, transform an event from infra to compatible domain app.
 */
@Injectable()
export class PrismaEventTransformer implements DataTransformer<EventPrisma, FEvent> {
  /**
   * Transform the type infra from prisma to DomainEvent.
   */
  public transform<TData = unknown>(event: EventPrisma): FEvent {
    const { streamId, data, ...e } = event;
    return {
      aggregateId: streamId,
      data: JSON.parse(data) as TData, // JSON not managed by prisma for sqLite.
      ...e,
    };
  }

  /**
   * Convert the event domain app to prisma (infra).
   */
  public reverseTransform(event: FEvent): EventPrisma {
    const id = event.aggregateId;
    return {
      id: undefined, // Managed by prisma "auto increment".
      createdAt: event.createdAt || undefined, // Managed by prisma Date("now").
      streamId: id.toString(),
      data: JSON.stringify(event.data), // JSON not managed by prisma for sqLite.
      eventType: event.eventType,
      version: event.version,
    };
  }
}
