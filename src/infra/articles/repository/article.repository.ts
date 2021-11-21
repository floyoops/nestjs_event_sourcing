import { ArticleAgg } from '@infra/articles/aggregat/article.agg';
import { IConstructorInterface } from '@domain/shared/type';
import { Inject, Injectable } from '@nestjs/common';
import { DiTokens } from '@infra/common/di-tokens';
import { groupBy, map } from 'lodash';
import { MemoryStore } from '@infra/f-event-sourcing/store/memory.store';
import { FStoreInterface } from '@infra/f-event-sourcing/type/f.type';

@Injectable()
export class ArticleRepository {
  constructor(
    @Inject(DiTokens.ArticleConstructor) private readonly articleConstructor: IConstructorInterface<ArticleAgg>,
    @Inject(MemoryStore) private readonly store: FStoreInterface,
  ) {}

  public findAll(): Promise<ArticleAgg[]> {
    const events = this.store.findAll();
    const eventsGrouped = groupBy(events, 'aggregateId');
    const eventsGrouped2 = map(eventsGrouped);

    const b = eventsGrouped2.map(events2 => {
      const aggregate = new this.articleConstructor();
      aggregate.loadFromHistory(events2);
      return aggregate;
    });

    return Promise.resolve(b);
  }
}
