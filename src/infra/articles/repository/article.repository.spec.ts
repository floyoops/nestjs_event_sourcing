import { MemoryStore } from '@infra/f-event-bus/store/memory.store';
import { ArticleRepository } from '@infra/articles/repository/article.repository';
import { ArticleAgg } from '@infra/articles/aggregat/article.agg';
import { NewArticleCreatedEvent } from '@app/event/articles/new-article-created/new-article-created.event';

describe('article repository', () => {
  it('success', () => {
    const store = new MemoryStore();
    const events: NewArticleCreatedEvent[] = [
      new NewArticleCreatedEvent('aaaa', 'title of aaaa', 'content of aaa'),
      new NewArticleCreatedEvent('bbbb', 'title of bbbb', 'content of bbbb'),
      new NewArticleCreatedEvent('cccc', 'title of cccc', 'content of cccc'),
    ];

    events.map(event => store.save(event));
    const articleRepository = new ArticleRepository(ArticleAgg, store);
    const articles = articleRepository.findAll();
  });
});
