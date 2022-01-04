import { LikeAnArticleCommandHandler } from '@app/command/articles/like-an-article/like-an-article.command-handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LikeAnArticleCommand } from '@app/command/articles/like-an-article/like-an-article.command';
import { Inject } from '@nestjs/common';
import { ArticleRepository } from '@infra/articles/repository/article.repository';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';

@CommandHandler(LikeAnArticleCommand)
export class LikeAnArticleCommandHandlerService extends LikeAnArticleCommandHandler implements ICommandHandler {
  constructor(@Inject(ArticleRepository) articleRepository: ArticleRepositoryInterface) {
    super(articleRepository);
  }
  execute(command: LikeAnArticleCommand) {
    return this.handle(command);
  }
}
