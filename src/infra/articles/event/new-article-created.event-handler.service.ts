import { NewArticleCreatedEventHandler } from '@app/event/articles/new-article-created/new-article-created.event-handler';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NewArticleCreated } from '@app/event/articles/new-article-created/new-article-created.event';

@EventsHandler(NewArticleCreated)
export class NewArticleCreatedEventHandlerService
  extends NewArticleCreatedEventHandler
  implements IEventHandler<NewArticleCreated>
{
  public handle(event: NewArticleCreated): Promise<boolean> {
    console.log('NewArticleCreatedEventHandlerService ' + event.data.uuid);
    return super.handle(event);
  }
}
