import { QueryHandlerInterface } from '@domain/shared/bus/query-handler.interface';
import { GetAnArticleQuery } from '@app/query/get-an-article/get-an-article.query';
import { ArticleInterface } from '@domain/articles/article.interface';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';

export class GetAnArticleQueryHandler implements QueryHandlerInterface {
  constructor(private readonly articleRepository: ArticleRepositoryInterface) {}

  handle(query: GetAnArticleQuery): Promise<ArticleInterface> {
    return this.articleRepository.findOne(query.articleUuid);
  }
}
