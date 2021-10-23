import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ArticlesCommandHandlers } from './command';

@Module({
  imports: [CqrsModule],
  providers: [...ArticlesCommandHandlers],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
