import { CreateANewArticleCommand } from './create-a-new-article.command';
import { ArticleInterface } from '@domain/articles/article.interface';
import { CommandHandlerInterface } from '@domain/shared/bus/command-handler.interface';
import { IConstructorInterface } from '@domain/shared/type';
import { EventPublisher } from '@nestjs/cqrs';
import { AggregateRoot } from '@nestjs/cqrs/dist/aggregate-root';

export class CreateANewArticleCommandHandler implements CommandHandlerInterface {
  constructor(
    private readonly articleConstructor: IConstructorInterface<ArticleInterface & AggregateRoot>,
    private readonly publisher: EventPublisher,
  ) {}

  public async handle(command: CreateANewArticleCommand): Promise<string> {
    const article = this.publisher.mergeObjectContext(new this.articleConstructor(command.newArticleUuid));
    article.create(command.title, command.content);
    article.commit();
    return await new Promise(resolve => {
      setTimeout(() => resolve(article.uuid), 180);
    });
  }
}
