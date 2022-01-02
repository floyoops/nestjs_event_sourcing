import { AggregateRoot } from '@nestjs/cqrs';
import { ArticleInterface } from '@domain/articles/article.interface';
import { NewArticleCreated } from '@app/event/articles/new-article-created/new-article-created.event';
import { LoggerService } from '@nestjs/common';
import { DomainEvent } from '@domain/shared/bus/domain.event';

export class ArticleAgg extends AggregateRoot implements ArticleInterface {
  public content: string;
  public title: string;
  public uuid: string;

  constructor(private readonly id: string, private readonly logger: LoggerService) {
    super();
    this.uuid = id;
  }

  create(title: string, content: string) {
    this.logger.log(`ArticleAgg - create title:"${title}" content:"${content}"`);
    this.apply(new NewArticleCreated(this.id, { uuid: this.uuid, title, content }));
  }

  onNewArticleCreated(event: NewArticleCreated) {
    this.logger.log(`ArticleAgg - onNewArticleCreated title:"${event.data.title}" content:"${event.data.content}"`);
    this.uuid = event.data.uuid;
    this.title = event.data.title;
    this.content = event.data.content;
  }

  protected getEventName(event: DomainEvent): string {
    if (!event.eventType) return super.getEventName(event);
    return event.eventType;
  }
}
