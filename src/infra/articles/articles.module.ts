import { Module } from '@nestjs/common';
import { ArticlesCommandHandlers } from './command';
import { ArticleAggregateConstructorFactoryProvider } from '@infra/articles/article.factory-provider';
import { ArticlesEventHandlers } from '@infra/articles/event';
import { FEventBusModule } from '@infra/f-event-bus/f-event-bus.module';
import { ArticleRepository } from '@infra/articles/repository/article.repository';

@Module({
  imports: [FEventBusModule],
  providers: [
    ArticleAggregateConstructorFactoryProvider,
    ArticleRepository,
    ...ArticlesCommandHandlers,
    ...ArticlesEventHandlers,
  ],
})
export class ArticlesModule {}
