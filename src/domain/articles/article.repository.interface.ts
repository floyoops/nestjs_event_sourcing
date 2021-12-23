import { ArticleInterface } from '@domain/articles/article.interface';

export interface ArticleRepositoryInterface {
  findAll(): Promise<ArticleInterface[]>;
  findOne(articleUuid: string): Promise<ArticleInterface>;
}
