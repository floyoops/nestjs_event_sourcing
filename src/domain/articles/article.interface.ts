export interface ArticleInterface {
  uuid: string;
  title: string;
  content: string;
  create(title: string, content: string);
  commit(): void;
}
