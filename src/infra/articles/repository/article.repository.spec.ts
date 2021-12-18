import { MemoryStore } from '@infra/f-event-sourcing/store/memory.store';
import { ArticleRepository } from '@infra/articles/repository/article.repository';
import { ArticleAgg } from '@infra/articles/aggregat/article.agg';
import { NewArticleCreated } from '@app/event/articles/new-article-created/new-article-created.event';
import { MyLoggerMock } from '@infra/my-logger/my-logger.mock';

describe('article repository', () => {
  it('success', async () => {
    const store = new MemoryStore();
    const events: NewArticleCreated[] = [
      new NewArticleCreated('aaaa', { uuid: 'aaaa', title: 'title of aaaa', content: 'content of aaaa' }),
      new NewArticleCreated('bbbb', { uuid: 'bbbb', title: 'title of bbbb', content: 'content of bbbb' }),
      new NewArticleCreated('cccc', { uuid: 'cccc', title: 'title of cccc', content: 'content of cccc' }),
    ];

    await Promise.all(events.map(event => store.save(event)));
    const articleRepository = new ArticleRepository(ArticleAgg, store, new MyLoggerMock());
    const articles = await articleRepository.findAll();
    expect(articles.length).toEqual(3);
    expect(articles[2].content).toEqual('content of cccc');
  });
});
