import { EventHandlerInterface } from '@domain/shared/bus/event-handler.interface';
import { NewArticleCreated } from '@app/event/articles/new-article-created/new-article-created.event';

export class NewArticleCreatedEventHandler implements EventHandlerInterface {
  public handle(event: NewArticleCreated): Promise<boolean> {
    console.log('NewArticleCreatedEventHandler ' + event.data.uuid);
    return Promise.resolve(true);
  }
}
