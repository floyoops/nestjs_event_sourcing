import { ArticleAgg } from '@infra/articles/aggregat/article.agg';
import { IConstructorInterface } from '@domain/shared/type';
import { Inject, Injectable } from '@nestjs/common';
import { DiTokens } from '@infra/common/di-tokens';
import { FStoreInterface, MemoryStore } from '@infra/f-event-bus/store/memory.store';
import { groupBy, map } from 'lodash';

@Injectable()
export class ArticleRepository {
  constructor(
    @Inject(DiTokens.ArticleConstructor) private readonly articleConstructor: IConstructorInterface<ArticleAgg>,
    @Inject(MemoryStore) private readonly store: FStoreInterface,
  ) {}

  public findAll(): Promise<ArticleAgg[]> {
    const events = this.store.findAll();
    const eventsGrouped = groupBy(events, 'id');
    const eventsGrouped2 = map(eventsGrouped);
    // return eventsGrouped2.map(events => {
    //   const aggregate = new this.articleConstructor();
    //   aggregate.loadFromHistory(events);
    //   return aggregate;
    // })


    return Promise.resolve([]);
  }
}
