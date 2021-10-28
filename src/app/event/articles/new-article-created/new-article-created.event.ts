import { EventInterface } from '@domain/shared/bus/event.interface';
import { AggregateId } from '@domain/shared/type';

export class NewArticleCreatedEvent implements EventInterface {
  constructor(public readonly uuid: string, public readonly title: string, public readonly content: string) {
    this.aggregateId = uuid;
  }

  public readonly version = 1;
  public readonly aggregateId: AggregateId;
}
