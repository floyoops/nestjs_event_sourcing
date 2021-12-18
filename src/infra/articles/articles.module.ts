import { Logger, Module } from '@nestjs/common';
import { ArticlesCommandHandlers } from './command';
import { ArticleAggregateConstructorFactoryProvider } from '@infra/articles/article.factory-provider';
import { ArticlesEventHandlers } from '@infra/articles/event';
import { FEventSourcingModule } from '@infra/f-event-sourcing/f-event-sourcing.module';
import { ArticleRepository } from '@infra/articles/repository/article.repository';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [FEventSourcingModule, CqrsModule],
  providers: [
    Logger,
    ArticleAggregateConstructorFactoryProvider,
    ArticleRepository,
    ...ArticlesCommandHandlers,
    ...ArticlesEventHandlers,
  ],
})
export class ArticlesModule {}
