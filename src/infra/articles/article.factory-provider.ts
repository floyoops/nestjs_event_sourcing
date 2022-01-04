import { FactoryProvider } from '@nestjs/common';
import { IConstructorInterface } from '@domain/shared/type';
import { ArticleAgg } from '@infra/articles/aggregat/article.agg';
import { DiTokens } from '@infra/common/di-tokens';
import { Constructor, EventPublisher } from '@nestjs/cqrs';

export const ArticleAggregateConstructorFactoryProvider: FactoryProvider = {
  provide: DiTokens.ArticleConstructor,
  useFactory(publisher: EventPublisher): IConstructorInterface<ArticleAgg> & Constructor<ArticleAgg> {
    return publisher.mergeClassContext(ArticleAgg); // Return just the class, not the instance.
  },
  inject: [EventPublisher],
};
