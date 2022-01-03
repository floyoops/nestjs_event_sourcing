import { ListArticlesQueryHandler } from '@app/query/list-articles/list-articles.query-handler';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListArticlesQuery } from '@app/query/list-articles/list-articles.query';
import { ArticleRepository } from '@infra/articles/repository/article.repository';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';
import { Inject } from '@nestjs/common';

@QueryHandler(ListArticlesQuery)
export class ListArticlesQueryHandlerService extends ListArticlesQueryHandler implements IQueryHandler {
  constructor(@Inject(ArticleRepository) articleRepository: ArticleRepositoryInterface) {
    super(articleRepository);
  }

  execute(query: ListArticlesQuery) {
    return this.handle(query);
  }
}
