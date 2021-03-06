import { CreateANewArticleCommandHandler } from '@app/command/articles/create-a-new-article/create-a-new-article.command-handler';
import { CreateANewArticleCommand } from '@app/command/articles/create-a-new-article/create-a-new-article.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticleInterface } from '@domain/articles/article.interface';
import { Inject } from '@nestjs/common';
import { IConstructorInterface } from '@domain/shared/type';
import { DiTokens } from '@infra/common/di-tokens';

@CommandHandler(CreateANewArticleCommand)
export class CreateANewArticleCommandHandlerService
  extends CreateANewArticleCommandHandler
  implements ICommandHandler<CreateANewArticleCommand>
{
  constructor(@Inject(DiTokens.ArticleConstructor) articleConstructor: IConstructorInterface<ArticleInterface>) {
    super(articleConstructor);
  }

  public execute(command: CreateANewArticleCommand) {
    return super.handle(command);
  }
}
