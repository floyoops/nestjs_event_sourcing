import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ArticlesCommandHandlers } from './command';
import { ArticleAggregateConstructorFactoryProvider } from '@infra/articles/article.factory-provider';
import { ArticlesEventHandlers } from '@infra/articles/event';
import { FEventBusModule } from '@infra/f-event-bus/f-event-bus.module';

@Module({
  imports: [CqrsModule, FEventBusModule],
  providers: [ArticleAggregateConstructorFactoryProvider, ...ArticlesCommandHandlers, ...ArticlesEventHandlers],
})
export class ArticlesModule {}
