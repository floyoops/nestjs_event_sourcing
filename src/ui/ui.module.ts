import { Module } from '@nestjs/common';
import { AppModule } from '@infra/app.module';
import { ArticlesController } from '@ui/rest/articles/articles.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, AppModule],
  controllers: [ArticlesController],
})
export class UiModule {}
