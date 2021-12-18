import { EventHandlerInterface } from '@domain/shared/bus/event-handler.interface';
import { NewArticleCreated } from '@app/event/articles/new-article-created/new-article-created.event';
import { LoggerService } from '@nestjs/common';

export class NewArticleCreatedEventHandler implements EventHandlerInterface {
  constructor(private readonly logger: LoggerService) {}

  public handle(event: NewArticleCreated): Promise<boolean> {
    const data = event.data;
    this.logger.log(`NewArticleCreatedEventHandler - handle title:${data.title} content:"${data.content}"`);
    return Promise.resolve(true);
  }
}
