import { ListArticlesQueryHandlerService } from '@infra/articles/query/list-articles.query-handler.service';
import { GetAnArticleQueryHandlerService } from '@infra/articles/query/get-an-article.query-handler.service';

export const ArticleQueryHandlers = [GetAnArticleQueryHandlerService, ListArticlesQueryHandlerService];
