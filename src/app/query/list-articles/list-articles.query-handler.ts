import { QueryHandlerInterface } from '@domain/shared/bus/query-handler.interface';
import { ListArticlesQuery } from '@app/query/list-articles/list-articles.query';
import { ArticleInterface } from '@domain/articles/article.interface';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';

export class ListArticlesQueryHandler implements QueryHandlerInterface {
  constructor(private readonly articleRepository: ArticleRepositoryInterface) {}

  public handle(query: ListArticlesQuery): Promise<ArticleInterface[]> {
    return this.articleRepository.findAll();
  }
}
