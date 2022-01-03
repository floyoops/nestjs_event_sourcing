import { UpdateAnArticleCommandHandler } from '@app/command/articles/update-an-article/update-an-article.command-handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAnArticleCommand } from '@app/command/articles/update-an-article/update-an-article.command';
import { ArticleRepository } from '@infra/articles/repository/article.repository';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';
import { Inject } from '@nestjs/common';

@CommandHandler(UpdateAnArticleCommand)
export class UpdateAnArticleCommandHandlerService
  extends UpdateAnArticleCommandHandler
  implements ICommandHandler<UpdateAnArticleCommand>
{
  constructor(@Inject(ArticleRepository) articleRepository: ArticleRepositoryInterface) {
    super(articleRepository);
  }
  public execute(command: UpdateAnArticleCommand) {
    return super.handle(command);
  }
}
