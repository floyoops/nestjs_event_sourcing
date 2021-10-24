import { AggregateRoot } from '@nestjs/cqrs';
import { ArticleInterface } from '@domain/articles/article.interface';
import { NewArticleCreatedEvent } from '@app/event/articles/new-article-created/new-article-created.event';

export class ArticleAgg extends AggregateRoot implements ArticleInterface {
  public content: string;
  public title: string;
  public uuid: string;

  constructor(private readonly id: string) {
    super();
    this.uuid = id;
  }

  create(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.apply(new NewArticleCreatedEvent(this.id, title, content));
  }
}
