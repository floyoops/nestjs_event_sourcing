import { ListArticlesQuery } from '@app/query/list-articles/list-articles.query';
import { ListArticlesQueryHandler } from '@app/query/list-articles/list-articles.query-handler';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';

describe('list articles query', () => {
  const mockArticleRepository: ArticleRepositoryInterface = {
    findOne: jest.fn(() => Promise.resolve(undefined)),
    findAll: jest.fn(() => Promise.resolve([])),
  };

  it('success', async () => {
    const query = new ListArticlesQuery();
    const handler = new ListArticlesQueryHandler(mockArticleRepository);
    const result = await handler.handle(query);
    expect(result).toHaveLength(0);
  });
});
