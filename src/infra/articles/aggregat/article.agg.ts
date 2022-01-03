import { AggregateRoot } from '@nestjs/cqrs';
import { ArticleInterface } from '@domain/articles/article.interface';
import { NewArticleCreated } from '@app/event/articles/new-article-created/new-article-created.event';
import { DomainEvent } from '@domain/shared/bus/domain.event';
import { ArticleUpdated } from '@app/event/articles/article-updated/article-updated.event';

export class ArticleAgg extends AggregateRoot implements ArticleInterface {
  public content: string;
  public title: string;
  public uuid: string;

  constructor(private readonly id: string) {
    super();
    this.uuid = id;
  }

  create(title: string, content: string) {
    this.apply(new NewArticleCreated(this.id, { uuid: this.uuid, title, content }));
  }

  update(title: string, content: string) {
    this.apply(new ArticleUpdated(this.id, { uuid: this.uuid, title, content }));
  }

  onNewArticleCreated(event: NewArticleCreated) {
    this.uuid = event.data.uuid;
    this.title = event.data.title;
    this.content = event.data.content;
  }

  onArticleUpdated(event: ArticleUpdated) {
    this.title = event.data.title;
    this.content = event.data.content;
  }

  protected getEventName(event: DomainEvent): string {
    if (!event.eventType) return super.getEventName(event);
    return event.eventType;
  }
}
