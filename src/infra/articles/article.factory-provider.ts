import { FactoryProvider } from '@nestjs/common';
import { IConstructorInterface } from '@domain/shared/type';
import { ArticleAgg } from '@infra/articles/aggregat/article.agg';
import { DiTokens } from '@infra/common/di-tokens';

export const ArticleAggregateConstructorFactoryProvider: FactoryProvider = {
  provide: DiTokens.ArticleConstructor,
  useFactory(): IConstructorInterface<ArticleAgg> {
    return ArticleAgg; // Return just the class, not the instance.
  },
};
