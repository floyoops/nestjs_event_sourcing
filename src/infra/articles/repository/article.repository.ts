import { ArticleAgg } from '@infra/articles/aggregat/article.agg';
import { IConstructorInterface } from '@domain/shared/type';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { DiTokens } from '@infra/common/di-tokens';
import { FEvent, FStoreInterface } from '@infra/f-event-sourcing/type/f.type';
import { PrismaStore } from '@infra/f-event-sourcing/store/prisma.store';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';
import { ArticleInterface } from '@domain/articles/article.interface';
import { Constructor, EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class ArticleRepository implements ArticleRepositoryInterface {
  private readonly article: Constructor<ArticleAgg>;

  constructor(
    @Inject(DiTokens.ArticleConstructor) private readonly articleConstructor: IConstructorInterface<ArticleAgg>,
    @Inject(PrismaStore) private readonly store: FStoreInterface,
    @Inject(EventPublisher) private readonly publisher: EventPublisher,
    @Inject(Logger) public readonly logger: LoggerService,
  ) {
    this.article = this.publisher.mergeClassContext(ArticleAgg);
  }

  public async findAll<TData = unknown>(): Promise<ArticleInterface[]> {
    const events = await this.store.findAll();

    // Group events by aggregateId.
    const eventsCollections = events.reduce((collections, event) => {
      const id = event.aggregateId;
      const collection = collections[id] || [];
      collection.push(event);
      collections[id] = collection;
      return collections;
    }, {});

    return Object.values(eventsCollections).map((events: FEvent[]) => {
      const articleUuid = events[0].aggregateId;
      return this.loadArticle(articleUuid, events);
    });
  }

  public async findOne(articleUuid: string): Promise<ArticleInterface> {
    const events = await this.store.findByAggregateId(articleUuid);
    return this.loadArticle(articleUuid, events);
  }

  protected loadArticle(articleUuid: string, events: FEvent[]): ArticleAgg {
    const articleAgg = new this.article(articleUuid);
    articleAgg.loadFromHistory(events);
    return articleAgg;
  }
}
