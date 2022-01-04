import { CommandHandlerInterface } from '@domain/shared/bus/command-handler.interface';
import { LikeAnArticleCommand } from '@app/command/articles/like-an-article/like-an-article.command';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';

export class LikeAnArticleCommandHandler implements CommandHandlerInterface {
  constructor(private readonly articleRepository: ArticleRepositoryInterface) {}

  public async handle(command: LikeAnArticleCommand): Promise<void> {
    const article = await this.articleRepository.findOne(command.articleUuid);
    article.addLike();
    article.commit();
  }
}
