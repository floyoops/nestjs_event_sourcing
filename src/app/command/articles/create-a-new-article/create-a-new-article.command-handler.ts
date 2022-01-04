import { CreateANewArticleCommand } from './create-a-new-article.command';
import { ArticleInterface } from '@domain/articles/article.interface';
import { CommandHandlerInterface } from '@domain/shared/bus/command-handler.interface';
import { IConstructorInterface } from '@domain/shared/type';

export class CreateANewArticleCommandHandler implements CommandHandlerInterface {
  constructor(private readonly article: IConstructorInterface<ArticleInterface>) {}

  public handle(command: CreateANewArticleCommand): Promise<string> {
    const article = new this.article(command.newArticleUuid);
    article.create(command.title, command.content);
    article.commit();
    return Promise.resolve(article.uuid);
  }
}
