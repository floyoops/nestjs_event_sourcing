export interface ArticleInterface {
  uuid: string;
  title: string;
  content: string;
  liked: number;
  create(title: string, content: string);
  update(title: string, content: string);
  addLike();
  commit(): void;
}
