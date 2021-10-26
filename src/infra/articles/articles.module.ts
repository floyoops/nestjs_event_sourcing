import { Module } from '@nestjs/common';
import { ArticlesCommandHandlers } from './command';
import { ArticleAggregateConstructorFactoryProvider } from '@infra/articles/article.factory-provider';
import { ArticlesEventHandlers } from '@infra/articles/event';
import { FEventBusModule } from '@infra/f-event-bus/f-event-bus.module';

@Module({
  imports: [FEventBusModule],
  providers: [ArticleAggregateConstructorFactoryProvider, ...ArticlesCommandHandlers, ...ArticlesEventHandlers],
})
export class ArticlesModule {}
