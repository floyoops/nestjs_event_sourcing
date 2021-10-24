import { CreateANewArticleCommand } from './create-a-new-article.command';
import { ArticleInterface } from '@domain/articles/article.interface';
import { CommandHandlerInterface } from '@domain/shared/bus/command-handler.interface';
import { IConstructorInterface } from '@domain/shared/type';

export class CreateANewArticleCommandHandler implements CommandHandlerInterface {
  constructor(private readonly articleConstructor: IConstructorInterface<ArticleInterface>) {}

  public async handle(command: CreateANewArticleCommand): Promise<string> {
    let article: ArticleInterface = undefined;

    try {
      article = new this.articleConstructor(command.newArticleUuid);
      article.create(command.title, command.content);
    } catch (e) {
      console.error(e);
    }
    article.commit();
    return await new Promise(resolve => {
      setTimeout(() => resolve(article.uuid), 1000);
    });
  }
}
