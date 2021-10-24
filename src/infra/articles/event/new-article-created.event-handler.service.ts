import { NewArticleCreatedEventHandler } from '@app/event/articles/new-article-created/new-article-created.event-handler';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NewArticleCreatedEvent } from '@app/event/articles/new-article-created/new-article-created.event';

@EventsHandler(NewArticleCreatedEvent)
export class NewArticleCreatedEventHandlerService
  extends NewArticleCreatedEventHandler
  implements IEventHandler<NewArticleCreatedEvent>
{
  public handle(event: NewArticleCreatedEvent): Promise<boolean> {
    console.log('NewArticleCreatedEventHandlerService ' + event.uuid);
    return super.handle(event);
  }
}
