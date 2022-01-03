import { CreateANewArticleCommand } from './create-a-new-article.command';
import { ArticleInterface } from '@domain/articles/article.interface';
import { CommandHandlerInterface } from '@domain/shared/bus/command-handler.interface';
import { IConstructorInterface } from '@domain/shared/type';
import { EventPublisher } from '@nestjs/cqrs';
import { AggregateRoot } from '@nestjs/cqrs/dist/aggregate-root';

// TODO remove publisher (infra) for new instance by factory (domain).
export class CreateANewArticleCommandHandler implements CommandHandlerInterface {
  constructor(
    private readonly articleConstructor: IConstructorInterface<ArticleInterface & AggregateRoot>,
    private readonly publisher: EventPublisher,
  ) {}

  public handle(command: CreateANewArticleCommand): Promise<string> {
    const article = this.publisher.mergeObjectContext(new this.articleConstructor(command.newArticleUuid));
    article.create(command.title, command.content);
    article.commit();
    return Promise.resolve(article.uuid);
  }
}
