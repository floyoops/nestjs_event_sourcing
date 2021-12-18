import { NewArticleCreatedEventHandler } from '@app/event/articles/new-article-created/new-article-created.event-handler';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NewArticleCreated } from '@app/event/articles/new-article-created/new-article-created.event';
import { Inject, Logger, LoggerService } from '@nestjs/common';

@EventsHandler(NewArticleCreated)
export class NewArticleCreatedEventHandlerService
  extends NewArticleCreatedEventHandler
  implements IEventHandler<NewArticleCreated>
{
  constructor(@Inject(Logger) logger: LoggerService) {
    super(logger);
  }

  public handle(event: NewArticleCreated): Promise<boolean> {
    return super.handle(event);
  }
}
