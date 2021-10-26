import { IEvent } from '@nestjs/cqrs';
import { FMessageInterface } from '@infra/f-event-bus/store/memory.store';

export class EventToMessageAdapter {
  public static toMessage(event: IEvent, aggregateId: number): FMessageInterface {
    return { aggregateId, payload: event };
  }
}
