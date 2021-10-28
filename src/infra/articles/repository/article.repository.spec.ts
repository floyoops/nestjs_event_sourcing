import { MemoryStore } from '@infra/f-event-bus/store/memory.store';
import { ArticleRepository } from '@infra/articles/repository/article.repository';
import { ArticleAgg } from '@infra/articles/aggregat/article.agg';
import { NewArticleCreated } from '@app/event/articles/new-article-created/new-article-created.event';

describe('article repository', () => {
  it('success', () => {
    const store = new MemoryStore();
    const events: NewArticleCreated[] = [
      new NewArticleCreated('aaaa', { uuid: 'aaaa', title: 'title of aaaa', content: 'content of aaaa' }),
      new NewArticleCreated('bbbb', { uuid: 'bbbb', title: 'title of bbbb', content: 'content of bbbb' }),
      new NewArticleCreated('cccc', { uuid: 'cccc', title: 'title of cccc', content: 'content of cccc' }),
    ];

    events.map(event => store.save(event));
    const articleRepository = new ArticleRepository(ArticleAgg, store);
    const articles = articleRepository.findAll();
  });
});
