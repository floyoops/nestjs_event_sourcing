import { ArticleAgg } from '@infra/articles/aggregat/article.agg';
import { IConstructorInterface } from '@domain/shared/type';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { DiTokens } from '@infra/common/di-tokens';
import { FStoreInterface } from '@infra/f-event-sourcing/type/f.type';
import { PrismaStore } from '@infra/f-event-sourcing/store/prisma.store';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';
import { ArticleInterface } from '@domain/articles/article.interface';

@Injectable()
export class ArticleRepository implements ArticleRepositoryInterface {
  constructor(
    @Inject(DiTokens.ArticleConstructor) private readonly articleConstructor: IConstructorInterface<ArticleAgg>,
    @Inject(PrismaStore) private readonly store: FStoreInterface,
    @Inject(Logger) public readonly logger: LoggerService,
  ) {}

  public findAll(): Promise<ArticleInterface[]> {
    // const events = this.store.findAll();
    // const eventsGrouped = groupBy(events, 'aggregateId');
    // const eventsGrouped2 = map(eventsGrouped);
    //
    // const b = eventsGrouped2.map(events2 => {
    //   type EventWithAggregateId = IEvent & { aggregateId: AggregateId };
    //   const events3 = events2.filter(event2 => event2.hasOwnProperty('aggregateId')) as EventWithAggregateId[];
    //   const aggregateId = events3?.[0].aggregateId;
    //   const aggregate = new this.articleConstructor(aggregateId, this.logger);
    //   aggregate.loadFromHistory(events2);
    //   return aggregate;
    // });
    //
    // return Promise.resolve(b);
    return Promise.resolve([]);
  }

  public async findOne(articleUuid: string): Promise<ArticleInterface> {
    const events = await this.store.findByAggregateId(articleUuid);
    const articleAgg = new this.articleConstructor(articleUuid, this.logger);
    articleAgg.loadFromHistory(events);
    return articleAgg;
  }
}
