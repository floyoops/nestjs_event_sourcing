import { EventHandlerInterface } from '@domain/shared/bus/event-handler.interface';
import { NewArticleCreatedEvent } from '@app/event/articles/new-article-created/new-article-created.event';

export class NewArticleCreatedEventHandler implements EventHandlerInterface {
  public handle(event: NewArticleCreatedEvent): Promise<boolean> {
    console.log('NewArticleCreatedEventHandler ' + event.uuid);
    return Promise.resolve(true);
  }
}
