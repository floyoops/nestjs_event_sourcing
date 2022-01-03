import { CommandHandlerInterface } from '@domain/shared/bus/command-handler.interface';
import { UpdateAnArticleCommand } from '@app/command/articles/update-an-article/update-an-article.command';
import { ArticleRepositoryInterface } from '@domain/articles/article.repository.interface';

export class UpdateAnArticleCommandHandler implements CommandHandlerInterface {
  constructor(private readonly articleRepository: ArticleRepositoryInterface) {}

  public async handle(command: UpdateAnArticleCommand): Promise<void> {
    const article = await this.articleRepository.findOne(command.articleUuid);
    article.update(command.title, command.content);
    article.commit();
  }
}
