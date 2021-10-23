import { CreateANewArticleCommand } from './create-a-new-article.command';
import { ArticleInterface } from '@domain/articles/article.interface';
import { ArticleAgg } from '@infra/articles/aggregat/article.agg';

export interface IConstructorInterface<T> {
  new (...args: any[]): T;
}

export type Type<T> = new (...args: any[]) => T;

interface CommandHandlerInterface {}

export class CreateANewArticleCommandHandler<T extends ArticleInterface> implements CommandHandlerInterface {
  handle(command: CreateANewArticleCommand): Promise<string> {
    let article = undefined;

    try {
      article = new ArticleAgg('qsfdsfqsd');
    } catch (e) {
      console.error(e);
    }

    return Promise.resolve(command.newArticleUuid);
  }

  public activator<T extends ArticleInterface>(type: IConstructorInterface<T>): T {
    return new type(3434);
  }
}
