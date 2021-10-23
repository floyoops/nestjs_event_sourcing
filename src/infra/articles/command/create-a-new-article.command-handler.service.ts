import { CreateANewArticleCommandHandler } from '../../../app/command/articles/create-a-new-article/create-a-new-article.command-handler';
import { CreateANewArticleCommand } from '../../../app/command/articles/create-a-new-article/create-a-new-article.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateANewArticleCommand)
export class CreateANewArticleCommandHandlerService extends CreateANewArticleCommandHandler implements ICommandHandler {
  public execute(command: CreateANewArticleCommand): Promise<string> {
    return super.handle(command);
  }
}
