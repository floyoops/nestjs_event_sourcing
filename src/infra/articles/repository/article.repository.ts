import { ArticleAgg } from '@infra/articles/aggregat/article.agg';
import { AggregateId, IConstructorInterface } from '@domain/shared/type';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { DiTokens } from '@infra/common/di-tokens';
import { groupBy, map } from 'lodash';
import { MemoryStore } from '@infra/f-event-sourcing/store/memory.store';
import { FStoreInterface } from '@infra/f-event-sourcing/type/f.type';
import { IEvent } from '@nestjs/cqrs';

@Injectable()
export class ArticleRepository {
  constructor(
    @Inject(DiTokens.ArticleConstructor) private readonly articleConstructor: IConstructorInterface<ArticleAgg>,
    @Inject(MemoryStore) private readonly store: FStoreInterface,
    @Inject(Logger) public readonly logger: LoggerService,
  ) {}

  public findAll(): Promise<ArticleAgg[]> {
    const events = this.store.findAll();
    const eventsGrouped = groupBy(events, 'aggregateId');
    const eventsGrouped2 = map(eventsGrouped);

    const b = eventsGrouped2.map(events2 => {
      type EventWithAggregateId = IEvent & { aggregateId: AggregateId };
      const events3 = events2.filter(event2 => event2.hasOwnProperty('aggregateId')) as EventWithAggregateId[];
      const aggregateId = events3?.[0].aggregateId;
      const aggregate = new this.articleConstructor(aggregateId, this.logger);
      aggregate.loadFromHistory(events2);
      return aggregate;
    });

    return Promise.resolve(b);
  }
}
