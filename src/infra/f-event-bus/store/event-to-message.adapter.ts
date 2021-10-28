import { FEvent, FMessageInterface } from '@infra/f-event-bus/type/f.type';
import { NameEvent } from '@domain/shared/type';

export class EventToMessageAdapter {
  public static toMessage(event: FEvent, name: NameEvent): FMessageInterface {
    return { aggregateId: event.aggregateId, name, payload: event };
  }
}
