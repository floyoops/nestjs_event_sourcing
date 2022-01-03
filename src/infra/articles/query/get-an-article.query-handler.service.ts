import { GetAnArticleQueryHandler } from '@app/query/get-an-article/get-an-article.query-handler';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAnArticleQuery } from '@app/query/get-an-article/get-an-article.query';
import { Inject } from '@nestjs/common';
import { ArticleRepository } from '@infra/articles/repository/article.repository';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';

@QueryHandler(GetAnArticleQuery)
export class GetAnArticleQueryHandlerService extends GetAnArticleQueryHandler implements IQueryHandler {
  constructor(@Inject(ArticleRepository) articleRepository: ArticleRepositoryInterface) {
    super(articleRepository);
  }

  execute(query: GetAnArticleQuery) {
    return this.handle(query);
  }
}
