import { ArticleInterface } from './article.interface';

export class ArticleModel implements ArticleInterface {
  content: string;
  title: string;
  uuid: string;

  create(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
