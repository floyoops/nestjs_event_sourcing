import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ArticlesCommandHandlers } from './command';
import { ArticleAggregateConstructorFactoryProvider } from '@infra/articles/article.factory-provider';
import { ArticlesEventHandlers } from '@infra/articles/event';

@Module({
  imports: [CqrsModule],
  providers: [ArticleAggregateConstructorFactoryProvider, ...ArticlesCommandHandlers, ...ArticlesEventHandlers],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
