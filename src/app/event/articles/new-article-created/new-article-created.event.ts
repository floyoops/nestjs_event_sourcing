import { EventInterface } from '@domain/shared/bus/event.interface';

export class NewArticleCreatedEvent implements EventInterface {
  constructor(public readonly uuid: string, public readonly title: string, public readonly content: string) {}

  public readonly version = 1;
}
